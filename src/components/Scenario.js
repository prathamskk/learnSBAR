import "../styles/scenario.css";
import patient from "../images/patient_image.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScenariosList from "./scenariosList.json";
import { useEffect } from "react";
const Scenario = () => {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    //IF SCENARIO DOESNT EXIST GO BACK TO SCENARIOS LIST
    if (ScenariosList["scenario" + params.scenarioId] == undefined) {
      navigate("/");
    }
  }, []);

  const handleNewAttempt = () => {};

  return (
    <div>
      <div class="container">
        <div className="scenariono">Scenario {params.scenarioId}</div>
        <div className="scenariono">
          {ScenariosList["scenario" + params.scenarioId].name}
        </div>
        <div className="video">
          <video poster={patient} controls controlsList="play">
            <source
              src={ScenariosList["scenario" + params.scenarioId].url}
              type="video/mp4"
            />
          </video>
        </div>
        <label class="la">scenario explaination video</label>

        <div class="buttons">
          <Link to="/newattempt">
            <button className="na">
              New <br />
              Attempt
            </button>
          </Link>

          <a href="/submission" class="ps">
            Previous <br />
            Submissions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Scenario;
