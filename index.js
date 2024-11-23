// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/**app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});**/

app.get("/api", function(req, res){
  const dateOBJ = new Date();
  const unixTime = dateOBJ.getTime();
  
  return res.json({"unix":unixTime,"utc":`${dateOBJ.toGMTString()}`})
})

app.get("/api/:date", function(req, res) {
  const dateParam = req.params.date;
  let dateOBJ = new Date();
  if (isValidNumeric(dateParam)) {
    const DateNumber = Number(dateParam);
    dateOBJ = new Date(DateNumber)
    if (dateOBJ.toTimeString() === 'Invalid Date') {
      return res.json({"error":"Invalid Date"});
    }

    return res.json({"unix":dateOBJ.getTime(),"utc":`${dateOBJ.toGMTString()}`});
  } 
  dateOBJ = new Date(dateParam)
  if (dateOBJ.toTimeString() === 'Invalid Date') {
    return res.json({"error":"Invalid Date"});
  }
  return res.json({"unix":dateOBJ.getTime(),"utc":`${dateOBJ.toGMTString()}`});
})


function isValidNumeric(date){
  const dateRegex = /^\d+$/;
  return dateRegex.test(date);
}


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
