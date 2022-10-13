import Navbar from "./Navbar.js";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/submission.css";

const Submission = () => {
  const { scenarios } = useAuth();

  useEffect(() => {
    console.log(scenarios);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="title">
        <h3 id="submission_title">Previous Submissions</h3>
      </div>
      <div className="submission_container">
        <div className="scenario_lists">
          <div className="scenarios">
            {Object.keys(scenarios).map((keyName, i) => (
              <div>
                <div className="scenarioNo">{keyName}</div>
                {Object.keys(scenarios[keyName]).map((attempt) => {
                  return <div className="attemptNo">{attempt}</div>;
                })}
              </div>
            ))}
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
