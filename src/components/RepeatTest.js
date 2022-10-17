import "../styles/scenario.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ScenariosList from "./scenariosList.json";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
const Scenario = () => {
  const { scenarios } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (ScenariosList["scenario" + params.scenarioId] === undefined) {
      console.log("scenario doesnt exist");
      navigate("/");
    }
  });

  return (
    <div>
      <div className="container">
        <div className="video">
          <video
            poster="/images/patient_image.png"
            controls
            controlsList="play"
          >
            <source
              src={ScenariosList["scenario" + params.scenarioId].exemplarUrl}
              type="video/mp4"
            />
          </video>
        </div>
        <label className="la2">
          watch exemplar SBAR briefing pre-recorder <br /> by professional
        </label>
        <div className="buttons">
          <Link to="/newattempt/1">
            <button className="na">
              New
              <br />
              Attempt
            </button>
          </Link>
          <Link to="/">
            <button className="ps">
              Go To
              <br />
              Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Scenario;
