var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var config = {
    "USER"    : "root",
    "PASS"    : "rafael872",
    "HOST"    : "ec2-52-3-250-83.compute-1.amazonaws.com",
    "PORT"    : "27017",
    "DATABASE" : "blog"
};
var dbPath  = "mongodb://"+config.USER + ":"+config.PASS + "@"+config.HOST + ":"+config.PORT + "/"+config.DATABASE;
mongoose.connect(dbPath);

var posibles_valores = ["M", "F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un correo"];
var password_validation = {
    validator: function (p) {
        return this.password_confirmation == p;
    },
    message: "la contraseña no es igual"
};


var user_schema = new Schema({
    name: String,
    username: {type: String, required: true, maxlength: [50, "username Muy grande"]},
    password: {type: String, minlength: [8, "Password muy corto"], validate: password_validation},
    age: {
        type: Number,
        min: [5, "La edad no puede ser menor que 5"],
        max: [100, "La edad no puede ser mayor que 100"]
    },
    email: {type: String, required: "Debe ingresar un correo", match: email_match},
    date_of_birth: Date,
    sex: {type: String, enum: {values: posibles_valores, message: "Opción no válida"}}
});

user_schema.virtual("password_confirmation").get(function () {
    return this.p_c;
}).set(function (password) {
    this.p_c = password;
});


/* user_schema.virtual("full_name").get(function(){
 return this.name + this.last_name;
 }).set(function(full_name){
 var words = full_name.split(" ");
 this.name= words[0];
 this.last_name = words[1];
 }) */

var User = mongoose.model("User", user_schema);

module.exports.User = User;