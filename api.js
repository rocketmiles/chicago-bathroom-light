var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.lifx.com/v1/lights/all",
  "method": "GET",
  "headers": {
    "authorization": "Bearer c78dd6109b2a0e4aac2aedeaeff660a77be7a8cb12cb20e709bea973f28cb2d0",
    "cache-control": "no-cache",
    "postman-token": "8561b10d-baa5-e725-ccee-658fa4f9d492"
  }
}

// START Debugging
/*
  Debug Mode uses a mock call instead of hitting the API. Since the mock call is in the global scope
  it is really helpful for remote development when you don't have physical access to the light. 

  To turn on Debug Mode just add debug=true to the query params.
*/
var exampleResp;

window.exampleResp = exampleResp = [{"id":"d073d510a0d1","uuid":"0242f7ae-87fa-42ba-b2ac-b938973e7cf3","label":"LIFX Bulb 10a0d1","connected":false,"power":"on","color":{"hue":0.0,"saturation":0.0,"kelvin":3500},"brightness":1.0,"group":{"id":"1c1fc2e56772a11a931245b9cd936512","name":"My Room"},"location":{"id":"c48d2a54f45471b8c234924667fc07f1","name":"Rocket bathroom"},"product":{"name":"White 800","identifier":"lifx_white_a19","company":"LIFX","capabilities":{"has_color":false,"has_variable_color_temp":true}},"last_seen":"2016-08-21T18:07:03.000+01:00","seconds_since_seen":11130.598412681}];

function isDebugModeOn() {
  var queryParams = window.location.search.substr(1),
  debugModeSet = queryParams.match(/debug=true/);

  if (debugModeSet && debugModeSet.length > 0) {
    return true;
  } else {
    return false;
  }
}

// END Debugging

// START Liam's Garbage

var secondsInBathroom = null;

var timeHistory = [];


function displayTimeHistory() {
  timeHistory.sort(function(a,b) {return b-a}); // Javascript  ¯\_(ツ)_/¯
  var lis = timeHistory.map(function(t) {
     return $("<li>" + t + " seconds in bathroom</li>");
  });
  $("#timeHistory").html(lis);
}

/// END Liam's Garbage
function update(response) {
  console.log("Light", response[0]);
  if (response[0].seconds_since_seen >= 1) {  // Bathroom is empty
    if (secondsInBathroom != null) {  // Bathroom has become vacant since last check
      var newRecord = (Date.now() - secondsInBathroom) / 1000;
      timeHistory.push(newRecord.toFixed(0));
    }

    displayTimeHistory();
    secondsInBathroom = null;
    $("#code").addClass('vacant')
  } else {  // Bathroom is occupied
    if (secondsInBathroom == null) {  // Bathroom has become occupied since last check
      secondsInBathroom = Date.now();
    }
    //secondsInBathroom = (secondsInBathroom == null) ? 0 : secondsInBathroom;
    $("#code").removeClass('vacant')
  }
}

function checkLight() {
  setTimeout(function() {
    if (isDebugModeOn()) {
      update(exampleResp);
    } else {
      $.ajax(settings).done(update);
    }    
    
    checkLight();
  }, 5000);
}
checkLight();
