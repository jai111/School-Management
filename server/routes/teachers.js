
const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const {Teacher} = require("../models/Teacher");
const {User} = require("../models/User")


router.get("/findteachers", auth(['non-teacher']), (req, res) => {
  
   Teacher.aggregate([{
        $group: {
          _id: "$subject",
          users: {
            $push: "$user_id"
          }
        }
      }],
      (err, teachers) =>{
        if(err) return res.status(400).send(err)
        User.populate(teachers, {path: 'users'},(err, doc)=>{
            data = {}
            doc.map((teacher, ind)=>{
                data[teacher._id] = teacher.users
            })
            return res.json({
                sucess:true,
                teachers: data
            })
        })
      }
      )
});

module.exports = router;
