
var express = require('express');


const db = require('./db');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', 3000);

const usersRouter = require('./routes/UserRoutes');
const todoRouter = require('./routes/TaskRoutes');

app.use('/todos', todoRouter);

app.use('/users', usersRouter);



module.exports = app;
