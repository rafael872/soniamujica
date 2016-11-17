var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var post_schema = new Schema({
    title:{type:String,required:true,},
    description:{type:String,required:true},
    category:{type:Number, required:true},
    date:{type:Date, default: Date.now},
    foto1:{type:String},
    foto2:{type:String},
    foto3:{type:String},
    foto4:{type:String},
    foto5:{type:String},
    foto5:{type:String},
    foto7:{type:String}

});


var Post=mongoose.model("Post",post_schema);

module.exports = Post;