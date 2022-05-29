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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.all('/api/:date?', function dateHandler (req, res) {
  let date = null
  
  if ({}.hasOwnProperty.call(req.params, 'date')) {
    date = new Date(req.params.date)
  } else {
    date = new Date()
  }
  
  if (!date || isNaN(date)) {
    return res.status(400).jsonp({ error: 'Invalid Date' })
  }

  res.jsonp({
    unix: date.getTime(),
    utc: date.toUTCString(),
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
