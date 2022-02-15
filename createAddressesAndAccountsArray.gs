function createAddressesAndAccountsArray(dayArray, accountAddressBookArray) {
  var singleDayAccountsArray = [];
  var singleDayAddressArray = [];
  for (var i = 0; i < dayArray.length; i++) {
    var row = dayArray[i]
    var account = row[5];
    var rowWithAccountAddress = accountAddressBookArray.filter(function (a) {
      return a[0] == account
    })
    if (rowWithAccountAddress.length == 0) {
      var address = "The address for " + account + " was not found."
    }
    else {
      var address = rowWithAccountAddress[0][3]
    }
    singleDayAccountsArray.push(account)
    singleDayAddressArray.push(address)

  }
  return [singleDayAddressArray, singleDayAccountsArray]
}
