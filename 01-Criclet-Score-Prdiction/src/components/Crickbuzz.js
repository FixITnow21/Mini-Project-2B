import React, { useEffect, useState } from "react";
import "./Crickbuzz.css";
import getMatchScore from "./getMatchScore";
import Card from "react-bootstrap/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "./navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  heading: {
    fontSize: "1.1rem",
    fontWeight: "500",
  },
}));

function SimpleAccordion(score) {
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
            <h4 className={classes.heading}>{score.score.name}</h4>
          </div>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
function Crickbuzz({ limit, key, data }) {
  const [score, setScore] = useState([]);
  useEffect(() => {
    getMatchScore()
      .then((res) => {
        setScore(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="crickbuzz">
      <Navigation />
      <div className="crickbuzz-cards">
        {score.map((_score) => (
          <SimpleAccordion score={_score} />
        ))}
      </div>
    </div>
  );
}

export default Crickbuzz;
