function impactReport() {
  //These lines create a prompt for the cell containing the start address.
  /* var ui1 = SpreadsheetApp.getUi();
   var result = ui1.prompt("Enter the client name you wish to create an impact report for");
   var client = result.getResponseText();
 
   var ui2 = SpreadsheetApp.getUi();
   var result = ui2.prompt("Enter the address the client would be delivering from");
   var clientAddress = result.getResponseText();
 
   var ui3 = SpreadsheetApp.getUi();
   var result = ui3.prompt("Enter the start date for the impact report");
   var startDate = new Date(result.getResponseText());
 
   var ui4 = SpreadsheetApp.getUi();
   var result = ui4.prompt("Enter the end date for the impact report");
   var endDate = new Date(result.getResponseText());*/

// Lines 20-23 are for manual entry
var client = "Eb & Bean LLC";
  var clientAddress = "1140 SE 7th Ave, Portland, OR 97214";
  var startDate = new Date("1/1/2021");
  var endDate = new Date("1/1/2022"); 


// This calles the spreadsheet containing account addresses using the URL
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1KFfqh7qjw7NSzuel0lFsPMzsl1RZoo7I3eBRttrYTZo/edit#gid=1259466755");
  
// Sheet containing account address book transformed to an array  
  var accountAddressBookArray = ss.getSheetByName("Delivery Accounts").getDataRange().getValues();

// 2020 array filetered by client
  var rddClientFiltered = rddFilteredByClient(ss, client, startDate, endDate)

// indexedRangesOfDays() is a method that returns an array in the form [[date 1, startRow, endRow],[date2, startRow, endRow],...]; REMEMBER: index starts at 0
  var indexedRangesOfDays1 = indexedRangesOfDays(rddClientFiltered)

// Function creates new sheet and names the sheet "client name" + "Impact Report"
  ss.insertSheet().setName(client + " Impact Report");
  // n is a counter, number of days of delivery in the year
  var n = 1;
  for (var i = 0; i < indexedRangesOfDays1.length; i++) {
    var date = indexedRangesOfDays1[i][0];
    var startRow = indexedRangesOfDays1[i][1];
    var endRow = indexedRangesOfDays1[i][2];

    // addressAndAccountsArray1 returns array containing two arrays for addresses and accounts: [[address 1, address 2, address 3,...,address N],[accountName 1, accountName 2, accountName 3,...,accountName N]]
    var addressesAndAccountsArray1 = addressesAndAccountsArray(rddClientFiltered, accountAddressBookArray, startRow, endRow);
    var singleDayAddressesArray = addressesAndAccountsArray1[0];
    var singleDayAccountsArray = addressesAndAccountsArray1[1];

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
      var routedSingleDayAddressesArray = routedAddressesArray(route,singleDayAddressesArray);
      var routedSingleDayAccountsArray = routedAccountsArray(singleDayAddressesArray, routedSingleDayAddressesArray, singleDayAccountsArray);
      var numberOfRouteLegs = Number(route.legs.length);
      var routeDistance1 = routeDistance1;
    }

    var singleDayAccountsString = arrayToCsvString(routedSingleDayAccountsArray);
    var singleDayAddressesString = arrayToCsvString(routedSingleDayAddressesArray)


    var newSheetName = client + " Impact Report";

    ss.getSheetByName(newSheetName).getRange(n, 1).setValue(date);
    ss.getSheetByName(newSheetName).getRange(n, 2).setValue(numberOfRouteLegs);
    ss.getSheetByName(newSheetName).getRange(n, 3).setValue(numberOfRouteLegs - 1);
    ss.getSheetByName(newSheetName).getRange(n, 4).setValue(routeDistance1);
    ss.getSheetByName(newSheetName).getRange(n, 5).setValue(singleDayAccountsString);
    ss.getSheetByName(newSheetName).getRange(n, 6).setValue(singleDayAddressesString);
    n = n + 1;
    Logger.log(date)
  }
}
