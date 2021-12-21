const db = require('../config/db')
const table = 'review';

class Review {

    createReview =(reviewContent, callback)=>{
        var sql = `INSERT INTO ${table} SET ?`
        db.query(sql,reviewContent,callback)
    }
    getReviewById =(member_id, callback)=>{
        var sql = `SELECT * FROM ${table} where member_id = "${member_id}" `
        db.query(sql,callback)
    }
}
module.exports = Review