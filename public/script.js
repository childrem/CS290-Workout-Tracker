console.log("In Javascript File");

/*
document.addEventListener('DOMContentLoaded', setupButton);

function setupButton(){

  document.getElementById('addExerciseButton').addEventListener("click", function(){
    console.log("Event Listener Worked!");
  });
  
}
*/

/********************* GET REQUEST WORKS ON SUBMIT BUTTON ***************************

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

*/

document.getElementById('addExerciseButton').addEventListener("click", function(event){
  console.log("POST Event Listener Simple Method Worked!");
  var req = new XMLHttpRequest();
  // Get all of the user input information
  
  var dataToSend = {};
    dataToSend.name = document.getElementById('name').value;
    dataToSend.reps = document.getElementById('reps').value;
    dataToSend.weight = document.getElementById('weight').value;
    dataToSend.date = document.getElementById('date').value;
    dataToSend.lbs = document.getElementById('lbs').value;
    dataToSend.addExerciseButton = document.getElementById('addExerciseButton').value;
  
  /*
  var name = document.getElementById('name').value;
  var reps = document.getElementById('reps').value;
  var weight = document.getElementById('weight').value;
  var date = document.getElementById('date').value;
  var lbs = document.getElementById('lbs').value;
  */
  
  req.open("POST", "http://flip2.engr.oregonstate.edu:5840/", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener("load", function(){
    if (req.status >= 200 && req.status < 400) {
      console.log("POST Request Worked");
      console.log(req.responseText);
    }
    
    else {
      console.log("POST Request Failed");
    }
  });
  
  req.send(JSON.stringify(dataToSend));
  
  event.preventDefault();
});
