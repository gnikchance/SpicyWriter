const express = require('express')
const app = express()
const port = 3000

//THIS ALLOWS US TO ACCESS THE BODY OF REQUESTS WHEN USER SUBMITS TEXT
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//READ AND STORE WORDS.JSON AS A VARIABLE
const wordsData = require(__dirname + '/words.json');
var boringWords = [];
console.log(wordsData.words.length);
for (i = 0; i < wordsData.words.length; i++) { boringWords.push(wordsData.words[i].boringWords) }
console.log(boringWords);



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', function (req, res) {
  //gets users Input
  var userInput = req.body.userInput;

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

        userInputArray[i] = '<div class="dropdownWrapper"><span class="changed-word">' + wordsData.words[index].spicyWords[0] + '</span>' + 
        '<div class="hiddenMenu"> <a onclick="changeWord(this)" href="#"><i style="color: black" class="fas fa-undo"></i> <strong>' + wordsData.words[index].boringWords + 
        '</strong></a><a onclick="changeWord(this)" href="#"><i style="color: #ff1a00;margin-right: 5px;" class="fas fa-pepper-hot"></i>' 
        + wordsData.words[index].spicyWords[0] + '</a><a onclick="changeWord(this)" href="#"><i style="color: #ff1a00;margin-right: 5px;" class="fas fa-pepper-hot"></i>' 
        + wordsData.words[index].spicyWords[1] + '</a><a onclick="changeWord(this)" href="#"><i style="color: #ff1a00;margin-right: 5px;" class="fas fa-pepper-hot"></i>' 
        + wordsData.words[index].spicyWords[2] + '</a>' 
        //+'<a class="premium"><i style="color: blue" class="fas fa-crown"></i> Upgrade to Premium to unlock all synonyms</a>'
        +'</div></div>';


      }

    }

    //rearrange array back into string
    userInputArray = userInputArray.join(" ");
    userInput = userInputArray;

    //display new string back to client is done via ajax SUCCESS in HTML file
    res.send(userInput);

  }

});

app.post('/analyze', function (req, res) {

  res.send('TONE ANALYZER COMING SOON');

})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})