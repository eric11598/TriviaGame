$(document).ready(function() {

    var question0 =
    {
      question: "Which player has scored the most goals in a world cup?",
      answerArray: ["Cristiano Ronaldo", "Pele", "Miroslav Klose", "Lionel Messi"],
      correctAnswer: 2,
      image: "Klose",
    }
    
    var question1 =
    {
      question: "Who is the only player to have won the World Cup 3 times?",
      answerArray: ["Neymar", "Ronaldo", "Diego Maradona", "Pele"],
      correctAnswer: 3 ,
      image: "Pele brazil",
    }
    var question2 =
    {
      question: "Which country has won the most World Cups?",
      answerArray: ["Brazil", "Spain", "Argentina", "Germany"],
      correctAnswer: 0 ,
      image: "Brazil soccer",
    }
    var question3 =
    {
      question: "Which country hosted the first World Cup?",
      answerArray: ["Brazil", "Uruguay", "Germany", "USA"],
      correctAnswer: 1,
      image: "uruguay soccer",
    }

    /*
    var question1 =
    {
      name: "Who is the only player to have won the World Cup 3 times?",
      answerArray: ["Neymar", "Ronaldo", "Diego Maradona", "Pele"],
      correctAnswer: 3 ,
      image: 5,
    }
    var question1 =
    {
      name: "Who is the only player to have won the World Cup 3 times?",
      answerArray: ["Neymar", "Ronaldo", "Diego Maradona", "Pele"],
      correctAnswer: 3 ,
      image: 5,
    }*/

    var apikey = "AaROGpXAVa6N2SXY303PGYqP8HOkMNmo";

    function encodeQueryData(data)
    {
       var ret = [];
       for (var d in data)
          ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
       return ret.join("&");
    }
  
    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
  

    function getGif(query) {
      console.log(query);
      query = query.replace(' ', '+');
      var params = { 'api_key': apikey, 'q': query};
      params = encodeQueryData(params);
  
      
  
      httpGetAsync('http://api.giphy.com/v1/gifs/search?' + params, function(data) {
        var gifs = JSON.parse(data);
        

        var random = Math.floor(Math.random() * 24) + 1  
        var targetgif = gifs.data[random].images.fixed_width.url;
        $('#timerText').append($("<br>"));
        $('#timerText').append($('<img>',{id:'gif',src: targetgif}));

      });

      
  }


questionArray = [question0, question1, question2, question3]
answerArray = ["#answerZero","#answerOne","#answerTwo","#answerThree"]


var time = 8;
var questionPhase = true;
var activeQuestion = questionArray[0];
var answerCorrect = 0;
var answerWrong = 0;
var unanswered = 0;
var questionCount = -1

$("#timerContainer").hide();
$("#questionContainer" ).hide();
$("#playGame").on("click", playGame);






function playGame()
{

  

  questionCount+=1;
  if(!checkGame())
  {
  $("#timer").text("08")
  time = 8;
  activeQuestion = questionArray[questionCount];



  $("#startContainer").hide();
  $("#timerContainer").show();
  $("#questionContainer").show();

  reWrite();
  intervalId = setInterval(count, 1000);
  
  
}

}


function count() {
   time--;
   var converted = timeConverter(time);
   $("#timer").text(converted);

   if (questionPhase && time===0)
   {
      console.log("unanswered++");
      $("#questionContainer").hide();
      $("#timerText").text("You ran out of time! The correct answer was: "+activeQuestion.answerArray[activeQuestion.correctAnswer]);
      getGif(activeQuestion.image);
      questionPhase = false;
      unanswered++;
      time = 5;
 
   }

  
   else if(!questionPhase && time ===0)
   {
    $("#timerText").text("Time Remaining:");
    $("#timer").text("05");
     time = 5;
     questionPhase = true;
     clearInterval(intervalId);
     playGame();
   }
   

 }

 


function reWrite()
{



  $("#question").text(activeQuestion.question);

  for(var i = 0; i < answerArray.length; i++)
  {
    $(answerArray[i]).text(activeQuestion.answerArray[i]);
    $(answerArray[i]).bind('click', {param: i}, checkAnswer);
    
  }

    
}

function checkAnswer(event)
{

  
 if (event.data.param === activeQuestion.correctAnswer)
    {
      $("#questionContainer").hide();
      $("#timerText").text("You got it right!");
      getGif(activeQuestion.image);
      answerCorrect+=1;
      questionPhase = false;
      $("#timer").text("05");
      time = 5;
    }

  else
    {
      $("#questionContainer").hide();
      $("#timerText").text("Wrong Answer! The correct answer was: "+activeQuestion.answerArray[activeQuestion.correctAnswer]);
      getGif(activeQuestion.image);
      answerWrong+=1;
      questionPhase = false;
      $("#timer").text("05");
      time = 5;
    }

    checkAnswer=function(){}
}


function checkGame()
{
  console.log(answerCorrect+answerWrong+unanswered+"=="+questionArray.length);

  if(answerCorrect+answerWrong+unanswered === questionArray.length)
    {
      time = 0;
      clearInterval(intervalId);
      $("#questionContainer").hide();
      $("#startContainer").show();
      
      

      $("#startText").text("GAME OVER! Results!")
      $("#startText").append("<br>");
      $("#startText").append("RIGHT: "+answerCorrect+ " WRONG: "+answerWrong+" UNANSWERED: "+unanswered);
      
      answerCorrect = 0;
      answerWrong = 0;
      unanswered = 0; bv  
      questionCount = -1

      return true;
    
    }

    return false;
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

    return seconds;
  }


});



