import Register from "./components/Register";
import Login from "./components/Login";
import Scenarios from "./components/Scenarios";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Submission from "./components/Submission";
import Scenario from "./components/Scenario";
import NewAttempt from "./components/NewAttempt";
import Record from "./components/Record";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="scenario/:scenarioId" element={<Scenario />} />
            <Route path="newattempt/:scenarioId" element={<NewAttempt />} />
            <Route path="submission" element={<Submission />} />
            <Route path="/" element={<Scenarios />} />
            <Route path="record" element={<Record />} />
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route> */}

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route> */}
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
