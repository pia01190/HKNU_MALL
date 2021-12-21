const mysql = require('mysql'); 
const express = require('express')
var app = express()
const MystoreModel = require('../../models/Mystore')
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
exports.changing_mystore = function (req, res) {
    console.log( req.file);
    if(!req.body.store_image)
    store_image = "/"
    else store_image = req.body.store_image
    var mystoreContent = {
        "member_id": req.body.member_id,
        "store_name": req.body.store_name,
        "store_description": req.body.store_description,
        "store_image":store_image,
        //"image" : "/images/"+req.files[0].filename
    }
    new MystoreModel().changeMystore( mystoreContent,( error, results) =>{
        if (error) {

            res.render('mystore',{
                is_logined: req.session.member_id,
                member_id : req.session.member_id
            })
        } else {
            res.redirect("/mystore/"+member_id)
        }
    });    
}