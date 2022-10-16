import { Link } from "react-router-dom";
import s1logo from "../images/scic1.svg";
import "../styles/homepage.css";
import { useState, useEffect } from "react";
import useScenarios from "../hooks/useScenarios";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Scenarios = () => {
  const { setScenarios } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const refreshScenario = async () => {
      const sceresponse = await axiosPrivate.get(
        "https://21eu98s4bi.execute-api.ap-south-1.amazonaws.com/dev/submission"
      );
      setScenarios(sceresponse.data?.scenarios);
    };

    refreshScenario();

    return () => {};
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
          <div className="card">
            <img src={s1logo} class="s1" alt="s1_pic"></img>
            <div className="sch">
              <h3 className="schead">Scenario 1</h3>
              <div className="scpara">
                <a href="/scenario/1" className="card_link">
                  This scenario describes about the patient’s sufferings she is
                  currently going through.
                </a>
              </div>
            </div>
            <div className="gitem layout">Pass</div>
          </div>

          <div className="card">
            <img src={s1logo} class="s1" alt="sbar_pic" />

            <div className="sch">
              <h3 className="schead">Scenario 2</h3>
              <div className="scpara">.</div>
            </div>
            <div className="gitem layout">Pass</div>
          </div>
          <div className="card">
            {/* <div> */}
            <img src={s1logo} alt="logo" class="s1"></img>
            {/* </div> */}
            <div className="sch">
              <h3 className="schead">Scenario 3</h3>
              <div className="scpara">.</div>
            </div>
            <div className="gitem layout">Pass</div>
          </div>
          <div className="card">
            {/* <div> */}
            <img src={s1logo} alt="logo" className="s1"></img>
            {/* </div> */}
            <div className="sch">
              <h3 className="schead">Scenario 4</h3>
              <div className="scpara">.</div>
            </div>
            <div className="gitem layout">Pass</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;