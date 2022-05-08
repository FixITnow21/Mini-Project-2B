export default async function getMatchScore(offset) {
  return await fetch(
    "https://api.cricapi.com/v1/currentMatches?apikey=c6191127-681b-4dba-bdd9-21b6df90e30e&offset=0" +
      offset
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.status != "success") {
        alert("Failed");
        return;
      }
      let datarray = data.data;
      if (!datarray) return [];
      else if (offset >= data.info.totalRows) return datarray;
      else
        return getMatchScore(offset + 25).then(function (data) {
          return datarray.concat(data);
        });
    })
    .catch((e) => console.log);
}
getMatchScore(0)
  .then(function (data) {
    console.log("Complete score got!", data);
  })
  .catch((e) => console.log);
