const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {Student} = require("../models/Student");
const mongoose = require('mongoose');


router.get("/findstudents/:grade", auth(['teacher', 'non-teacher']), (req, res) => {

    let grade = req.params.grade
    Student.find( {grade: grade}).populate('user_id').exec( (err, students) => {
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

module.exports = router;
