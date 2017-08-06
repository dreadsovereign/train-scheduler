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

$("#submit").on("click", function(event) {
  event.preventDefault();

  trainName = $("#trainname").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firsttrain").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  });

$("#trainname").val("");
$("#destination").val("");
$("#firsttrain").val("");
$("#frequency").val("");

});

database.ref().on("child_added", function(snapshot) {

var tFrequency = snapshot.val().frequency;

var convertedDate = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");

var trainTime = moment(convertedDate).format("HH:mm");

var currentTime = moment();

var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % tFrequency;

var timeTillTrain = tFrequency - tRemainder;

var nextTrain = moment().add(timeTillTrain, "minutes").format("hh:mm")

$(".table").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + nextTrain + "</td><td>" + timeTillTrain + "</td></tr>")

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
