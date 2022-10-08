import "../styles/spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="blackOverlay"></div>
    </div>
  );
};

export default Spinner;
