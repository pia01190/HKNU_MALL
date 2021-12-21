const mysql = require('mysql'); 
const express = require('express')
const session = require('express-session');
const ReviewModel = require('../../models/Review')
var app = express()
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );

exports.review = function (req, res) {
    var today = new Date();

    var reviewContent = {
      "review_no": req.body.review_no,
      "member_mystore_id": req.body.member_mystore_id,
      "board_board_no": req.body.board_board_no,
      "image": req.body.image,
      "review_message": req.body.review_message,
      "rating": req.body.rating,
      "member_id": req.body.member_id
    //var views
    //var chats 
    }

    new ReviewModel().createReview( reviewContent,( error, results) =>{
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            /*res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
            */
            res.redirect("main")
        }
    });    
    
}