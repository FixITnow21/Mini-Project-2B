import React from "react";
import Navigation from "./navigation";
import News from "./News";

function NewsPage() {
  return (
    <div>
      <Navigation />
      <div style={{ marginTop: "100px" }}>
        <News />
      </div>
    </div>
  );
}

export default NewsPage;
