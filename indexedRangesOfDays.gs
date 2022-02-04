function indexedRangesOfDays(rddArray) {
  var indexedRangesOfDays = [];
  j = 0;
  var dateIndex = new Date(rddArray[0][0]);
  var startRow = 0;
  for (var i = 0; i < rddArray.length; i++) {
    var dateCheck = new Date(rddArray[i][0])
    var month = dateCheck.getMonth();
    var date = dateCheck.getDate();
    if (date == dateIndex.getDate() && month == dateIndex.getMonth()) {
      if (i == rddArray.length - 1) {
        endRow = i;
        indexedRangesOfDays[j] = [dateIndex, startRow, endRow];
      }
      continue
    }

    else {
      endRow = i - 1;
      indexedRangesOfDays[j] = [dateIndex, startRow, endRow];
      j = j + 1;
      dateIndex = new Date(rddArray[i][0]);
      startRow = i;
    }
  }
  return indexedRangesOfDays
}