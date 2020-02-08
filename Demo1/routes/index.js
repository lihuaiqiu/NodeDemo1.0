var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {'title':'express'});
});
router.post('/upload',function (req, res, next) {
  console.log(test);
  console.log(req.body);
  res.render('userprofile', {
    username: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });


});
router.post('/register', function(req, res, next) {

  var db=req.db;
  var username=req.body.username;
  var password=req.body.password;

  var usertable=db.get('user');
 // console.log(username);
  usertable.insert({"username":username,"password":password},function (err,doc) {
    if (err) {
      res.send("There is nothing wrong");

    }
    else{
      res.cookie('user',username);
      res.json('{"register":true}');

    }
  });

});

router.post('/login',function (req, res, next) {
  var db=req.db;
  var username=req.body.username;
  var password=req.body.password;
  console.log(password);
  console.log(username);
  var usertable=db.get('user');
 /* if(req.session.name!=''){

  }*/
  usertable.findOne({username:username,password:password},function (error,result){
    if(result!=null){
      req.session.user=username;
      res.cookie('user',username);
      res.json('{"login":true}');
    }
    else{
      res.json('{"login":false}');
    }

  }
  );



});

router.get('/logout',function (req, res ,next) {
  req.session.user='';
  res.redirect('/');
});
module.exports = router;