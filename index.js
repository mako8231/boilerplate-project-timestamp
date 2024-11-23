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
  return res.json({'response': "hi"})
})

app.get("/api/:date", function(req, res) {
  let dateOBJ; let dayWeek; let UnixTime;
  let dateParam = req.params.date;
  if (isValidDate(dateParam)){
    dateValues = dateParam.split("-");
    dateOBJ = new Date(dateParam);
    dayWeek = getDayOfWeek(dateOBJ);
    monthVal = getMonth(dateOBJ);
    UnixTime = dateOBJ.getTime();
    
    if (dayWeek == null || monthVal == null){
      console.log("invalid weekday")
      res.json({"error": "Invalid Date"})
    } else if (UnixTime < 0){
      console.log("Invalid unix time", UnixTime)
      res.json({"error":"Invalid Date"});
    } else {
      res.json({"unix":UnixTime,"utc":`${dateOBJ.toGMTString()}`});
    }
    //let time = Math.floor(new Date(`${dateValues[0]}.${dateValues[1]}.${dateValues[2]}`).getTime());
  } else if (isValidNumeric(dateParam)) {
    dateOBJ = new Date();
    dateOBJ.setTime(dateParam);
    dayWeek = getDayOfWeek(dateOBJ);
    monthVal = getMonth(dateOBJ);

    res.json({"unix":dateOBJ.getTime(),"utc":`${dateOBJ.toGMTString()}`});
  } else {
    res.json({"error":"Invalid Date"})
  }
  
})

function isValidDate(date){
  const dateRegex =  /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
}

function isValidNumeric(date){
  const dateRegex = /^\d+$/;
  return dateRegex.test(date);
}

function getDayOfWeek(dateObj){
  const numDate = dateObj.getDay();
  let dayStr = null;
  switch (numDate) {
    case 0:
      dayStr = 'Mon';
      break;
    case 1:
      dayStr = 'Tue';
      break;
    case 2:
      dayStr = 'Wed';
      break;
    case 3:
      dayStr = 'Thu';
      break;
    case 4:
      dayStr = 'Fri';
      break;
    case 5:
      dayStr = 'Sat';
      break;
    case 6:
      dayStr = 'Sun';
      break;
    default:
      break;      
  }

  return dayStr;
}

function getMonth(dateObj){
  const monthVal = dateObj.getUTCMonth();
  let monthStr = null;
  switch (monthVal)
  {
    case 0:
      monthStr = 'Jan';
      break;
    case 1:
      monthStr = 'Feb';
      break;
    case 2:
      monthStr = 'Mar';
      break;
    case 3:
      monthStr = 'Apr';
      break;
    case 4:
      monthStr = 'May';
      break;
    case 5:
      monthStr = 'Jun';
      break;
    case 6:
      monthStr = 'Jul';
      break;
    case 7:
      monthStr = 'Aug';
      break;
    case 8:
      monthStr = 'Sep';
      break;
    case 9:
      monthStr = 'Oct';
      break;
    case 10:
      monthStr = 'Nov';
      break;
    case 11:
      monthStr = 'Dec';
      break;
  }

  return monthStr
}


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
