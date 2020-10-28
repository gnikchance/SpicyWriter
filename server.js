const express = require('express')
const app = express()
const port = 3000

//THIS ALLOWS US TO ACCESS THE BODY OF REQUESTS WHEN USER SUBMITS TEXT
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', function (req, res) {
  //gets users Input
  var userInput = req.body.userInput;

  const boringWords = ["last", "first", "get", "bad", "terrible", "wrong", "thought", "good", "make", "mean", "smart", "alot", "happen", "happens", "person", "fed", "ended", "expect", "cut", "hurt", "got", "say", "said", "agree", "think", "have", "move", "explain", "made", "people", "see", "find", "looked", "many", "different", "change", "getting", "ask", "question", "often", "give", "tell", "told", "size", "small", "goal", "partly", "do", "put", "estimated", "buy", "bought", "stay", "live", "keep", "choose", "finally", "area", "almost", "next", "new", "seem", "seems", "best", "great", "long", "old", "important", "sad", "sadness", "nice", "funny", "little", "big", "pretty"
  ];
  const spicyWords = ["final", "initial", "obtain", "egregious", "dreadful", "incorrect", "reasoned", "favorable", "generate", "harsh", "sophisticated", "plethora", "occur", "occurs", "individual", "nourished", "expired", "anticipate", "pierce", "wound", "acquired", "express", "expressed", "concur", "suspect", "possess", "progress", "justify", "produced", "individuals", "realize", "discover", "searched", "numerous", "alternative", "transform", "obtaining", "enquire", "enquiry", "frequently", "grant", "inform", "informed", "magnitude", "marginal", "objective", "partially", "perform", "place", "projected", "purchase", "purchased", "remain", "reside", "retain", "select", "ultimately", "zone", "virtually", "upcoming", "modern", "resemble", "resembles", "finest", "outstanding", "endless", "ancient", "crucial", "depressed", "sorrow", "gracious", "humorous", "minute", "colossal", "stunning"];

  //Validate here to make sure it's under 1000 characters
  if (userInput.length > 1000) {
    res.send("Your input is not valid. Please make sure your total character limit is under 1000");

  }

  else {

    //split string into array of words - **NEED TO SPLIT BY NEW LINES SOON** 
    var userInputArray = userInput.split(" ");
    console.log(userInputArray);

    //for each word in userWords list, check to see if it exists in boringWords Array
    for (i = 0; i < userInputArray.length; i++) {

      //if exists, replace with word in spicyWords list, and adds class to new spicy word

      if (boringWords.includes(userInputArray[i])) {
        var index = boringWords.indexOf(userInputArray[i]);

        userInputArray[i] = '<span class="changed-word">' + spicyWords[index] + '</span>';


      }

    }

    //rearrange array back into string
    userInputArray = userInputArray.join(" ");
    userInput = userInputArray;




    //display new string back to client is done via ajax SUCCESS in HTML file
    res.send(userInput);

  }

});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})