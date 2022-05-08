import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import News from "./components/News";
import NewsPage from "./components/NewsPage";
import Crickbuzz from "./components/Crickbuzz";
import GetMatches from "./components/GetMatches";
import getMatchScore from "./components/getMatchScore";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [currentUser, dispatch] = useState();
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/latestNews" element={<NewsPage />} />
        <Route
          path="/liveScore"
          component={getMatchScore}
          element={<Crickbuzz />}
        />

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
