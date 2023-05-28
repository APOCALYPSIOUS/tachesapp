const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    limitDate:{
        type:Date,
        required:true
    }
},{ timestamps: true });


module.exports = mongoose.model('todo',TaskSchema);