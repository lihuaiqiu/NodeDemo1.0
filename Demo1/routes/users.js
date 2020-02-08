var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(req.session.user)
  if(req.session.user){
      var db=req.db;
      var collection=db.get('comment');
      collection.find({},function (e,docs) {
         res.render('users',{
             "commentlist":docs
         });

      });
  }
  //res.render('users');
});
router.post('/addcomments',function (req, res ,next) {
    var db = req.db;
    var comment=req.body.comment;
    var usertable = db.get('comment');
    console.log(comment);
    usertable.insert({"username":req.session.user,"comment":comment},function (err,doc){
        if(err){
            res.send("There is nothing wrong");
        }
        else{
            res.json('{"add":true}');
        }
    });


});
router.get('/userprofile',function (req, res, next) {
   res.render('userprofile',{username:req.session.user});

});

module.exports = router;
