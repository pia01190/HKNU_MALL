const mysql = require('mysql'); 
const express = require('express')
const session = require('express-session');
const ReviewModel = require('../../models/Review')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );

exports.getReview = function (req, res) {
    new BoardsModel().getReviewByID( (error, results) => {
        if (req.session.is_logined == true) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                    res.render('main', { // 정보전달
                    data : results,
                    is_logined: req.session.is_logined,
                    member_id: req.session.member_id,
                    nickname: req.session.nickname,
                    //views
                });
            }
        } else {
                res.render('main',{
                data : results,
                is_logined : false
            });
        }
    })
}