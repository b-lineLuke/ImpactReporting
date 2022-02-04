  function rddFilteredByClient(ss, client, startDate, endDate) {

    var rddArray = ss.getSheetByName("RDD2021").getDataRange().getValues();
    if (rddArray[0][1] == "Rider Name") {
      rddArray.shift();
    }
    rddArray = rddArray.filter(function (a) {
      return a[3] == client;
    })
    rddArray = rddArray.filter(function (a) {
      var date1 = new Date(a[0]);
      return date1 > startDate && date1 < endDate;
    })
    return rddArray;
  }