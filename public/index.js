var app = function() {
  var url = 'https://www.strava.com/api/v3/athlete/activities?access_token=' + keys.apiKey;
  var request = new XMLHttpRequest();
  request.open("GET", url);

  request.addEventListener('load', function() {
    var activitiesData = JSON.parse(request.responseText);
    renderList(activitiesData);

  });

  request.send();

  var urlkoms = 'https://www.strava.com/api/v3/athletes/5620150/koms?access_token=' + keys.apiKey;
  var requestkoms = new XMLHttpRequest();
  requestkoms.open("GET", urlkoms);

  requestkoms.addEventListener('load', function() {
    var komsData = JSON.parse(requestkoms.responseText);
    renderKoms(komsData);
  });

  requestkoms.send();

};

var renderList = function(allActivities) {
  var mainDiv = document.getElementById('main');

  allActivities.forEach(function (activity) {
    var div = createListItem(activity);
    mainDiv.appendChild(div);
  });

};

var renderKoms = function(allKoms) {
  var komsDiv = document.getElementById('koms');
  allKoms.forEach(function (kom) {
    var div = createKomsItem(kom);
    komsDiv.appendChild(div);
  });
};


var createListItem = function(singleActivity) {
  var insideDiv = document.createElement('div');
  insideDiv.style.backgroundColor = backGroundRunType(singleActivity.workout_type);
  var pTag = document.createElement('p');
  pTag.innerHTML = singleActivity.name;
  pTag.setAttribute('id', 'act_name');
  var pTag2 = document.createElement('p');
  pTag2.innerText = convertToKm(singleActivity.distance).toFixed(2) + " km";
  pTag2.setAttribute('id', 'distance');
  var pTag3 = document.createElement('p');
  pTag3.innerText = convertToTime(singleActivity.moving_time).toFixed(0) + " minutes";
  pTag3.setAttribute('id', 'time');
  var pTag4 = document.createElement('p');
  pTag4.innerText = "elevation gain: " + singleActivity.total_elevation_gain + " m";
  pTag4.setAttribute('id', 'elevation');
  insideDiv.appendChild(pTag);
  insideDiv.appendChild(pTag2);
  insideDiv.appendChild(pTag3);
  insideDiv.appendChild(pTag4);
  return insideDiv
};

var createKomsItem = function(kom) {
  var insideKomDiv = document.createElement('div');
  var pTag5 = document.createElement('p');
  pTag5.innerText = kom.name;
  pTag5.setAttribute('id', 'act_name');
  var pTag6 = document.createElement('p');
  pTag6.innerText = convertToKm(kom.distance).toFixed(2) + " km";;
  var pTag7 = document.createElement('p');
  pTag7.innerText = kom.moving_time + " seconds";
  var pTag8 = document.createElement('p');

  insideKomDiv.appendChild(pTag5);
  insideKomDiv.appendChild(pTag6);
  insideKomDiv.appendChild(pTag7);

  return insideKomDiv
}


var backGroundRunType = function(workoutType) {
  console.log(workoutType);
  var colourMap = {
    0: "#4dd69d80",
    2: "#3192bc80",
    3: "#fc4c0280",
  }
  return colourMap[workoutType] || "#4dd69d80";
}





var convertToKm = function(distance) {
  var distance = distance/1000;
  return distance
}

var convertToTime = function(moving_time) {
  var moving_time = moving_time/60;
  return moving_time
}



window.addEventListener('load', app);






// create profile section

// inc. name, profile_medium,
//
//   var fourWeekAverage = function(activities) {
//     total_distance = 0
//     activities.forEach(function(element) {
//       total_distance += activity.distance;
//       return total_distance;
//   });
//   var statsDiv = document.getElementById('stats');
//   statsDiv.innerText = total_distance / 4;
//   }
