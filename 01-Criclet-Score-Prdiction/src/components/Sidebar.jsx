import React from "react";
import "./Sidebar.css";
import { SidebarData } from "./SideBarData";
import Card from "react-bootstrap/Card";
import News2 from "./News2";
import "./News.css";
import "./News2.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h1
        style={{
          textAlign: "center",
          marginLeft: "-20px",
          marginBottom: "-20px",
          color: "white",
          marginTop: "80px",
          textShadow: "2px 2px 4px #000000",
        }}
      >
        LATEST NEWS
      </h1>
      <div className="news-cards">
        <News2 />
      </div>
    </div>
  );
}

export default Sidebar;
