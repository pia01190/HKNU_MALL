const mysql = require('mysql');
const express = require('express')
const moment = require('moment')
const MystoreModel = require('../../models/Mystore');
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var mnt = new Array()
var count = 0
exports.getMystore = function (req, res) {
    member_id = req.params.member_id,
        new MystoreModel().getMystoreById(member_id, (error, results) => {
            var image_split = new Array()
            var board_image_split = new Array()
            count++
            if (count == 1) {
                for (var i = 0; i < results[1].length; i++) {
                    mnt[i] = moment(results[1][i].date, 'YYYY-MM-DD HH:mm:ss').fromNow()
                }
            }
            if (error) {

                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results[1].length) {
                    for (var i = 0; i < results[1].length; i++) {
                        image_split = results[1][i].image.split("|");
                        board_image_split += image_split[1] + "|"
                    }
                    board_image_split = board_image_split.split("|")
                }
                console.log(board_image_split)
                res.render('mystore', { // 정보전달
                    mystore_data: results[0],
                    boards_data: results[1],
                    moment: mnt,
                    image: board_image_split,
                    is_logined: req.session.member_id,
                    session_member_id: req.session.member_id,
                    nickname: req.session.nickname,
                    //views
                });
            }
        }
        )
}


