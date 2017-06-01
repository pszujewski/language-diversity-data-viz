const organizeData = function(data) {
  let dataSet = { allLanguages:[] };
  data.forEach(function(d) {
    const percent = Number(d.percentPop);
    if (d.origin === "null") {
      dataSet[d.language] = {
        totalSpeakers: d.totalSpeakers,
        percentPop: percent,
        languages: {}
      };
    }
    else {
      const newLanguage = {
        language: d.language, 
        totalSpeakers: d.totalSpeakers,
        percentPop: percent,
      };
      if (!dataSet.hasOwnProperty(d.origin)) {
        dataSet[d.origin] = [];
      }
      dataSet[d.origin].push(newLanguage);
      if (d.language !== "english" && percent > 0.3) {
        dataSet.allLanguages.push(newLanguage);
      }
    }
  });
  return dataSet; // return the dataSet
}

export default organizeData;