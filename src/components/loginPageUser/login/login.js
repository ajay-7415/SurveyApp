import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/action/loginAction/loginA";
import loginValidate from "./loginFormValidation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../../../assets/css/responsive.css";
import { userRole } from "../../../constants/usersRoles";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [validateData, setValidatedata] = useState(null);
  

  const LoginData = useSelector((state) => state?.loginUserReducer?.data);
  const RegisterData = useSelector(
    (state) => state?.signInUserReducer?.data?.data
  );
  const notify = () => toast.error("Please enter Valid Data");
  let uuid = LoginData && LoginData.uuid;
  const userData = JSON.parse(localStorage.getItem("loginDetails"));
  const userRoleID = userData?.data?.role_id || "";
  
  if (userRoleID === userRole.ADMIN) {
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
    toast.success("Login Succesfully");
    localStorage.setItem("UserRole", "admin");
    localStorage.setItem("token", userData?.data?.accessToken);
  } else if (userRoleID === userRole.SUPERVISOR) {
    setTimeout(() => {
      navigate("/surveyPage/dashboard");
    }, 2000);
    // window.location.reload()
    localStorage.setItem("UserRole", "supervisor");
    localStorage.setItem("token", userData?.data?.accessToken);
    localStorage.setItem("UUID", userData?.data?.uuid);
    localStorage.setItem("WorkerData", JSON.stringify(userData?.data?.worker_data));
    localStorage.setItem("UUID", userData?.data?.uuid);
    localStorage.setItem("email", values.email);
    localStorage.setItem("WorkerData", JSON.stringify(userData?.data?.worker_data));
    localStorage.setItem("img", userData?.data?.profile);
    localStorage.setItem("name", userData?.data?.name);
    localStorage.setItem("id", JSON.stringify(userData?.data?.id));
  } else if (userRoleID === userRole.WORKER) {
    localStorage.setItem("UserRole", "worker");
    setTimeout(() => {
      navigate("/surveyPage/survey");
    }, 2000);

    // window.location.reload()
    localStorage.setItem("token", userData?.data?.accessToken);
    localStorage.setItem("UUID", uuid);
    localStorage.setItem(
      "WorkerData",
      JSON.stringify([LoginData?.worker_data])
    );
    localStorage.setItem("UUID", uuid);
    localStorage.setItem("email", values.email);
    localStorage.setItem(
      "WorkerData",
      JSON.stringify([LoginData?.worker_data])
    );
    localStorage.setItem("img", LoginData?.profile);
    localStorage.setItem("name", LoginData?.name);
  }
  useEffect(() => {
    if (RegisterData?.status === "success") {
      toast.success("your Data is Submited");
    } else if (LoginData?.response?.data?.status === "failed") {
      notify();
    }
  }, [LoginData]);

  useEffect(() => {
    
      let surveyRole = localStorage.getItem("UserRole");
      let adminRole = localStorage.getItem("UserRole");
      let supervisorRole = localStorage.getItem("UserRole");
      
      // if (surveyRole === "worker") {
        //   navigate("/surveyPage/survey");
        // } else
        if (adminRole === "admin") {
          navigate("/admin");
        }
        else if(supervisorRole === "supervisor"){
          navigate("/surveyPage/dashboard");
        }  
  });

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (validateData) {
      setErrors(loginValidate(values));
    }
  };
  const Submit = (e) => {
    e.preventDefault();
    setValidatedata(true);
    dispatch(loginUserAction(values));
    setErrors(loginValidate(values, setValues));
  };
  return (
    <div>
      <ToastContainer
        className="ToastContainer"
        position="top-right"
        autoClose={2000}
      />
      <div className="login-form-container">
        <div className="login-wrapper">
          <h2 className="login">Login</h2>
          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input-field login-input"
              value={values.email || " "}
              onChange={handleChange}
              name="email"
              required
            />
            {errors.email && (
              <b className="login_is-danger for-email">{errors.email}</b>
            )}
            <label className="login-label-password">Password</label>
            <input
              type="password"
              className="login-input-password"
              value={values.password || ""}
              onChange={handleChange}
              name="password"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  Submit();
                }
              }}
              required
            />
            {errors.password && (
              <b className="login_is-danger">{errors.password}</b>
            )}
            <div className="link">
              <a className="login-reset-link" href="/addUser">
                {/* <i>  Reser password</i> */}
              </a>
            </div>
            <button className="login-btn" onClick={Submit}>
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="img-container">
        <div className="img-container1"></div>
      </div>
    </div>
  );
};
export default Login;
