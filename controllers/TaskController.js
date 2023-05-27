const Todo = require("../model/Task");
const getTasks = async (req,res)=> {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}
const addTask = async (req,res)=> {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        userId: req.body.userId,
    })
    try {
        const newTodo = await todo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const updateTask = async (req,res)=>{
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const deleteTask = async (req,res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            userId: req.body.userId,
        })
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}
