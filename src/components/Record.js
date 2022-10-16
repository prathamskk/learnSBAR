import "./record.css";
import "../styles/reset.css";
import Navbar from "./Navbar.js";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicRecorder from "mic-recorder-to-mp3";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import "./record.css";

const audioRecorder = new MicRecorder({ bitRate: 128 });

const Record = () => {
  const { scenarios } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isblocked, setIsblocked] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [isrecording, setIsrecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  
  useEffect(() => {
    navigator.getUserMedia(
      { audio: true, video: false },
      () => {
        console.log("Permission Granted");
        setIsblocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsblocked(false);
      }
    );
  });

  const start = () => {
    if (isblocked) {
      console.log("permission Denied");
    } else {
      audioRecorder
        .start()
        .then(() => {
          setIsrecording(true);
          console.log("started recording");
        })
        .catch((e) => console.log(e));
    }
  };

  const stop = () => {
    audioRecorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobUrl = URL.createObjectURL(blob);
        setBlobUrl(blobUrl);
        setIsrecording(false);
        var d = new Date();
        var file = new File([blob], d.valueOf(), { type: "audio/wav" });
        console.log(file);
        handleaudiofile(file);
      })
      .catch((e) => console.log("We could not retrieve your message"));
    setIsRecorded(true);
  };

  const handleaudiofile = (ev) => {
    let file = ev;
    let fileName = ev.name;
    let fileType = ev.type;
    axiosPrivate
      .post(
        "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/sign-s3",
        {
          fileName: fileName,
          fileType: fileType,
        }
      )
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            setAudio(url);
            console.log(audio);
            console.log("audio uploaded");
            axiosPrivate
              .post(
                "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/submission",
                {
                  scenarioNo: "2",
                  attemptNo: "1",
                  type: "rec1",
                  data: url,
                }
              )
              .then((response) => {
                console.log("successfully added to dynamodb");
              })
              .catch((error) => {
                alert("ERROR " + JSON.stringify(error));
              });
          })
          .catch((error) => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  return (
    <div>
      <Navbar />
      <div className="audio_recording">
        <div className="rounded_mic" onClick={() => start()}>
          <div className="mic">
            <button className="micro_phone">
              <i class="bi bi-mic-fill"></i>
            </button>
          </div>
        </div>
        <div className="sbar_briefing">Record SBAR Briefing</div>
        {isrecording && (
          <div>
            <button onClick={stop} type="button" className="controls">
              Stop
            </button>
          </div>
        )}
      </div>
      <div className="next-btn">
        <a
          href="/assessment"
          className={isRecorded ? "next" : "disabled_next"}
          onClick={
            isRecorded ? (event) => event.preventDefault() : "/assessment"
          }
        >
          Next
        </a>
      </div>
    </div>
  );
};
export default Record;
