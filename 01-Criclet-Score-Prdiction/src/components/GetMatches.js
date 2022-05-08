import React, { useEffect, useState } from "react";
import Crickbuzz from "./Crickbuzz";
import { getMatchInfo } from "./../api/api";

function GetMatches() {
  const [matches, setMatches] = useState([]);
  const limit = matches.slice(0, 5);
  useEffect(() => {
    getMatchInfo()
      .then((data) => {
        setMatches(data.matches);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(matches);
  return (
    <>
      <Crickbuzz key={limit.unique_id} limit={limit} />
    </>
  );
}

export default GetMatches;
