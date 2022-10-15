import "../styles/reflective.css";

const Reflective = () => {
  return (
    <div>
      <div>
        <div>Fill Self Reflective Questions</div>
      </div>
      <div>
        <div className="reflective_1">
          <div className="quest_1">
            <div>What you did well?</div>
          </div>
          <div className="options"></div>
        </div>
        <div className="reflective_2">
          <div className="quest_1">
            <div>What you thought could be improved?</div>
          </div>
          <div className="options"></div>
        </div>
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
