import React from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import "../components/LoaderComponent.css";
export default function LoaderComponent() {
   const isLoading = useSelector((state) => state?.loader?.isLoading);

  return (
     isLoading ?
    <div
      style={{
        display: "flex",
        position: "fixed",
        height: "100vh",
        width: "100%",
        top: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
        zIndex: "9999",
        backgroundColor: "#fff9",
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
       : null
  );
}
