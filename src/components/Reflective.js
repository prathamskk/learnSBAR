import "../styles/reflective.css";
import { useState } from "react";

const Reflective = () => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <div>
        <div>Fill Self Reflective Questions</div>
      </div>
      <div>
        <form onSubmit="">
          <div className="reflective_1">
            <div className="quest_1">
              <div>What you did well?</div>
            </div>
            <div className="options">
              <div>
                <input
                  type="checkbox"
                  value="Information transfer was clear and in a concise way"
                />
                <div>Information transfer was clear and in a concise way</div>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Did not missed any point to convey related to patient"
                />
                <div>Did not missed any point to convey related to patient</div>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Emphasized important points while conveying"
                />
                <div>Emphasized important points while conveying</div>
              </div>
              <div>
                <input type="checkbox" value="Followed SBAR technique " />
                <div>Emphasized important points while conveying</div>
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Pacing was appropriate (neither too fast or slow)"
                />
                <div>Pacing was appropriate (neither too fast or slow)</div>
              </div>
            </div>
          </div>
          <div className="reflective_2">
            <div className="quest_1">
              <div>What you thought could be improved?</div>
            </div>
            <div className="options"></div>
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
