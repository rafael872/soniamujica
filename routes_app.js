var express = require("express");
var Post = require("./models/post");
var router = express.Router();
var post_finder_middleware = require("./middlewares/find_post");

var mv = require("mv");

router.get("/", function (req, res) {

    res.redirect("/app/posts")

});
router.get("/posts/new", function (req, res) {
    res.render("app/posts/new")
});

router.all("/posts/:id*", post_finder_middleware);

router.get("/posts/:id/edit", function (req, res) {
    res.render("app/posts/edit");
});


router.route("/posts/:id")
    .get(function (req, res) {
        res.render("app/posts/show");
    })
    .put(function (req, res) {
        res.locals.post.title = req.fields.title;
        res.locals.post.description = req.fields.description;
        res.locals.post.category = req.fields.category;
        res.locals.post.save(function (err) {
            if (!err) {
                res.render("app/posts/show");
            } else {
                res.render("app/posts/" + req.params.id + "/edit");
            }
        })
    })
    .delete(function (req, res) {

        Post.findOneAndRemove({_id: req.params.id}, function (err) {
            if (!err) {
                res.redirect("/app/posts");
            } else {
                console.log(err);
                res.redirect("/app/posts" + req.params.id)
            }
        })
    });

router.route("/posts")
    .get(function (req, res) {
        Post.find({}, function (err, posts) {
            if (err) {
                res.redirect("/app");
                return;
            }
            res.render("app/posts/posts", {post: posts})
        }).sort({date: "desc"})
    })
    .post(function (req, res) {
        if (req.fields.title && req.fields.description && req.fields.category) {
            console.log(req.files.archivo);
            var extension = req.files.archivo.name.split(".").pop();
            var data = {
                title: req.fields.title,
                description: req.fields.description,
                category: req.fields.category,
                foto1: extension
            };
            console.log(req.fields.description)
            var post = new Post(data);
            post.save(function (err) {
                var postId = post._id
                if (!err) {
                    mv(req.files.archivo.path, "public/images/" + post.id + "_1." +extension,function(err){
                        if(err){
                            throw err;
                        }


                        console.log("Fichero copiado correctamente...");

                    });
                    res.redirect("/app/posts/" + post._id)
                } else {
                    res.redirect("/app/posts/");
                    res.render(err);
                }
            })
        } else {

            res.redirect("/app/posts/new");
        }

    });


module.exports = router;
