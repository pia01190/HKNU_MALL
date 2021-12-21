const mysql = require('mysql');
const express = require('express')
const session = require('express-session');
const FavoriteModel = require('../../models/Favorite')
const MySQLStore = require("express-mysql-session")(session); 
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
exports.getFavorite = function (req, res) {
    member_id = req.session.member_id
    new FavoriteModel().getFavoriteById( member_id,(error, results) => {
        var image_split = new Array()
        var board_image_split = new Array()

        if (req.session.is_logined == true) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                console.log(results)
                if (results.length) {
                    for (var i = 0; i < results.length; i++) {
                        image_split = results[i].image.split("|");
                        board_image_split += image_split[1] + "|"
                    }
                    board_image_split = board_image_split.split("|")
                }
                    res.render('favorite', { // 정보전달
                    data : results,
                    image: board_image_split,
                    is_logined: req.session.is_logined,
                    member_id: req.session.member_id,
                    nickname: req.session.nickname,
                });
            }
        } else {
                res.render('favorite',{
                data : results,
                is_logined : false
            });
        }
    })
}