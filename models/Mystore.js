const db = require('../config/db')
const table = 'mystore';

class Mystore {

    changeMystore =(mystoreContent, callback)=>{
        var sql = `UPDATE ${table} SET ? where member_id = "${mystoreContent.member_id}"`
        db.query(sql,mystoreContent,callback)
    }
    getMystoreById =(member_id, callback)=>{
        var sql = `SELECT * FROM ${table} where member_id = "${member_id}";`+
        `SELECT * FROM board where member_id ="${member_id}" ORDER BY date DESC;`
        db.query(sql,callback)
    }

}
module.exports = Mystore