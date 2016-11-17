var express = require("express");
//var bodyParser = require("body-parser");
var User = require("./models/user").User;
var app = express();
var cookieSession = require("cookie-session");
var routes_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var formidable = require('express-formidable');
var mv = require("mv");
var Post = require("./models/post");


var methodOverride = require("method-override");


app.use(express.static('public'));
app.use(express.static('assets'));



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));


app.use(cookieSession({
    name:"session",
    keys:["llave-1","llave-2"]
}));
app.use(formidable({keepExtensions: true}));

app.set("view engine", "pug");

app.get("/", function (req, res) {
    Post.find({},function (err, posts){
        if(err){res.redirect("/app"); return;}
        res.render("index",{post:posts})


    }).sort({date:'desc'})



});
app.get("/fashion", function (req, res) {
    Post.find({category:"1"},function (err, posts){
        if(err){res.redirect("/app"); return;}
        res.render("index",{post:posts})


    }).sort({date:'desc'})



});
app.get("/beauty", function (req, res) {
    Post.find({category:"2"},function (err, posts){
        if(err){res.redirect("/app"); return;}
        res.render("index",{post:posts})


    }).sort({date:'desc'})



});
app.get("/travel", function (req, res) {
    Post.find({category:"3"},function (err, posts){
        if(err){res.redirect("/app"); return;}
        res.render("index",{post:posts})


    }).sort({date:'desc'})



});
app.get("/food", function (req, res) {
    Post.find({category:"4"},function (err, posts){
        if(err){res.redirect("/app"); return;}
        res.render("index",{post:posts})


    }).sort({date:'desc'})



});

app.get("/signup", function (req, res) {
    User.find(function (err, doc) {
        console.log(doc);
        res.render("signup");
    });

});

app.get("/login", function (req, res) {
    res.render("login");
});
app.get("/posts/:id",function (req,res) {
    Post.find({_id:req.params.id},function (err, posts){
        if(err){res.redirect("/app"); return;}
        res.render("index",{post:posts})


    })

})
app.post("/users", function (req, res) {
    var user = new User({
        email: req.fields.email,
        password: req.fields.password,
        password_confirmation: req.fields.confirma_password,
        username: req.fields.username
    });
    console.log("Email: " + req.fields.email);
    console.log("Contraseña: " + req.fields.password);
    console.log("Confirmacion: " + req.fields.confirma_password);
    console.log("username: " + req.fields.username);

    //metodo con promise
    user.save().then(function (us) {
        res.send("Guardamos exitosamente")

    }), function (err) {
        console.log(String(err));

    }

    //Metodo con user.save
    /* user.save(function (err) {
     if (err) {
     console.log(String(err));
     } else {
     res.send("Guardamos tus datos");
     }


     });
     */


});

app.post("/sessions", function (req, res) {
    User.findOne({email: req.fields.email, password: req.fields.password}, function (err, user) {
        req.session.user_id = user._id;
        if (req.session.user_id) {
            res.redirect("/app")

        }
    });


});
app.use("/app",session_middleware);
app.use("/app",routes_app);


app.listen(8080);