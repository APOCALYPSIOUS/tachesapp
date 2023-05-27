var express = require('express');
var router = express.Router();
const Todo = require("../model/Task");
const {getTasks,addTask,deleteTask,updateTask, uncompletedTasks, completedTasks, completeTask} = require("../controllers/TaskController");
const {auth} = require("../middleware/authMiddleware");


router.get('/',auth,getTasks);

router.post('/',auth,addTask);

router.delete('/:id',auth,deleteTask);

router.put('/:id',auth,updateTask);

router.get('/uncompleted',auth,uncompletedTasks);

router.get('/completed',auth,completedTasks);

router.put('/complete/:id',auth,completeTask);

module.exports = router;

