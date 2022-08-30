const user = require("../model/user")

module.exports = function(req, res) {

    //统一信息格式，返回给前端
    /*
    code：
        0 : 表示失败
        1 ： 表示成功
    msg :
        字符串
     */

    //不能直接存，要先验证 用户名 是否已经注册占用了
    user
        .findOne({ name: req.body.name })
        //检测是否已经对应的有数据
        .then(data => {
            //console.log("data"+data);
            //如果用户名已经存在，返回一些错误的信息给前端
            if (data) {
                res.send({ code: 0, msg: "用户名已经存在" });
            } else {
                //如果不存在用户名，先检测两次密码是否一致
                if (req.body.password !== req.body.password1) {
                    //两次密码不一致，返回前端信息
                    res.send({ code: 0, msg: "两次密码不一致" });
                } else {
                    //两次密码一致 添加到数据库
                    user.create({
                            name: req.body.name,
                            password: req.body.password,
                            scret: {
                                pq: req.body.pq,
                                pa: req.body.pa
                            }
                        })
                        .then((data) => {
                            req.session.ifLogin = true;
                            req.session._id = data._id;
                            res.send({ code: 1, msg: "注册成功" });
                        })
                        .catch(() => {
                            res.send({ code: 0, msg: "服务器异常，请重试~" });
                        });
                }
            }
        })
        //捕捉错误
        .catch(e => {
            res.send({ code: 0, msg: "服务器异常，请重试~" });
            console.log(e);
        });
};