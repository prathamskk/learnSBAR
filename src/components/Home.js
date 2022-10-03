import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import AWS from "aws-sdk";
import MicRecorder from "mic-recorder-to-mp3";
import { useState, useEffect } from "react";
import { createRef } from "react";

const audioRecorder = new MicRecorder({ bitRate: 128 });

const S3_BUCKET = "YOUR_BUCKET_NAME_HERE";
const REGION = "YOUR_DESIRED_REGION_HERE";

AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY_HERE",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY_HERE",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Home = () => {
  let recorderRef = createRef();
  const [audioUrl, setAudioUrl] = useState("");
  const [audio] = useState(new Audio());
  const [blobAudio, setBlobAudio] = useState(null);
  const navigate = useNavigate();
  const logout = useLogout();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  async function startRecord() {
    console.log("START RECORD AUDIO");
    if (navigator?.mediaDevices) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        recorderRef.current = new MediaRecorder(stream);

        recorderRef.current.addEventListener(
          "dataavailable",
          onRecordingFinish
        );

        recorderRef.current.start();
      } catch (error) {
        console.error("getUserMedia failed:", error.name);
      }
    }
  }

  function stopRecord() {
    recorderRef.current.stop();
  }

  async function onRecordingFinish(event) {
    console.log("RECORDING AUDIO COMPLETE");
    const audioChunks = [];
    audioChunks.push(event.data);
    const blob = new Blob(audioChunks, { type: "audio/mp3" });
    setBlobAudio(blob);
    const blob_stream = blob.stream();
    console.log("AUDIO blob", blob);
    console.log("AUDIO ReadableStream", blob_stream);

    const audioURL = URL.createObjectURL(blob);
    setAudioUrl(audioURL);
    console.log(audioURL);

    listenAudioRecorded();
  }

  async function listenAudioRecorded() {
    audio.src = audioUrl;
    await audio.play();
  }

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      {/* <Link to="/editor">Go to the Editor page</Link> */}
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      {/* <Link to="/lounge">Go to the Lounge</Link> */}
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
      <p>Record audio and upload to AWS S3 with React.js</p>
      <button onClick={startRecord}>Start record</button>
      <br />
      <button onClick={stopRecord}>Stop record</button>
      <br />
      <button onClick={listenAudioRecorded}>Listen audio</button>

      <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      </div>
    </section>
  );
};

export default Home;
