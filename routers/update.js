const user = require('../model/user')
module.exports = (req, res) => {
    let reqData = req.body
    if (req.session.ifLogin) {
        let newData = {
            tel: reqData.tel,
            email: reqData.email,
            status: reqData.status
        };
        reqData.sex && (newData.sex = reqData.sex);
        //直接更新数据 
        user.updateOne({ id: req.session._id }, newData).then((data) => {
                res.send({ code: 0, msg: '修改成功' })
            })
            .catch(() => {
                res.send({ code: 2, msg: "服务器异常，请稍后重试~" })
            })
    }

};