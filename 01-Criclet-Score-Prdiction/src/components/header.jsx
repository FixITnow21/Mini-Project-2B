import Sidebar from "./Sidebar";
import { Features } from "./features";
import { useState, useEffect } from "react";
import JsonData from "../data/data.json";

export const Header = (props) => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className="header">
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {props.data ? props.data.title : "Loading"}
                    <span></span>
                  </h1>
                  <p>{props.data ? props.data.paragraph : "Loading"}</p>
                  <a
                    href="http://127.0.0.1:5000"
                    target="_blank"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Make Prediction
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
