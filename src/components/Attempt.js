import { ResourceGroupsTaggingAPI } from "aws-sdk";
import "../styles/attempt.css";
import { useLocation } from "react-router-dom";

const Attempt = (props) => {
  const data = useLocation();
  const { scenarioNo, attempt, recording, assessment } = data.state;

  const openAccordion = () => {};

  return (
    <div className="scenario_submission">
      <div className="attempt_responses">
        <div className="scenario">
          <div id="scenarioNo">{scenarioNo}</div>
          <div className="scenario-desc">
            Scenarios helps you in making
            <br /> your communication better and
            <br />
            emphasizes on SBAR technique
          </div>
        </div>
        <div id="attemptNo">{attempt}</div>
        <div className="recordings">
          <div>Listen to your recordings</div>
          <div className="before">
            <div className="before_rec">Before Assessment</div>
            <audio controls>
              <source src={recording.rec1} type="audio/mp3"></source>
            </audio>
          </div>

          <div className="after">
            <div className="after_rec">After Assessment</div>
            <audio controls>
              <source src={recording.rec2} type="audio/mp3"></source>
            </audio>
          </div>
        </div>
        <div>
          <button
            className="accordion"
            onClick={function () {
              const acc = document.getElementsByClassName("accordion");

              for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                  this.classList.toggle("active");

                  /* Toggle between hiding and showing the active panel */
                  var panel = this.nextElementSibling;
                  if (panel.style.display === "block") {
                    panel.style.display = "none";
                  } else {
                    panel.style.display = "block";
                  }
                });
              }
            }}
          >
            <h1>Self Assessment Responses</h1>
          </button>
          <div className="panel">
            {Object.values(assessment.ass1).map((responses) => {
              return (
                <div className="ass_responses">
                  <input type="checkbox" checked />
                  <div>{responses}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="self_reflective">
          <button
            className="accordion"
            onClick={function () {
              const acc = document.getElementsByClassName("accordion");

              for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                  this.classList.toggle("active");

                  /* Toggle between hiding and showing the active panel */
                  var panel = this.nextElementSibling;
                  if (panel.style.display === "block") {
                    panel.style.display = "none";
                  } else {
                    panel.style.display = "block";
                  }
                });
              }
            }}
          >
            <h1>Self Reflective Responses</h1>
          </button>

          <div className="panel">
            {Object.values(assessment.ass2).map((responses) => {
              return (
                <div className="ass_responses">
                  <input type="checkbox" checked />
                  <div>{responses}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attempt;
