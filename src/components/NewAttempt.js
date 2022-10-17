import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AttemptSteps from "./AttemptSteps.json";
import Record from "./Record";
import Assessment from "./Assessment";
import Reflective from "./Reflective";
import RepeatTest from "./RepeatTest";
import useScenarios from "../hooks/useScenarios";
import ScenariosList from "./scenariosList.json";

const calculateAttemptNo = (scenarios, scenarioId) => {
  let attemptno = 1;

  let attempt = "attempt" + attemptno;
  let scenariokey = "scenario" + scenarioId;
  let scenariosObject = scenarios[scenariokey];

  for (attempt in scenariosObject) {
    const lastattempt =
      scenarios["scenario" + scenarioId]["attempt" + attemptno];
    for (let stepno = 0; stepno < AttemptSteps.length; stepno++) {
      if (lastattempt[AttemptSteps[stepno]] === undefined) {
        return { stepno: stepno, attemptno: attemptno };
      }
    }

    attemptno++;
    attempt = "attempt" + attemptno;
  }

  return { stepno: 0, attemptno: attemptno };
};

const NewAttempt = () => {
  const navigate = useNavigate();
  const params = useParams();
  //IF SCENARIO DOESNT EXIST GO BACK TO SCENARIOS LIST
  useEffect(() => {
    if (ScenariosList["scenario" + params.scenarioId] === undefined) {
      console.log("scenario doesnt exist");
      navigate("/");
    }
  });

  const refreshScenarios = useScenarios();

  //refreshScenarios
  useEffect(async () => {
    await refreshScenarios();
  }, []);

  const [stepno, setStepno] = useState(0);
  const [attemptNo, setAttemptNo] = useState(0);

  const { scenarios } = useAuth();

  //calculate attempt and scenariono on first load
  useEffect(() => {
    const result = calculateAttemptNo(scenarios, params.scenarioId);
    setStepno(result.stepno);
    setAttemptNo(result.attemptno);
  }, []);

  //debugging statement
  useEffect(() => {
    console.log(scenarios, "stepno : ", stepno, "attemptno : ", attemptNo);
  }, [stepno, attemptNo, scenarios]);

  switch (stepno) {
    case 0:
      return (
        <Record
          setStepno={setStepno}
          attemptNo={attemptNo}
          refreshScenarios={refreshScenarios}
          calculateAttemptNo={calculateAttemptNo}
        />
      );
    case 1:
      return (
        <Assessment
          setStepno={setStepno}
          attemptNo={attemptNo}
          refreshScenarios={refreshScenarios}
          calculateAttemptNo={calculateAttemptNo}
        />
      );
    case 2:
      return <Reflective />;
    case 3:
      return <Record />;
    case 4:
      return <RepeatTest />;
    default:
      return <Record />;
  }
};

export default NewAttempt;
