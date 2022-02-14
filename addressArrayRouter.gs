function addressArrayRouter(clientAddress,addressesArray) {
      var directions = Maps.newDirectionFinder().setOrigin(clientAddress).setDestination(clientAddress).setOptimizeWaypoints(true).setMode(Maps.DirectionFinder.Mode.DRIVING);

    for (var j = 0; j < addressesArray.length; j++) {
      directions.addWaypoint(addressesArray[j]);
     
    }

    var directionsFile = directions.getDirections();


    var route = directionsFile.routes[0];
    return route;
}

