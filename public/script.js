console.log("In Javascript File");

/*
document.addEventListener('DOMContentLoaded', setupButton);

function setupButton(){

  document.getElementById('addExerciseButton').addEventListener("click", function(){
    console.log("Event Listener Worked!");
  });
  
}
*/

document.getElementById('addExerciseButton').addEventListener("click", function(event){
  console.log("Event Listener Simple Method Worked!");
  var req = new XMLHttpRequest();
  req.open("GET", "http://flip2.engr.oregonstate.edu:5840/", true);
  req.addEventListener("load", function(){
    if (req.status >= 200 && req.status < 400) {
      console.log("GET Request Worked");
    }
    
    else {
      console.log("Get Request Failed");
    }
  });
  
  req.send(null);
  
  event.preventDefault();
});
