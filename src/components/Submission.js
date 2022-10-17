import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/submission.css";
import useScenarios from "../hooks/useScenarios";

const Submission = () => {
  const { scenarios } = useAuth();
  const refreshScenarios = useScenarios();

  useEffect(() => {
    refreshScenarios();
  }, []);

  return (
    <div>
      <div className="title">
        <h3 id="submission_title">Previous Submissions</h3>
      </div>
      <div className="submission_container">
        <div className="scenario_lists">
          <div className="scenarios">
            {scenarios !== {} &&
              Object.keys(scenarios).map((keyName, i) => (
                <div className="submission">
                  <div className="scenarioNo">{keyName}</div>
                  {Object.keys(scenarios[keyName]).map((attempt) => {
                    return (
                      <div className="submissionNo">
                        <div className="submission-time">
                          <h2 className="attempts">{attempt}</h2>
                          <div id="time">2 hours ago</div>
                        </div>
                        {Object.keys(scenarios[keyName][attempt]).map(
                          (data) => {
                            return (
                              <div className="latest_audio">
                                <audio controls>
                                  <source
                                    src={scenarios[keyName][attempt][data]}
                                    type="audio/mp3"
                                  ></source>
                                </audio>
                              </div>
                            );
                          }
                        )}
                        <div className="view_more"></div>
                      </div>
                    );
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
