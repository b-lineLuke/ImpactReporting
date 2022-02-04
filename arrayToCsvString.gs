function arrayToCsvString(mainArray) {
  var rowArray = [];
  for (var i = 0; i < mainArray.length; i++) {
    var row = mainArray[i];
    var rowType = typeof row;
    if (rowType != "string") {
      var rowString = row.join()
    }
    else {
      var rowString = row;
    }
    rowArray[i] = rowString;
  }
  var finalString = rowArray.join('\n');
  return finalString
}
