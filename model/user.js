const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//引入node自带的加密模块
const crypto = require("crypto");
const { stringify } = require("querystring");

//定义Schema
let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: /^[\d_a-z\u4e00-\u9fa5]{2,18}$/i
    },
    password: {
        type: String,
        required: true,
        match: /^[\da-z_,!@#\$%\^&*()+\[\]{}\-=\.<>?]{6,18}$/i
    },
    sex: {
        type: String,
        enum: ['男', '女']
    },
    tel: {
        type: String,
        match: /^1[3-9]\d{9}$/
    },
    email: {
        type: String,
        match: /^\w{2,}@[\da-z]{2,}(\.[a-z]{2,6}){1,2}$/i
    },
    status: {
        type: String,
        default: '这个人很懒，什么都没留下！'
    },
    scret: {
        pq: {
            type: String,
            require: true,
            enum: ['0', '1', '2']
        },
        pa: {
            type: String,
            require: true,
            match: /./
        }
    }

});

//密码加密 中间件
userSchema.pre("save", function(next) {

    //console.log("我是保存之前的中间件函数");
    //console.log(this.password);
    //this.password = "我的天啦！";

    //使用node自带的加密模块，对传入的原始密码和密保答案进行加密
    let newPwd = crypto.createHash('sha256').update(this.password).digest("hex");
    let newPa = crypto.createHash('sha256').update(this.scret.pa).digest("hex");
    //console.log(newPwd);
    //替换将要保存的password字段
    this.password = newPwd;
    this.scret.pa = newPa

    next();
});



//建表，并返回
let user = mongoose.model("user", userSchema);
module.exports = user;
// module.exports = mongoose.model("user", userSchema);