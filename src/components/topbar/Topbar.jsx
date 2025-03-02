import React from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./topbar.css";
import styled from "styled-components";

export default function Topbar() {
  const { dispatch } = React.useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DISCUSSION FORUM ADMIN</span>
        </div>
        <div className="topRight">
          <Btn type="submit" onClick={() => {
            dispatch({ type: "LOGOUT" });
          }}>
            Log out
          </Btn>
        </div>
      </div>
    </div>
  );
}

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  width: 100%;
  height: 2rem;
  border-radius: 0.7rem;
  background: #c9283d;
  font-size: 0.6rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 2rem 1rem;
  cursor: pointer;
  transition: ease-in-out 0.5s;
  font-weight: bold;
  border: none;

  &:hover {
    border: 2px solid #c9283d;
    color: #c9283d;
    background: transparent;
  }
`;