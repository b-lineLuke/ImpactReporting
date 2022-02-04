function routedAddressesArray(route, singleDayAddressArray) {
  var newAddressArray = [];
  for (var i = 0; i < route.waypoint_order.length; i++) {
    var waypointNumber = route.waypoint_order[i];
    var address = singleDayAddressArray[waypointNumber];
    newAddressArray[i] = address;
  // Logger.log(waypointNumber)
  }

  return newAddressArray;
}