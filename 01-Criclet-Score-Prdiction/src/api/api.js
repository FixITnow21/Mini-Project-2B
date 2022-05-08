const API_KEY = "c6191127-681b-4dba-bdd9-21b6df90e30e";

export const getMatchInfo = () => {
  const url =
    "https://api.cricapi.com/v1/matches?apikey=c6191127-681b-4dba-bdd9-21b6df90e30e&offset=0";

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getMatchScore = () => {
  const url =
    "https://api.cricapi.com/v1/currentMatches?apikey=c6191127-681b-4dba-bdd9-21b6df90e30e&offset=0";

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getNews = () => {
  const url =
    "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=75ae85ff80c24356b8c5732bdd5ccebd";

  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
