function routedAccountsArray(originalAddressesArray, routedAddressesArray, accountsArray) {
  var routedAccountsArray1 = [];
  var k = 0;
  for (var i = 0; i < routedAddressesArray.length; i++) {
    var address = routedAddressesArray[i];
    var addressCheck = null;
    var counter = 0;
    while (address != addressCheck && counter < originalAddressesArray.length) {
      addressCheck = originalAddressesArray[counter];
      if (addressCheck == address) {
        var account = accountsArray[counter];
        routedAccountsArray1[k]= account;
        k=k+1;
        accountsArray.splice(counter,1);
        originalAddressesArray.splice(counter,1)
      }
      counter=counter+1;
    }
  }

  return routedAccountsArray1;
}