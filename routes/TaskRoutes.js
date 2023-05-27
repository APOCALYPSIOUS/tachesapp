var express = require('express');
var router = express.Router();
const Todo = require("../model/Task");
const {getTasks,addTask,deleteTask,updateTask} = require("../controllers/TaskController");

router.get('/',getTasks);

router.post('/',addTask);

router.delete('/:id',deleteTask);

router.put('/:id',updateTask);

module.exports = router;

