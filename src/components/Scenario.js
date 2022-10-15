import "../styles/scenario.css";
import Navbar from "./Navbar";
import patient from "../images/patient_image.png";
import triangle from "../images/triangle.svg";
import scenario_1 from "../images/scenario_1.mp4";

const Scenario = () => {
  return (
    <div>
      <Navbar />
      <div class="container">
        <div className="scenariono">Scenario 1</div>
        <div className="video">
          <video poster={patient} controls controlsList="play">
            <source src={scenario_1} type="video/mp4" />
          </video>
        </div>
        <label class="la">scenario explaination video</label>

        <div class="buttons">
          <a href="/record" class="na">
            New <br />
            Attempt
          </a>
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
