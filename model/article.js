const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//定义Schema
let articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }

});


//建表，并返回
let article = mongoose.model("article", articleSchema);
module.exports = article;