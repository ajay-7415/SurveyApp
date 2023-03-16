import React, { useState, useEffect } from "react";
import WorkerSurvey from "./WorkerSurvey";
import WorkerFooter from "../surveyFooter/workerFooter";
import Header from "../surveyHeader/surveyHeader";
import "./surveyApp.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkerDataAction,
  postWorkerDataAction,
} from "../../redux/action/workerDataAction/workerDataA";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { fetchUserAction } from "../../redux/action/userDataAction/fetchUser";
import SurveyPages from "../../pages/surveyPages";

const WorkerDetails = () => {
  const uuid = localStorage.getItem("UUID");
  const dispatch = useDispatch();
  const { worker } = useParams();
  const navigate = useNavigate();
  let LoginData = JSON.parse(localStorage.getItem("WorkerData") || "[]");
  const [tabActive, setTabActive] = useState(0);
  const data = useSelector((state) => state?.fetchWorkerDataReducer);
  let workerMap = [];
  LoginData.map((e) => (workerMap = e));
  const optionData = useSelector((state) => state?.fetchUserReducer?.data);
  let superVisor = optionData && optionData?.find((e) => e.uuid == uuid);
  // let workerName = workerMap.find((e) => e.id == worker);
  let UUID = localStorage.getItem("UUID");
  const wuuid = localStorage.getItem("workerId");
  const [test , setTest]=useState(wuuid)

  useEffect(() => {
    dispatch(fetchWorkerDataAction( test , UUID ));
  }, [test]);
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var d = new Date();
  var monthName = months[d.getMonth()];
  const setTab = (tabId) => {
    setTabActive(tabId + 1);
  };
  let surveydata;
  const setServeyAnswers = (surveyInfo) => {
    let mySurveyIndex = data?.surveyData?.surveydata.findIndex(
      (survey) => survey.survey_id === surveyInfo.survey_id
    );
    let survey = data?.surveyData?.surveydata[mySurveyIndex];
    survey.comment = surveyInfo.comment;
    surveyInfo.question.map((question) => {
      let questionIndex = survey.question.findIndex(
        (sQuestion) => sQuestion.qid === question.qid
      );
      survey.question[questionIndex].ans = question.ans;
    });
    surveydata = data?.surveyData?.surveydata;
  };
  const submitSurvey = () => {
    dispatch(
      postWorkerDataAction({
        wuuid,
        surveydata,
      })
    );
    dispatch(fetchWorkerDataAction( test , UUID ));
  };
const superVisor1 = localStorage.getItem("supervisor")

  const handleChange = (e) => {
    let workerData = e.target.value;
    localStorage.setItem("workerId", workerData);
    setTest(workerData)
    navigate(`/Survey/${workerData}`);  
  };
  let dm;
  if (superVisor?.role_id == 2) {
    dm = LoginData?.map((e)  => e.id == null);
  }
  let role =  localStorage.getItem("UserRole")
  return (
    <div className="wrepper">
        {role === 'supervisor' ? <SurveyPages/> : "" }
      <div className="container">
        <div className="date-container">
          <div className="date">
            <h2>
              {monthName} {new Date().getFullYear()} 
            </h2>
          </div>
          {!superVisor1 && LoginData && (
            <select
              className="select-option"
              onChange={handleChange}
              name="reporting_person_id"
              disabled={dm == "false"}
            >
              <option value="" disabled selected hidden>Select Worker</option>
              {LoginData?.map((data, id) => {
                
                return (
                  <React.Fragment key={id}>
                        <option value={data.id} key={id}>
                          {data.name}
                        </option>
                    
                  
                  </React.Fragment>
                );
              })}
            </select>
          )}
        </div>

        {data &&
          data.surveyData &&
          data.surveyData.surveydata &&
          data.surveyData.surveydata.map((surveyData, id) => {
            return (
              <div key={id} className="survey-wrapper">
                <WorkerSurvey
                  tabId={id}
                  title={surveyData.title}
                  questions={surveyData.question}
                  setTab={(id) => setTab(id)}
                  isActive={tabActive === id}
                  setAnswers={(surveyInfo) => setServeyAnswers(surveyInfo)}
                  submitSurvey={() => submitSurvey()}
                  comments={surveyData.comment}
                />
              </div>
            );
          })}
      </div>
      
      <WorkerFooter data={data?.surveyData?.surveydata} isActive={tabActive}/>
    </div>
  );
};
export default WorkerDetails;
