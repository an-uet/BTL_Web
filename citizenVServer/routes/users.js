
var express = require('express');
var UserRouter = express.Router();
const { check, validationResult } = require('express-validator');
var passport = require('passport')



/* GET home page. */
UserRouter.get('/', function (req, res, next) {
  res.render('index')
})

/* GET sign-in page. */
UserRouter.get('/signin', function (req, res, next) {
  // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
  var messages = req.flash('error')
  res.render('signin', {
    messages: messages,
    hasErrors: messages.length > 0,
  })
});


/* Post sign-up page. */
// Xử lý thông tin khi có người đăng nhập
UserRouter.post('/signin',
  passport.authenticate('local', 
    {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    })
);

module.exports = UserRouter;
