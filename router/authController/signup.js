const mysql = require('mysql'); 
const express = require('express')
const UserModel = require('../../models/User')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
exports.register = function (req, res) {
    // console.log("req", req.body);
    console.log('회원가입 하는중')
    var today = new Date();
    var memberInfo = {
        "id": req.body.id,
        "student_id": req.body.student_id,
        "nickname": req.body.nickname,
        "passwd": req.body.passwd,
        "reg_date": today,
        "email": req.body.email
    }
    new UserModel().createUser(memberInfo,(error,results)=>{
        if (error) {
            console.log("error ocurred", error);

           res.redirect("signup")
        } else {
            console.log('The solution is: ', results);
            res.redirect("/")
        }
    });    
    
}