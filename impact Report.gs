function impactReport() {
  var client = "BARNACLE LLC";
  var clientAddress = "1140 SE 7th Ave, Portland, OR 97214";
  var startDate = new Date("1/4/2021");
  var endDate = new Date("1/6/2021");


  // This calles the spreadsheet containing account addresses using the URL
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1vgnSQHrOf46p9-yzRs1xc5YR20WTd6u0Rjm63J1rpqU/edit#gid=852513261");

  // Sheet containing account address book transformed to an array  
  var accountAddressBookArray = ss.getSheetByName("Delivery Accounts").getDataRange().getValues();

  // 2020 array filtered by client (see rddFilterByClient.gs)
  var rddClientFiltered = rddFilteredByClient(ss, client, startDate, endDate);

  // Function creates new sheet and names the sheet "client name" + "Impact Report"
  ss.insertSheet().setName(client + " Impact Report");

  var listOfDays = getListOfDays(rddClientFiltered);

  var n = 1;

  for (var i = 0; i < listOfDays.length; i++) {
    var day = listOfDays[i];
    var dayArray = rddClientFiltered.filter(function (a) {
      var dayCheck = a[0].setHours(0, 0, 0, 0)
      return day == dayCheck
    })
    var addressesAndAccountsArray = createAddressesAndAccountsArray(dayArray, accountAddressBookArray);
    var singleDayAddressesArray = addressesAndAccountsArray[0];
    var singleDayAccountsArray = addressesAndAccountsArray[1];

    // route is a built-in object in Google Scripts
    var route = addressArrayRouter(clientAddress, singleDayAddressesArray);
    // Retuns unknown if route encounters error
    if (route == undefined) {
      var routedSingleDayAccountsArray = singleDayAccountsArray;
      var routedSingleDayAddressesArray = singleDayAddressesArray;
      var numberOfRouteLegs = singleDayAccountsArray.length;
      var routeDistance1 = "Unknown";
    }
    else {
      var routeDistance1 = routeDistance(route);

      // This code block reorders accounts and address array to correspont with routed order
      var routedSingleDayAddressesArray = routedAddressesArray(route, singleDayAddressesArray);
      var routedSingleDayAccountsArray = routedAccountsArray(singleDayAddressesArray, routedSingleDayAddressesArray, singleDayAccountsArray);
      var numberOfRouteLegs = Number(route.legs.length);
      var routeDistance1 = routeDistance1;
    }

    var singleDayAccountsString = arrayToCsvString(routedSingleDayAccountsArray);
    var singleDayAddressesString = arrayToCsvString(routedSingleDayAddressesArray)


    var newSheetName = client + " Impact Report";

    ss.getSheetByName(newSheetName).getRange(n, 1).setValue(new Date(day));
    ss.getSheetByName(newSheetName).getRange(n, 2).setValue(numberOfRouteLegs);
    ss.getSheetByName(newSheetName).getRange(n, 3).setValue(numberOfRouteLegs - 1);
    ss.getSheetByName(newSheetName).getRange(n, 4).setValue(routeDistance1);
    ss.getSheetByName(newSheetName).getRange(n, 5).setValue(singleDayAccountsString);
    ss.getSheetByName(newSheetName).getRange(n, 6).setValue(singleDayAddressesString);
    n = n + 1;
    Logger.log(day)
  }


  

  
}
