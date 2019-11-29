
const express = require('express');
const path = require("path");
const app = express();
const main_route = path.join(__dirname, "/");


app.use('/js',express.static(main_route + '/js'));
app.use('/css',express.static(main_route + '/css'));
app.use('/img',express.static(main_route + '/img'));

app.get('/', function (req, res) {
  res.sendFile(main_route +'/main.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})