import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserData } from "../../../redux/action/userDataAction/deleteUserA";
import "./deleteModal.css";

function DeleteModal({ setOpenModal }) {
  const dispatch = useDispatch();
  const deleteData = useSelector((state) => state?.deleteData);



  
  const deleteUser = (id, data) => {
     dispatch(deleteUserData(id, data));
     setOpenModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
   
  };
  const deletes = () => toast.success("User is deleted sucessfully");

  return (
    <div className="modalBackground">
      <div className="deletemodalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="deletetitle">
        Are you sure you want to Delete these records?
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
           
          >
            Cancel
          </button>
          <button  id="cancelBtn"   onClick={() => deleteUser(deleteData.id, deleteData)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;