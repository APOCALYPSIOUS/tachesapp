var express = require('express');
var router = express.Router();
const Todo = require("../model/Task");
const {getTasks,addTask,deleteTask,updateTask, uncompletedTasks, completedTasks, completeTask,getSortedByDateAscTask,getSortedByDateDescTask,
    getSortedByTitleAscTask,
    getSortedByTitleDescTask
} = require("../controllers/TaskController");
const {auth} = require("../middleware/authMiddleware");


router.get('/',auth,getTasks);

router.post('/',auth,addTask);

router.get('/titlesortasc',auth,getSortedByTitleAscTask);

router.get('/titlesortdesc',auth,getSortedByTitleDescTask);

router.get('/datesortasc',auth,getSortedByDateAscTask);

router.get('/datesortdesc',auth,getSortedByDateDescTask);

router.delete('/:id',auth,deleteTask);

router.put('/:id',auth,updateTask);

router.get('/uncompleted',auth,uncompletedTasks);

router.get('/completed',auth,completedTasks);

router.put('/complete/:id',auth,completeTask);

module.exports = router;

