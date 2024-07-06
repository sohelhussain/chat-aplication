const express = require('express');
const app = express();
const indexRouter = require('./routes/indexRouter');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

require('dotenv').config();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(expressSession({
    resave: true,
    saveUninitialized: false,
    secret: process.env.SESSION_KEY 
}))

app.use('/', indexRouter);

app.listen(3000)