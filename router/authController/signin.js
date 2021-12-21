const mysql = require('mysql'); 
const express = require('express')
const session = require('express-session');
const UserModel = require('../../models/User')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );

exports.login = function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd;
    new UserModel().getUserById( id,( error, results) =>{
        if (error) {
             console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            if(results.length > 0) {
                if(results[0].passwd == passwd) {

                    req.session.is_logined = true;
                    req.session.nickname =  results[0].nickname;
                    req.session.member_id = id;
                    req.session.save(function(){ // 세션 스토어에 적용하는 작업
                        res.render('main',{ // 정보전달
                            id : req.session.id,
                            is_logined : true
                        });
                    });
                    res.redirect("/")
                } else {
                    res.redirect("signin")
                }
            } else {
                res.redirect("signin")
            }
        }    
    }) 
}