const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    user_id :  { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    grade : {
        type:Number
    },
    email :{
        type: String
    },
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    midterm1: [
        {
            math : Number,
            science: Number,
            social: Number,
            hindi: Number,
            english: Number,
        }
    ],
    semester1: [
        {
            math : Number,
            science: Number,
            social: Number,
            hindi: Number,
            english: Number,
        }
    ],
    midterm2: [
        {
            math : Number,
            science: Number,
            social: Number,
            hindi: Number,
            english: Number,
        }
    ],
    semester2: [
        {
            math : Number,
            science: Number,
            social: Number,
            hindi: Number,
            english: Number,
        }
    ]
})      

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student }
