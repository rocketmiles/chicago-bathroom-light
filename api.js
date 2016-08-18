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

// START Liam's Garbage

var secondsInBathroom = null;

var timeHistory = [];


function startStopWatch() {
  setTimeout(function() {
    console.log(secondsInBathroom);
    if (secondsInBathroom != null) {
      $("#vacantIcon").hide();
      $("#occupiedIcon").show();
      secondsInBathroom++;
      $("#counter").text(secondsInBathroom + " seconds in bathroom");
    } else {
      $("#occupiedIcon").hide();
      $("#vacantIcon").show();
    }
    startStopWatch();
  }, 1000)
}

startStopWatch();

function displayTimeHistory() {
  timeHistory.sort(function(a,b) {return b-a}); // Javascript  ¯\_(ツ)_/¯
  var lis = timeHistory.map(function(t) {
     return $("<li>" + t + " seconds in bathroom</li>");
  });
  $("#timeHistory").html(lis);
}

/// END Liam's Garbage

function checkLight() {
  setTimeout(function() {
    $.ajax(settings).done(function (response) {
      console.log("Light", response[0]);
      if (response[0].seconds_since_seen >= 1) {
        if (secondsInBathroom != null) {
          timeHistory.push(secondsInBathroom);
        }

        displayTimeHistory();
        secondsInBathroom = null;
        $("body").removeClass('vacant').addClass('occupied');
        $("#vacantIcon").css("display","none");
        $("#occupiedIcon").css("display","block");
      } else {
        secondsInBathroom = (secondsInBathroom == null) ? 0 : secondsInBathroom;
        $("body").removeClass('occupied').addClass('vacant');
        $("#occupiedIcon").css("display","none");
        $("#vacantIcon").css("display","block");
      }
    });
    checkLight();
  }, 5000);
}
checkLight();
