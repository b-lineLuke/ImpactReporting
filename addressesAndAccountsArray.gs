function addressesAndAccountsArray(rddArray, accountAddressBookArray, startRow, endRow) {

  var addressesArray = [];
  var accountsArray = [];
  var m = 0;

  for (var j = startRow; j <= endRow; j++) {
    var account = rddArray[j][5];
    var accountCheck = null;
    var k = 0;

    while (account != accountCheck && k < accountAddressBookArray.length) {
      accountCheck = accountAddressBookArray[k][0];
      k = k + 1;
    }
    if (k == accountAddressBookArray.length+1) {
      var address = "ADDRESS NOT FOUND"
      addressesArray[m] = address;
      accountsArray[m] = account;
      m = m + 1;
    }
    else {
      var address = accountAddressBookArray[k - 1][3];
      addressesArray[m] = address;
      accountsArray[m] = account;
      m = m + 1;
    }
  }
  return [addressesArray, accountsArray]
}