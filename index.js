var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var auth = require('./routes/auth');

var port = 3000;

var app = express();

app.set('port', (process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || port));
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
app.use('/api', tasks);
app.use('/auth', auth);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});