import React, { useEffect, useState } from "react";
import { Navigation } from "./navigation";
import "./News.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getNews } from "../api/api";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  heading: {
    fontSize: "1.1rem",
    fontWeight: "500",
  },
}));

function SimpleAccordion(news) {
  const classes = useStyles();
  return (
    <div>
      <Accordion style={{ marginBottom: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordSummary">
            <h4 className={classes.heading}>{news.news.title}</h4>
            <small>{new Date(news.news.publishedAt).toLocaleString()}</small>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDetails">
            <h2>{news.news.description}</h2>
            <img src={news.news.urlToImage} alt="" />
            <div className="accordDetailsDesc">
              <p>{news?.news?.content?.toString().split("[")[0].trim()}</p>
            </div>
            <div className="accordFullStory">
              <a
                className="link"
                href={news.news.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                Read Full Story Here
              </a>
            </div>
            <div className="accordSource">
              <p>
                News Courtsey:{" "}
                <span className="source">{news.news.source.name}</span>
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews()
      .then((res) => {
        setNews(res.articles);
        console.log(res.articles);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="news">
      <div className="news-cards">
        {news.map((_news) => (
          <SimpleAccordion news={_news} />
        ))}
      </div>
    </div>
  );
}

export default News;
