import "../styles/reflective.css";
import { useState, useEffect } from "react";
import ReflectiveQuestions from "./ReflectiveQuestions.json";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

const Reflective = ({
  setStepno,
  attemptNo,
  refreshScenarios,
  calculateAttemptNo,
}) => {
  const [formData, setFormData] = useState({});
  const { scenarios } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  useEffect(() => {
    refreshScenarios();
  }, []);

  const handleClick = (questionId, isChecked) => {
    setFormData((prev) => {
      if (isChecked) {
        prev[questionId] = ReflectiveQuestions[questionId];
      } else {
        delete prev[questionId];
      }
      console.log(prev);
      return prev;
    });
  };

  const handleTextAreaSubmit = (value) => {
    setFormData((prev) => {
      prev["2"] = value;
      console.log(prev);
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
          type: "ass2",
          data: formData,
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
    <div className="reflective_qns_list">
      <div className="hero_title">
        <div>Fill Self Reflective Questions</div>
      </div>
      <div>
        <form onSubmit="">
          <div className="reflective_1">
            <div className="quest">
              <span>1.</span>&nbsp;
              <div>What you did well?</div>
            </div>
            <div className="options">
              <div className="option">
                <input
                  type="checkbox"
                  value="1.1"
                  onClick={(e) => handleClick(e.target.value, e.target.checked)}
                />
                <div className="options_value">
                  Information transfer was clear and in a concise way
                </div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="1.2"
                  onClick={(e) => handleClick(e.target.value, e.target.checked)}
                />
                <div className="options_value">
                  Did not missed any point to convey related to patient
                </div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="1.3"
                  onClick={(e) => handleClick(e.target.value, e.target.checked)}
                />
                <div className="options_value">
                  Emphasized important points while conveying
                </div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="1.4"
                  onClick={(e) => handleClick(e.target.value, e.target.checked)}
                />
                <div className="options_value">Followed SBAR technique</div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="1.5"
                  onClick={(e) => handleClick(e.target.value, e.target.checked)}
                />
                <div className="options_value">
                  Pacing was appropriate (neither too fast or slow)
                </div>
              </div>
            </div>
          </div>
          <div className="reflective_2">
            <div className="quest">
              <span>2.</span>&nbsp;
              <div>What you thought could be improved?</div>
            </div>
            <div className="text_box">
              <input
                type="textarea"
                rows="5"
                cols="33"
                placeholder="Enter your thoughts..."
                onChange={(e) => {
                  handleTextAreaSubmit(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </form>
      </div>
      <div className="next-btn-reflect">
        <button className="next-reflect" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Reflective;
