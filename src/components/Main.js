import s1logo from "../images/scic1.svg";
import "../styles/homepage.css";

const Main = () => {
  return (
    <>
      <div className="info">
        Read how SBAR can ease the communication transfer
      </div>
      <div className="container">
        <a href="/record">
          <div className="card">
            <img src={s1logo} class="s1" alt="s1_pic"></img>

            <div className="sch">
              <h3 className="schead">Scenario 1</h3>
              <div className="scpara">
                This scenario describes about the patient’s sufferings she is
                currently going through.
              </div>
            </div>
            <div className="gitem layout">Pass</div>
          </div>
        </a>

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
          <img src={s1logo} class="s1"></img>
          {/* </div> */}
          <div className="sch">
            <h3 className="schead">Scenario 3</h3>
            <div className="scpara">.</div>
          </div>
          <div className="gitem layout">Pass</div>
        </div>
        <div className="card">
          {/* <div> */}
          <img src={s1logo} class="s1"></img>
          {/* </div> */}
          <div className="sch">
            <h3 className="schead">Scenario 4</h3>
            <div className="scpara">.</div>
          </div>
          <div className="gitem layout">Pass</div>
        </div>
      </div>
    </>
  );
};

export default Main;
