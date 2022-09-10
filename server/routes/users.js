const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const {Student} = require("../models/Student");
const {Teacher} = require("../models/Teacher")
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth(undefined), (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role,
    });
});

router.post("/register", auth('admin'),  (req, res) => {

    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) {return res.json({ success: false, err, message: 'Email already exists!!' });}
        if(doc.role == 'student'){
            let student = new Student()
            student.user_id = doc
            student.grade = req.body.grade
            student.email = req.body.email
            student.save()
        }
        if(doc.role == 'teacher'){
            let teacher =new Teacher()
            teacher.user_id = doc
            teacher.subject = req.body.subject
            teacher.email = req.body.email
            teacher.save()
        }
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/modifyuser", auth('admin'),  (req, res) => {

    let user = req.body
    Object.keys(user).forEach((k) => user[k] == "" && delete user[k]);
    console.log(user)
    User.findOneAndUpdate({ email: user.oldemail }, user, (err, doc) => {
        if (err) return res.json({ success: false, err , message: 'error occured while updating user'});
        if(!doc){
            return res.json({success: false, message: 'Email do not exists'})
        }
        if(user.grade){
            Student.findOneAndUpdate({email: user.oldemail},{grade: user.grade})
        }
        if(user.subject){
            console.log('here')
            Teacher.findOneAndUpdate({email: user.oldemail},{subject: user.subject},)
        }
        return res.status(200).send({
            success: true,
            message: 'User Updated Successfully'
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                let obj = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                }
                
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, user: obj
                    });
            });
        });
    });
});

router.get("/logout", auth(undefined), (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
