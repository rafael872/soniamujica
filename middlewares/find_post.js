var Post = require("../models/post");
module.exports = function(req,res,next){
    Post.findById(req.params.id,function (err,post){
      if(post != null){
          res.locals.post = post;
          next();
      }else{
          res.redirect("/app");
      }
    })
}