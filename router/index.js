const express = require('express')
var router = express.Router()
var app = express()
var session = require('express-session')
const path = require('path');
const multer = require('multer');
const MySQLStore = require("express-mysql-session")(session); 
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }) );
app.use(express.json() );
const http = require('http').Server(app);
const io = require('socket.io')(http);
var signup= require('./authController/signup')
var signin= require('./authController/signin')
var signout= require('./authController/signout')
var boards= require('./boardsController/boards')
var pagination= require('./boardsController/pagination')
var changing_mystore= require('./mystoreController/changeMystore')
var getMystore= require('./mystoreController/getMystore')
var getFavorite= require('./favoriteController/getFavorite')
var product= require('./boardsController/product')
var review= require('./reviewController/writeReview')
var favorite= require('./favoriteController/favorite')
var deleteFavorite= require('./favoriteController/deleteFavorite')
var chatting = require('./authController/chat')
const upload = multer({
    storage: multer.diskStorage({
      // set a localstorage destination
      destination: (req, file, cb) => {
        cb(null, 'public/images');
      },
      // convert a file name
      filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      },
    }),
    //limits: { fileSize: 1024 * 1024 }

  });

var sessionStore = new MySQLStore(options)
var options ={
    host:"localhost",
    user:"root",
    password:'0000',
    database:'hkm_db4'
}

app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
    store : sessionStore // 세션이 데이터를 저장하는 곳
}));
global.is_logined = null
global.member_id = null
global.nickname = null

router.use("*",(req,res,next)=>{
    is_logined = req.session.member_id
    member_id = req.session.member_id
    nickname = req.session.nickname,
    next()
})

router.post('/signup', signup.register)
router.post('/signin', signin.login)
router.post('/review',review.review)
router.post('/product',upload.array('image'),boards.boards)
router.post('/boards/:board_no',favorite.favorite)
router.put('/mystore/:member_id',changing_mystore.changing_mystore)
router.post('/favorite/:member_id',favorite.favorite)
router.get('/',pagination.pagination)
router.get('/boards',pagination.pagination)
router.get('/mystore/:member_id',getMystore.getMystore)
router.get('/boards/:board_no',product.product)
router.get('/favorite/:member_id',getFavorite.getFavorite)
router.delete('/favorite/:member_id/:board_no', deleteFavorite.deleteFavorite)

router.get('/product',(req,res)=>{
    res.render('boards')
})
router.get('/signout',(req,res)=>{
    console.log('로그아웃 성공');
    is_logined=false,
    req.session.destroy(function(err){
        res.redirect('/');
    });

});
router.get('/mystore/:member_id/form',(req,res)=>{
    res.render('changing_mystore')
})
router.get('/review',(req,res)=>{
    res.render('review')
})
router.get('/article',(req,res)=>{
    res.render('article')
})

router.get('/chatting',(req,res)=>{
    res.render('chatting',{
        chatting_name: req.session.member_id
    })
})
router.get('/review',(req,res)=>{
    res.render('review')
})
router.get('/sellpage',(req,res)=>{
    res.render('sellpage')
})
router.get('/setting',(req,res)=>{
    res.render('setting')
})
router.get('/signin',(req,res)=>{
    res.render('signin')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})


module.exports = router