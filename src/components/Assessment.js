import React, { useEffect } from "react";
import "../styles/assessment.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import AssessmentQuestions from "./AssessmentQuestions.json";

const Assessment = ({
  setStepno,
  attemptNo,
  refreshScenarios,
  calculateAttemptNo,
}) => {
  const [assessmentFormData, setAssessmentFormData] = useState({});
  const { scenarios } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  useEffect(() => {
    refreshScenarios();
  }, []);

  const handleClick = (questionId, isChecked) => {
    setAssessmentFormData((prev) => {
      if (isChecked) {
        prev[questionId] = AssessmentQuestions[questionId];
      } else {
        delete prev[questionId];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    axiosPrivate
      .post(
        "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/submission",
        {
          scenarioNo: params.scenarioId,
          attemptNo: attemptNo,
          type: "ass1",
          data: assessmentFormData,
        }
      )
      //refresh(get) scenarios from db
      .then((response) => {
        refreshScenarios();
      })
      .catch((error) => {
        alert("ERROR " + JSON.stringify(error));
      });
  };

  useEffect(() => {
    const result = calculateAttemptNo(scenarios, params.scenarioId);
    console.log(result);
    setStepno(result.stepno);
  }, [scenarios]);

  return (
    <div className="container1">
      <div className="Sno">Scenerio 1 </div>
      <div className="Sno">Attempt #{attemptNo}</div>
      <div className="Audio">
        {/* Audio */}
        {scenarios ? (
          <audio
            src={
              scenarios["scenario" + params.scenarioId]["attempt" + attemptNo]
                .rec1
            }
            controls="controls"
          />
        ) : null}
      </div>
      <div className="AudLin">Listen Back and fill self assessment form</div>
      <div className="QnA">
        <div className="Qhead">Identify</div>
        <div className="Ques">
          <label htmlFor="1.1" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="1.1"
              id="1.1"
              onClick={(e) => {
                handleClick(e.target.value, e.target.checked);
              }}
            />
            <label htmlFor="1.1">Name</label>
          </label>
          <label htmlFor="1.2" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="1.2"
              id="1.2"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="1.2">Position/Professional Title</label>
          </label>
          <label htmlFor="1.3" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="1.3"
              id="1.3"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="1.3">Where he/she is calling from</label>
          </label>
        </div>
        {/* <-- --> */}
        <div className="Qhead">Situation</div>
        <div className="Ques">
          <label htmlFor="2.1" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="2.1"
              id="2.1"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="2.1">Patient by name and age</label>
          </label>
          <label htmlFor="2.2" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="2.2"
              id="2.2"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="2.2">Diagnosis or cheif complaint</label>
          </label>
          <label htmlFor="2.3" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="2.3"
              id="2.3"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="2.3">Reason for the call/problem</label>
          </label>
        </div>
        {/* <-- --> */}
        <div className="Qhead">Background & Assessment</div>
        <div className="Ques">
          <label htmlFor="3.1" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="3.1"
              id="3.1"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="3.1">Relevant Past Medical History</label>
          </label>
          <label htmlFor="3.2" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="3.2"
              id="3.2"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="3.2">Relevant assessment data</label>
          </label>
          <label htmlFor="3.3" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="3.3"
              id="3.3"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="3.3">Recent interventions for the patient</label>
          </label>
        </div>
        {/* <-- --> */}
        <div className="Qhead">Recommendation & Repeat</div>
        <div className="Ques">
          <label htmlFor="4.1" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="4.1"
              id="4.1"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="4.1">
              Suggests potential reason for condition or suggests interventions
            </label>
          </label>
          <label htmlFor="4.2" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="4.2"
              id="4.2"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="4.2">Provides timeframe/urgency for action</label>
          </label>
          <label htmlFor="4.3" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="4.3"
              id="4.3"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="4.3">
              Repeats back all orders; clarifying if needed
            </label>
          </label>
        </div>
        {/* <-- --> */}
        <div className="Qhead">Order & Accuracy</div>
        <div className="Ques">
          <label htmlFor="5.1" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="5.1"
              id="5.1"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />

            <label htmlFor="5.1">Correct Order/Sequence</label>
          </label>
          <label htmlFor="5.2" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="5.2"
              id="5.2"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="5.2">Accurate Data Reported</label>
          </label>
          <label htmlFor="5.3" className="selbox">
            <input
              type="checkbox"
              className="cb"
              value="5.3"
              id="5.3"
              onClick={(e) => handleClick(e.target.value, e.target.checked)}
            />
            <label htmlFor="5.3">Concise</label>
          </label>
        </div>
      </div>
      <button onClick={handleSubmit} className="submitbtn">
        Submit
      </button>
    </div>
  );
};
export default Assessment;
