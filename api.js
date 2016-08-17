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

function checkLight() {
  setTimeout(function() {
    $.ajax(settings).done(function (response) {
      console.log(response);
      if (response[0].connected == true) {
        $("body").css("background-color", "green");
      } else {
        $("body").css("background-color", "red");
      }
    });
    checkLight();
  }, 5000);
}
checkLight();
