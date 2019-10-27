const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const { check, validationResult } = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');



const config = require('./config/database');
const services = require('./Service');
const appliances = require('./Appliance');







//init app
const app = express();

//start server\
const PORT = 5000;

const server = app.listen(PORT, ()=> {
  console.log(`server started on port ${PORT}`);
});


var io = require('socket.io')(server);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//set staic folder
app.use(express.static(path.join(__dirname, 'public')));

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


mongoose.connect(config.database,
 {useNewUrlParser: true, useUnifiedTopology:true,useFindAndModify: false});
let db = mongoose.connection;

//check connection
db.once('open', ()=> {
  console.log('connection success DB');
});
//check for db console.error();
db.on('error', (err)=> {
  console.log(err);
});

app.use(favicon('favicon.png'));




//express session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
  //cookie: { secure: true }
}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//socket ----------------------

io.on('connection', function(socket){
  socket.on('refresh', (associate, order)=>{
    io.emit('response', associate,order);
  });
  socket.on('disconnect', function(){
  });
});



//Home route
app.get('/', (req, res)=> {
  res.render('index', {
    services : services,
    appliances : appliances
  });
});

//bring in Router for Users
let user = require('./routes/users');
app.use('/users', user);

//bring in Router for Associate side
let associate = require('./routes/associate');
app.use('/associate', associate);


//bring in Router for Associate side
let order = require('./routes/order');
app.use('/order', order);
