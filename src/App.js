import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Sign,
  Survey,
  worker,
  add,
  surveyPage,
  dashboard,
  team,
  setting,
  addTask
} from "./components/common/constantRouter";
import AdminFlowPage from "./pages/adminFlow";
import LoginPage from "./pages/login";
import SurveyAppPage from "./pages/surveyApp";
import { Protected } from "./components/loginPageUser/login/protected";
import ErrorPage from "./components/common/404Page";
import WorkerDetails from "./components/Survey/workerDetails";
import RagisterPage from "./pages/ragisterPage"; // remove it

import AddTask from "./components/addTask";

import SurveyPages from "./pages/surveyPages";
import Dashboard from "./components/surveyPages/dashboard";
import Team from "./components/surveyPages/team";
import Setting from "./components/surveyPages/setting";
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <div className="main-edituser">
        <Routes>
          <Route path={Home} element={<Protected Component={LoginPage} />} />
          <Route
            path={Sign}
            element={<Protected Component={AdminFlowPage} />}
          />
          <Route
            path={Survey}
            element={<SurveyAppPage/>}
          />
          <Route path={add} element={<RagisterPage />} /> // remove it
          <Route path={worker} element={<WorkerDetails />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path={addTask} element={<AddTask />} />

          <Route path={surveyPage} element={<SurveyPages />} />
          <Route path={dashboard} element={<Dashboard />} />
          <Route path={team} element={<Team />} />
          <Route path={setting} element={<Setting />} />
        </Routes>
    </div>
  );
}
export default App;
