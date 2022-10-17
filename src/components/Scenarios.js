import { Link } from "react-router-dom";
import "../styles/homepage.css";
import useScenarios from "../hooks/useScenarios";
import { useEffect } from "react";

const Scenarios = () => {
  const refreshScenarios = useScenarios();
  useEffect(() => {
    refreshScenarios();
  }, []);

  return (
    <div className="scenarios_list">
      <div className="card_container">
        <div className="info">
          <div>
            Read how SBAR can ease the
            <br /> communication transfer
          </div>
        </div>
        <div className="container_div">
          <Link to="/scenario/1" className="card">
            <img src="/images/scic1.svg" className="s1" alt="s1_pic"></img>
            <div className="sch">
              <h3 className="schead">Scenario 1 : Mrs Helena Jones</h3>
              <div className="scpara">
                <div className="card_link">
                  This scenario describes about the patient’s sufferings she is
                  currently going through.
                </div>
              </div>
            </div>
            <div className="gitem layout">Pass</div>
          </Link>
          <Link to="/scenario/2" className="card">
            <img src="/images/scic1.svg" className="s1" alt="s1_pic"></img>
            <div className="sch">
              <h3 className="schead">Scenario 2</h3>
              <div className="scpara">
                <div className="card_link">
                  This scenario describes about the patient’s sufferings she is
                  currently going through.
                </div>
              </div>
            </div>
            <div className="gitem layout">Pass</div>
          </Link>
          <Link to="/scenario/3" className="card">
            <img src="/images/scic1.svg" className="s1" alt="s1_pic"></img>
            <div className="sch">
              <h3 className="schead">Scenario 3</h3>
              <div className="scpara">
                <div className="card_link">
                  This scenario describes about the patient’s sufferings she is
                  currently going through.
                </div>
              </div>
            </div>
            <div className="gitem layout">Pass</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
