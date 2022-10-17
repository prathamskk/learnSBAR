import React, { useEffect } from "react";
import "../styles/assessment.css";
import "../styles/reset.css";
import { useState } from "react";
import useScenarios from "../hooks/useScenarios";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

const Assessment = ({ attemptNo }) => {
  const refreshScenarios = useScenarios();
  const [assessmentData, setAssessmentData] = useState("");
  const [assessmentFormData, setAssessmentFormData] = useState({});
  const { scenarios } = useAuth();
  const params = useParams();

  useEffect(() => {
    refreshScenarios();
  }, []);

  useEffect(() => {
    setAssessmentFormData({ ...assessmentData, assessmentData });
    console.log(assessmentFormData);
  }, [assessmentData]);

  return (
    <div>
      <div className="container1">
        <div className="Sno">Scenerio 1</div>
        <div className="Audio">
          {/* Audio */}
        { scenarios["scenario"+params.scenarioId] === {} ?  <audio src={scenarios["scenario"+params.scenarioId]["attempt"+attemptNo].rec1} controls="controls" /> : null}
        </div>
        <div className="AudLin">Listen Back and fill self assessment form</div>
        <div className="QnA">
          <div className="Q1">
            <div className="Qhead">Identify</div>
            <label for="1.1" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="1.1"
                  id="1.1"
                  onClick={(e) => {
                    setAssessmentData(e.target.value);
                    console.log(assessmentData);
                  }}
                />
              </span>
              <span>
                <label>Name</label>
              </span>
            </label>
            <label for="1.2" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="1.2"
                  id="1.2"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Position/Professional Title</label>
              </span>
            </label>
            <label for="1.3" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="1.3"
                  id="1.3"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Where he/she is calling from</label>
              </span>
            </label>
          </div>
          {/* <-- --> */}
          <div className="Q2">
            <div className="Qhead">Situation</div>
            <label for="2.1" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="2.1"
                  id="2.1"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Patient by name and age</label>
              </span>
            </label>
            <label for="2.2" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="2.2"
                  id="2.2"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Diagnosis or cheif complaint</label>
              </span>
            </label>
            <label for="2.3" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="2.3"
                  id="2.3"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Reason for the call/problem</label>
              </span>
            </label>
          </div>
          {/* <-- --> */}
          <div className="Q3">
            <div className="Qhead">Background & Assessment</div>
            <label for="3.1" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="3.1"
                  id="3.1"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Relevant Past Medical History</label>
              </span>
            </label>
            <label for="3.2" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="3.2"
                  id="3.2"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Relevant assessment data</label>
              </span>
            </label>
            <label for="3.3" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="3.3"
                  id="3.3"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Recent interventions for the patient</label>
              </span>
            </label>
          </div>
          {/* <-- --> */}
          <div className="Q4">
            <div className="Qhead">Recommendation & Repeat</div>
            <label for="4.1" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="4.1"
                  id="4.1"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>
                  Suggests potential reason for condition or suggests<br></br>
                  &ensp;&ensp;&ensp; interventions
                </label>
              </span>
            </label>
            <label for="4.2" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="4.2"
                  id="4.2"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Provides timeframe/urgency for action</label>
              </span>
            </label>
            <label for="4.3" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="4.3"
                  id="4.3"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Repeats back all orders; clarifying if needed</label>
              </span>
            </label>
          </div>
          {/* <-- --> */}
          <div className="Q5">
            <div className="Qhead">Order & Accuracy</div>
            <label for="5.1" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="5.1"
                  id="5.1"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Correct Order/Sequence</label>
              </span>
            </label>
            <label for="5.2" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="5.2"
                  id="5.2"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Accurate Data Reported</label>
              </span>
            </label>
            <label for="5.3" className="selbox">
              <span>
                <input
                  type="checkbox"
                  className="cb"
                  value="5.3"
                  id="5.3"
                  onClick={(e) => setAssessmentData(e.target.value)}
                />
              </span>
              <span>
                <label>Concise</label>
              </span>
            </label>
          </div>
        </div>
        <div className="next-btn-assess">
          <a href="/reflective" aria-disabled="true" className="next-assess">
            Next
          </a>
        </div>
      </div>
    </div>
  );
};
export default Assessment;
