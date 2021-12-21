const db = require('../config/db')
const table = 'board';

class Board {

    createBoard =(boardsContent, callback)=>{
        var sql = `INSERT INTO ${table} SET ?`
        db.query(sql,boardsContent,callback)
    }
    //
    getBoard =(sortSearch, callback)=>{
      console.log(sortSearch)
        var sql = `SELECT * FROM ${table} ${sortSearch}  ORDER BY date DESC;`
        db.query(sql,callback)
    }
    
    getBoardById =(mystoreContent, callback)=>{
        var sql = `SELECT * FROM ${table} where member_id = "${mystoreContent.member_id}"`
        db.query(sql,callback)
    }
    getBoardByNo =(board_no, callback)=>{
        var sql = `select * from board join mystore on board.member_id = mystore.member_id where board_no = "${board_no}";`+
        `select category_name, scategory_name from sub_category join board on sub_category_scategory_no = scategory_no join main_category on main_category_category_no = category_no where board_no = ${board_no};`
        db.query(sql,callback)
    }
    pageAll = async (start, end) => {
        try {
         const sql = `SELECT * FROM boards ${start}, ${end}`;
         const results = await pool.queryParam(sql);
         if (results.length === 0) {
            return false;
          } else {
            return results;
          }
        } catch (err) {
          throw err;
        }
    }
}
module.exports = Board