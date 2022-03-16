'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));   // to support URL-encoded bodies
app.use('/public', express.static(__dirname + '/public'));
app.use(cors());

// give service worker broader scope
app.get('/public/service-worker.js', (req, res) => {
  res.sendFile('./public/service-worker.js', {headers: {'Service-Worker-Allow': '/'}});
});



// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
  // read file data and save as "links" array
  var data = fs.readFileSync('links.json');
  var links = JSON.parse(data);

  // send array to index page
  res.render('pages/index', {
    links: links
  });
});

// about page
app.get('/admin', function(req, res) {
  // read file data and save as "links" array
  var data = fs.readFileSync('links.json');
  var links = JSON.parse(data);
  
  // send array to admin page
  res.render('pages/admin', {
    links: links
  });
});

// process POST request
app.post('/admin', function (req, res) {
  // read file data and save as "links" array
  var data = fs.readFileSync('links.json');
  var links = JSON.parse(data);

  // update links
  // link one
  links[0].name = req.body.name[0];
  links[0].url = req.body.url[0];
  // link two
  links[1].name = req.body.name[1];
  links[1].url = req.body.url[1];
  //link three
  links[2].name = req.body.name[2];
  links[2].url = req.body.url[2];
  // link four
  links[3].name = req.body.name[3];
  links[3].url = req.body.url[3];

  // write contents back to the file
  fs.writeFile('links.json', JSON.stringify(links, null, 2), (err) => {
      if (err) throw err;
      console.log('Links updated');
  }); 

  res.redirect("/admin")
});

// log server running on correct port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})