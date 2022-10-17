import "../styles/record.css";
import MicRecorder from "mic-recorder-to-mp3";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const audioRecorder = new MicRecorder({ bitRate: 128 });

const Record2 = ({
  setStepno,
  attemptNo,
  refreshScenarios,
  calculateAttemptNo,
}) => {
  const { scenarios } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isblocked, setIsblocked] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [isrecording, setIsrecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  //check for browser audio and video permissions
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
        handleaudiofile(file);
      })
      .catch((e) => console.log("We could not retrieve your message"));
    setIsRecorded(true);
  };

  const handleaudiofile = (ev) => {
    let file = ev;
    let fileName = ev.name;
    let fileType = ev.type;
    //get signed url from s3
    axiosPrivate
      .post(
        "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/sign-s3",
        {
          fileName: fileName,
          fileType: fileType,
        }
      )
      //upload audio to signed url
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
            //Updating dynamodb with url of audio rec1
            axiosPrivate
              .post(
                "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/submission",
                {
                  scenarioNo: params.scenarioId,
                  attemptNo: attemptNo,
                  type: "rec2",
                  data: url,
                }
              )
              //refresh(get) scenarios from db
              .then((response) => {
                refreshScenarios();
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

  //update stepno when scenario is updated
  useEffect(() => {
    const result = calculateAttemptNo(scenarios, params.scenarioId);
    console.log(result);
    if (result.stepno === 0) {
      navigate("/scenario/repeat/" + params.scenarioId);
    }
  }, [scenarios]);

  return (
    <div>
      <div className="audio_recording">
        {!isrecording ? (
          <button className="rounded_mic" onClick={() => start()}>
            <div className="mic">
              <div className="micro_phone">
                <i className="bi bi-mic-fill"></i>
              </div>
            </div>
          </button>
        ) : (
          <div>
            <button onClick={stop} type="button" className="rounded_mic">
              <div className="mic">
                <div className="micro_phone">
                  <i className="bi bi-stop-fill"></i>
                </div>
              </div>
            </button>
          </div>
        )}
        <div className="sbar_briefing">
          Record SBAR Briefing for the second time with the improvements
        </div>
      </div>
    </div>
  );
};
export default Record2;
