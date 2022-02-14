function createAddressesAndAccountsArray(dayArray, accountAddressBookArray) {
    var singleDayAccountsArray = [];
    var singleDayAddressArray = [];
    for (var i = 0; i < dayArray.length; i++) {
      var row = dayArray[i]
      var account = row[5];
      var address = accountAddressBookArray.filter(function (a) {
        return a[0] == account
      })[0][3]
      singleDayAccountsArray.push(account)
      singleDayAddressArray.push(address)
    }
    return [singleDayAddressArray, singleDayAccountsArray]
  }
