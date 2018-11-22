console.log("In Javascript File");

document.addEventListener('DOMContentLoaded', setupButton);

function setupButton(){

  document.getElementById('addExerciseButton').addEventListener("click", function(){
    console.log("Event Listener Worked!");
  });
  
}
