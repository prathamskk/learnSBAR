import MicRecorder from "mic-recorder-to-mp3";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";
const audioRecorder = new MicRecorder({ bitRate: 128 });

const Main = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isblocked, setIsblocked] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [audio, setAudio] = useState("");
  const [isrecording, setIsrecording] = useState(false);
  const [scenarios, setScenarios] = useState(null);
  useEffect(() => {
    axiosPrivate
      .get(
        "https://jsfu2dh5ie.execute-api.ap-south-1.amazonaws.com/dev/submission"
      )
      .then((response) => {
        console.log(response.data);
        setScenarios(response.data?.scenarios);
      })
      .catch((error) => {
        console.error(error)
        alert("ERROR " + JSON.stringify(error));
      })
      .finally(() => { });
  }, []);

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
        setIsrecording(true);
        var d = new Date();
        var file = new File([blob], d.valueOf(), { type: "audio/wav" });
        console.log(file);
        handleaudiofile(file);
      })
      .catch((e) => console.log("We could not retrieve your message"));
  };

  const handleaudiofile = (ev) => {
    let file = ev;
    let fileName = ev.name;
    let fileType = ev.type;
    axiosPrivate
      .post(
        "https://jsfu2dh5ie.execute-api.ap-south-1.amazonaws.com/dev/sign-s3",
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
                "https://jsfu2dh5ie.execute-api.ap-south-1.amazonaws.com/dev/submission",
                {
                  scenarioNo: "1",
                  attemptNo: "1",
                  type: "rec2",
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

  const getdata = (scenarios) => {
    console.log("here",scenarios["1"])
    const data = scenarios["1"]?.map((scenario,index) => <div style={{color:"black"}} key={index}>{scenario["rec1"]}</div>);
    console.log(data)
    return data
  }

  // useEffect(() => {
  //   console.log(scenarios);
  // }, [scenarios]);

  return (
    <>
      <button onClick={start} disabled={isrecording} type="button">
        Start
      </button>
      <button onClick={stop} type="button">
        Stop
      </button>
      <audio src={blobUrl} controls="controls" />
      <div style={{ color: "red" }}> {JSON.stringify(scenarios)}</div>
      {scenarios && getdata(scenarios)}
    </>
  );
};

export default Main;
