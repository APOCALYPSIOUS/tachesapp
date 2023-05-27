const Todo = require("../model/Task");
const getTasks = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user._id});
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
        userId: req.user._id,
    })
    try {
        const newTodo = await todo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const deleteTask = async (req,res)=>{
    try{
        const todo = await Todo.findOneAndDelete({userId:req.user._id,id:req.params.id});
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const updateTask = async (req,res)=>{
    try{
        const todo = await Todo.findOneAndUpdate({userId:req.user._id,id:req.params.id},{
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
        })
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const completedTasks = async (req,res)=>{
    try{
        const todo = await Todo.find({userId: req.user._id, completed: true});
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }

}

const uncompletedTasks = async (req,res)=>{
    try{
        const todo = await Todo.find({userId: req.user._id, completed: false});
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const completeTask = async (req,res)=>{
    try{
        const todo = await Todo.findOneAndUpdate({userId:req.user._id,id:req.params.id},{
            completed: true,
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
    deleteTask,
    completedTasks,
    uncompletedTasks,
    completeTask
}
