import "../styles/scenario.css";
import patient from "../images/patient_image.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ScenariosList from "./scenariosList.json";
import { useEffect, useState } from "react";
const Scenario = () => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div>
      <div className="container">
        <div className="video">
          <video poster={patient} controls controlsList="play">
            <source
            //   src={ScenariosList["scenario" + params.scenarioId].url}
            //   type="video/mp4"
            />
          </video>
        </div>
        <label className="la2">
          watch exemplar SBAR briefing pre-recorder <br /> by professional
        </label>
        <div className="buttons">
          <Link to={"/newattempt/" + params.scenarioId}>
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
