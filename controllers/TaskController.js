const Todo = require("../model/Task");
const User = require("../model/User");
const getTasks = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user.id});
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}
const getSortedByTitleAscTask = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user.id}).sort({title: 1});
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }

}
const getSortedByTitleDescTask = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user.id}).sort({title: -1});
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}
const getSortedByDateAscTask = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user.id}).sort({limitDate: 1});
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const getSortedByDateDescTask = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user.id}).sort({limitDate: -1});
        res.json(todos);
    } catch (err) {
        res.status(500).json({message: "err.message"});
    }
}


const getPaginatedTasks = async (req,res)=> {
    try {
        const todos = await Todo.find({userId: req.user.id}).limit(10);
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
        limitDate: req.body.limitDate,
        userId: req.user.id,
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
        const todo = await Todo.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if(!user){
            res.status(404).json({message: "user not found"});
            throw new Error("user not found");
        }
        if(todo.userId.toString() !== req.user.id.toString()){
            res.status(401).json({message: "unauthorized"});
            throw new Error("unauthorized");
        }
        const updatedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const updateTask = async (req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if(!user){
            res.status(404).json({message: "user not found"});
            throw new Error("user not found");
        }
        if(todo.userId.toString() !== req.user.id.toString()){
            res.status(401).json({message: "unauthorized"});
            throw new Error("unauthorized");
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            limitDate: req.body.limitDate
        })

        res.json(updatedTodo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const completedTasks = async (req,res)=>{
    try{

        const todo = await Todo.find({userId: req.user.id, completed: true});
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }

}

const uncompletedTasks = async (req,res)=>{
    try{
        const todo = await Todo.find({userId: req.user.id, completed: false});
        res.json(todo);
    }catch (err) {
        res.status(500).json({message: "err.message"});
    }
}

const completeTask = async (req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if(!user){
            res.status(404).json({message: "user not found"});
            throw new Error("user not found");
        }
        if(todo.userId.toString() !== req.user.id.toString()){
            res.status(401).json({message: "unauthorized"});
            throw new Error("unauthorized");
        }
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,{
            completed: true,
        })
        res.json(updatedTodo);
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
    completeTask,
    getSortedByTitleAscTask,
    getSortedByDateAscTask,
    getSortedByDateDescTask,
    getSortedByTitleDescTask,
}