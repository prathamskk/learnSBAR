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
            {Object.keys(scenarios).length ? (
              Object.keys(scenarios).map((keyName, i) => (
                <div className="submission">
                  <div className="scenarioNo">{keyName}</div>
                  {Object.keys(scenarios[keyName]).map((attempt) => {
                    return (
                      <div className="submissionNo">
                        <div className="submission-time">
                          <h2 className="attempts">{attempt}</h2>
                        </div>
                        {Object.keys(scenarios[keyName][attempt]).map(
                          (data) => {
                            return data === "rec2" ? (
                              <div className="latest_audio">
                                <audio controls>
                                  <source
                                    src={scenarios[keyName][attempt][data]}
                                    type="audio/mp3"
                                  ></source>
                                </audio>
                              </div>
                            ) : (
                              ""
                            );
                          }
                        )}
                        <div className="view_more">View more</div>
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="no_submissions">No Submissions yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
