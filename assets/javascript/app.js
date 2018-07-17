$(document).ready(function() {

    var question0 =
    {
      question: "ryu",
      answer0: "answer1",
      answer1: "answer2",
      answer2: "answer3",
      answer3: "answer4",
      image: 5,
    }
    
    var question1 =
    {
      name: "ken",
      answer0: "answer1",
      answer1: "answer2",
      answer2: "answer3",
      answer3: "answer4",
      image: 5,
    }
     

console.log("READY");

var time = 8;

intervalId = setInterval(count, 1000);

function count() {

   time--;
   var converted = timeConverter(time);
   $("#timer").text(converted);

 }

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }


});



