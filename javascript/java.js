var config = {
    apiKey: "AIzaSyC_MgSN4f0yjMzmjOGxe03DMAmDluG-_hA",
    authDomain: "train-scheduler-dbe8a.firebaseapp.com",
    databaseURL: "https://train-scheduler-dbe8a.firebaseio.com",
    projectId: "train-scheduler-dbe8a",
    storageBucket: "",
    messagingSenderId: "553138803015"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = "";
var firstTrain = "";
var nextArrival = "";
var minutesAway = "";

$(".btn.btn-danger").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  });

});

database.ref().on("child_added", function(snapshot) {
  var ss = snapshot.val();

  console.log(ss.trainName);
  console.log(ss.destination);
  console.log(ss.firstTrain);
  console.log(ss.frequency);

});
