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
    marks: {
        midterm1:
        {
            maths : {type: Number, default: 0},
            science: {type: Number, default: 0},
            social: {type: Number, default: 0},
            hindi: {type: Number, default: 0},
            english: {type: Number, default: 0},
        },
    semester1: 
        {
            maths : {type: Number, default: 0},
            science: {type: Number, default: 0},
            social: {type: Number, default: 0},
            hindi: {type: Number, default: 0},
            english: {type: Number, default: 0},
        }
    ,
    midterm2: 
        {
            maths : {type: Number, default: 0},
            science: {type: Number, default: 0},
            social: {type: Number, default: 0},
            hindi: {type: Number, default: 0},
            english: {type: Number, default: 0},
        }
    ,
    semester2: 
        {
            maths : {type: Number, default: 0},
            science: {type: Number, default: 0},
            social: {type: Number, default: 0},
            hindi: {type: Number, default: 0},
            english: {type: Number, default: 0},
        }
    }
})      

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student }
