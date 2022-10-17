import "../styles/reflective.css";
import { useState } from "react";

const Reflective = () => {
  const [formData, setFormData] = useState({});


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
                  value="Information transfer was clear and in a concise way"
                />
                <div className="options_value">
                  Information transfer was clear and in a concise way
                </div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="Did not missed any point to convey related to patient"
                />
                <div className="options_value">
                  Did not missed any point to convey related to patient
                </div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="Emphasized important points while conveying"
                />
                <div className="options_value">
                  Emphasized important points while conveying
                </div>
              </div>
              <div className="option">
                <input type="checkbox" value="Followed SBAR technique" />
                <div className="options_value">Followed SBAR technique</div>
              </div>
              <div className="option">
                <input
                  type="checkbox"
                  value="Pacing was appropriate (neither too fast or slow)"
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
              <textarea
                rows="5"
                cols="33"
                placeholder="Enter your thoughts..."
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div className="next-btn-reflect">
        <a href="/assessment" aria-disabled="true" className="next-reflect">
          Next
        </a>
      </div>
    </div>
  );
};

export default Reflective;
