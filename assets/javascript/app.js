var firebaseConfig = {
  apiKey: "AIzaSyBZ0ZYQ8j1bLuOxWGmZ3JNw3dZq9BzVM0w",
  authDomain: "train-schedule-f570f.firebaseapp.com",
  databaseURL: "https://train-schedule-f570f.firebaseio.com",
  projectId: "train-schedule-f570f",
  storageBucket: "train-schedule-f570f.appspot.com",
  messagingSenderId: "347175044781",
  appId: "1:347175044781:web:b63bb08af180fc4b092824"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

$("#addTrainBtn").on('click', function(event){
  event.preventDefault();

  trainName = $("#train-input").val().trim();
  trainDestination = $("#dest-input").val().trim();
  firstTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTime);

  trainFrequency = parseInt($("#freq-input").val().trim());
  console.log(trainFrequency);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(diffTime);

  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log(tMinutesTillTrain);
  
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: firstTime,
    frequency: trainFrequency,
    minutesAway: tMinutesTillTrain
  };
  console.log(newTrain.minutesAway)
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  console.log(newTrain.minutesAway)

});

database.ref().on("child_added", function(childSnapshot) {

 
  // console.log(childSnapshot.val());

  trainName = childSnapshot.val().name;
  trainDestination = childSnapshot.val().destination;
  trainTime = childSnapshot.val().first;
  trainFrequency = childSnapshot.val().frequency;


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainTime),
    $("<td>").text()       
  );

  $("#trainScheduler > tbody").append(newRow)
});


