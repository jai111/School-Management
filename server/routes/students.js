const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {Student} = require("../models/Student");
const {Teacher} = require("../models/Teacher")
const mongoose = require('mongoose');


router.get("/findstudents/:grade", auth(['teacher', 'non-teacher']), (req, res) => {

    let grade = req.params.grade
    if(req.user.role == 'non-teacher'){
        query = {grade: grade}
    }
    else{
        query = {$and:[ {grade: grade}, {teachers: req.user._id} ]}
    }
    Student.find(query).populate('user_id').exec( (err, students) => {
        if(err) return res.status(400).send(err)
        if(!students.length){
            return res.status(200).json(
                {
                    success: false,
                    message: 'No studnets found for this grade'
                }
            )
        }
        return res.status(200).json(
            {
                success: true,
                students: students
            }
        )
    })
});

router.post('/updateteachers/:studentId', auth(['non-teacher']), (req, res) =>{
    let studentId = mongoose.Types.ObjectId(req.params.studentId);
    let data = req.body
    Student.findOneAndUpdate({_id: studentId}, {teachers: data}, (err, doc) =>{
        if (err) return res.json({ success: false, err, message: 'Some Error occured' });

        return res.status(200).send({
            success: true,
            message: 'Assgined successfully'
        });
    })
})

router.post('/updatemarks/:studentId', auth(['teacher']), (req, res) =>{
    let studentId = mongoose.Types.ObjectId(req.params.studentId);
    let data = req.body
    Teacher.find({user_id: req.user._id}, (err, teacher) =>{
        if (err) return res.json({ success: false, err, message: 'Some Error occured' }); 
        
        let semester = data.semster
        
        Student.find({_id: studentId}, (err, doc) => {
            let marks = doc[0]['marks']
            let semester = data.semester
            let semestermarks = marks[semester]
            let subject = teacher[0].subject
            semestermarks[subject] = data.marks
            marks[semester] = semestermarks

            Student.findOneAndUpdate({_id: studentId}, {marks: marks}, (err, doc) =>{
                if (err) return res.json({ success: false, err, message: 'Some Error occured' });
                return res.status(200).send({
                    success: true,
                    message: 'Assgined successfully'
                });
            })
        })

    })    
})

router.get('/getmarks', auth(['student']), (req, res)=>{

    Student.find({user_id: req.user._id}, (err, doc) =>{
        if (err) return res.json({ success: false, err, message: 'Some Error occured' });

        return res.status(200).send({
            success: true,
            message: 'marks retrieved',
            marks: doc[0].marks
        })
    })
})

module.exports = router;
