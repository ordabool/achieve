const express = require('express');
const path = require('path');

const port = 3000;

var router = require('./routes/index');

const app = express();
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);

app.listen(port, function(){
  console.log('app is running on port ' + port);
});
