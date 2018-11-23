console.log("In Javascript File");


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
  
  
  
  req.open("POST", "http://flip2.engr.oregonstate.edu:5840/", true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener("load", function(){
    if (req.status >= 200 && req.status < 400) {
      console.log("POST Request Worked");
      var newData = req.responseText;
      
      // Construct a new table on the HTML page using returned data from database
      
      var newTable = document.createElement("table");
      newTable.style.border = "solid";
      newTable.style.borderWidth = "1px";
      
      var headRow = document.createElement("tr");
      for(let i = 1; i <= 5; i++){
        var newCell = document.createElement("th");
        newCell.id = "headerCell" + i;
        newCell.style.border = "solid";
        newCell.style.borderWidth = "1px";
        newCell.style.textAlign = "center";
        headRow.appendChild(newCell);
      }
      
      document.getElementById("headerCell1").textContent = "Exercise Name";
      
      newTable.appendChild(headRow);
      document.getElementById("tableToBeConstructed").appendChild(newTable);
    }
    
    else {
      console.log("POST Request Failed");
    }
  });
  
  req.send(JSON.stringify(dataToSend));
  
  event.preventDefault();
});
