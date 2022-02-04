function routeDistance(route) {

var distance = 0;
  for (j = 0; j < route.legs.length; j++) {
    var distanceCheck = route.legs[j].distance.value;
    distance = distanceCheck+distance;
  }
  return distance/1609.34;
}