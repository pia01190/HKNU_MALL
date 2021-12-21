const mysql = require('mysql');
const express = require('express')
const session = require('express-session');
const moment = require('moment')
const BoardsModel = require('../../models/Board')
const MySQLStore = require("express-mysql-session")(session);
var app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var sessionStore = new MySQLStore(options)
var options = {
    host: "localhost",
    user: "root",
    password: '0000',
    database: 'hkm_db4'
}
app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store: sessionStore// 세션이 데이터를 저장하는 곳
}));
var mnt = new Array()
var sort, search, sortSearch
exports.pagination = function (req, res) {
    console.log("?")
    if (req.query.search) {
        search = "where title like '%" + req.query.search + "%' or content like '%" + req.query.search + "%'"
    }
    if (req.query.subcategory) {
        scategory_no = req.query.subcategory
        sort = "where sub_category_scategory_no=" + scategory_no
    }
    if (sort) {
        sortSearch = sort
    }
    if (search) {
        sortSearch = search
    }
    new BoardsModel().getBoard(sortSearch, (error, results) => {
        var image_split = new Array()
        var board_image_split = new Array()

        for (var i = 0; i < results.length; i++) {
            mnt[i] = moment(results[i].date, 'YYYY-MM-DD HH:mm:ss').fromNow()
        }
        if (req.session.is_logined == true) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results.length) {
                    console.log(results.image)
                    for (var i = 0; i < results.length; i++) {
                        image_split = results[i].image.split("|");
                        board_image_split += image_split[1] + "|"
                    }

                    board_image_split = board_image_split.split("|")
                }
                search =
                    sort =
                    sortSearch =
                    res.render('main', {
                        data: results,
                        moment: mnt,
                        image: board_image_split,
                        is_logined: req.session.is_logined,
                        member_id: req.session.member_id,
                        nickname: req.session.nickname,
                    });
            }
        } else {
            for (var i = 0; i < results.length; i++) {
                image_split = results[i].image.split("|");
                board_image_split += image_split[1] + "|"
            }
            if (results.length != 0) {
                board_image_split = board_image_split.split("|")
            }
            console.log(results.image)
            res.render('main', {
                data: results,
                moment: mnt,
                image: board_image_split,
                is_logined: false
            });
        }
    })
}