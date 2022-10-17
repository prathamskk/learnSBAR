import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AttemptSteps from "./AttemptSteps.json";
import Record from "./Record";
import Assessment from "./Assessment";
import Reflective from "./Reflective";
import useScenarios from "../hooks/useScenarios";

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
  const refreshScenarios = useScenarios();
  useEffect(async () => {
    await refreshScenarios();
  }, []);

  const [stepno, setStepno] = useState(0);
  const [attemptNo, setAttemptNo] = useState(0);

  const params = useParams();
  const { scenarios } = useAuth();
  useEffect(() => {
    const result = calculateAttemptNo(scenarios, params.scenarioId);
    setStepno(result.stepno);
    setAttemptNo(result.attemptno);
  }, []);

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
      return <Assessment attemptNo={attemptNo} />;
    case 2:
      return <Reflective />;
    case 3:
      return <Record />;
    default:
      return <Record />;
  }
};

export default NewAttempt;
