import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SurveyPages from '../../pages/surveyPages';
import { user } from "../../assets/img/Img";
import { MdDelete } from "react-icons/md";
import EscapeOutside from "react-escape-outside";
import { useDispatch, useSelector } from 'react-redux';
import EditUser from '../admin/editUser/editUser';
import { fetchAverageWorkerData } from '../../redux/action/workerDataAction/workerDataA';
import { userDataStatic } from "../../components/common/data";
import { FiEdit } from 'react-icons/fi';
import { editData } from '../../redux/action/userDataAction/editAction';
import "../surveyPages/team.css"
import { fetchUserAction } from '../../redux/action/userDataAction/fetchUser';
import TeamUser from './teamModal/teamUser';
import UserFooter from '../loginPageUser/footer/footer';



const Team = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();
  const pendingData = useSelector(
    (state) => state?.getAverageWorkerData?.averageData
  )

  const userData = useSelector((state) => state?.fetchUserReducer?.data);

  let reporting_person_id =   JSON.parse(localStorage.getItem("id"));

  let supervisorData = userData?.filter(function (supervisor) {
    return supervisor.reporting_person_id === reporting_person_id;
}).map(function (supervisor) {
    return supervisor;
})
  const Edit = (data) => {
    setShowEdit(true);
    dispatch(editData(data));
  };

  useEffect(() => {
    dispatch(fetchAverageWorkerData())
    dispatch(fetchUserAction());
  }, []);




  return (
    <div>
      <SurveyPages/>
      <div className='container'>
      <div className="teamFlow">
        <EscapeOutside onEscapeOutside={() => setShowEdit(false)}>
          <div>
            {showEdit && (
              <TeamUser
                setShowEdit={setShowEdit}
              />
            )}
          </div>
        </EscapeOutside>

          <div className="supervisor-map">
            {supervisorData !== undefined &&
              supervisorData &&
              supervisorData?.map((e, id) => {
                return (
                  <div className="supervisor" key={id}>
                     <div className="supervisor-profile">
                    {e.image_src == null ? (
                      <div className="supervisor-img-null">
                         <img  src={user} alt="alter" />
                      </div>
                     
                    ) : (
                      <div  className="supervisor-img">
                          <img
                       src={"https://survey-api-m9x0.onrender.com/" + e.image_src}
                       alt="Hello"
                     />
                      </div>
                    
                    )}
                    </div>
                    <p className="supervisor-details">{e.name}</p>
                    <div className="supervisor-report">
                        <div className="supervisor_user_name_Id">
                          {e.reporting_person_name == null ? (
                            <b className="supervisor_reporting_person_name">{e.role}</b>
                          ) : (
                            <div>
                              <p className="supervisor_reporting_to">reporting To</p>
                              <p className="supervisor_reporting_person_name">
                                {e.reporting_person_name}
                              </p>
                            </div>
                          )}
                        </div>
                      <div>
                        <span className="edit-icon" onClick={() => Edit(e)}>
                          <FiEdit />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            {supervisorData === undefined &&
              userDataStatic &&
              userDataStatic?.map((e, id) => {
                return (
                  <div className="user" key={id}>
                    {e.image_src == null ? (
                      <img className="user-img-null" src={user} alt="Hello" />
                    ) : (
                      <img
                        className="user-img"
                        src={"https://survey-api-m9x0.onrender.com/" + e.image_src}
                        alt="Hello"
                      />
                    )}
                    <span className="user-details">{e.name}</span>
                    <div className="user-report">
                      <div>
                        <span className="user_name_Id">
                          {e.reporting_person_name == null ? (
                            <b className="reporting_person_name">{e.role}</b>
                          ) : (
                            <div>
                              <span className="reporting_to">reporting To</span>
                              <br />
                              <span className="reporting_person_name">
                                {e.reporting_person_name}
                              </span>
                            </div>
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="edit-icon" onClick={() => Edit(e)}>
                          <FiEdit />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
      </div>
    </div>
    <UserFooter/>
    </div>
  )
}

export default Team;
