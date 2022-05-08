import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import "./MatchCards.css";

function MatchCards({ data, total }) {
  const [match, setMatch] = useState([]);

  useEffect(() => {
    setMatch(data);
  }, [data]);

  //console.log(match);

  return (
    <div className="matchCards">
      <div className="matchCards__featured">
        <h4>FEATURED MATCHES</h4>
      </div>
      <div className="matchCards__matches">
        {match.map((doc) => (
          <MatchCard key={doc.unique_id} props={doc} />
        ))}
      </div>
    </div>
  );
}

export default MatchCards;
