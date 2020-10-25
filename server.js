const express = require('express')
const app = express()
const port = 3000

//THIS ALLOWS US TO ACCESS THE BODY OF REQUESTS WHEN USER SUBMITS TEXT
//app.use(express.json()) // for parsing application/json

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', function(req, res) {
    res.send(req);
    
    console.log(req.body);
    // console.log(typeof req.body);
    // res.send(req.body)
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})