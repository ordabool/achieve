const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash-messages');

const port = 3000;

var router = require('./routes/routes');
var users = require('./routes/users');

const app = express();
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

app.use('/', router);
app.use('/users', users);

app.listen(port, function(){
  console.log('app is running on port ' + port);
});
