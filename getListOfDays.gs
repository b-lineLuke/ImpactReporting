function getListOfDays(rddArray) {
    var listOfDays = [];
    for (var i = 0; i < rddArray.length; i++) {
      var row = rddArray[i];
      var date = row[0];
      var date = date.setHours(0, 0, 0, 0)
      var checkInListOfDays = listOfDays.filter(function (a) {
        return a == date
      })
      if (checkInListOfDays.length == 0) {
        listOfDays.push(date)
      }
    }
    Logger.log(listOfDays)
    return listOfDays
  }