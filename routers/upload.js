const express = require('express');
const fs = require('fs');
const multer = require('multer')
const path = require('path')
let router = express.Router();
const user = require('../model/user')

//使用磁盘存储文件，指定存储位置和文件名
let storage = multer.diskStorage({
    //存储目录
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../static/images/avatar'))
    },

    //文件名
    filename: function(req, file, cb) {
        let filename = req.session._id + file.originalname.match(/(\.(jpe?g|png|gif|webp))$/)[0]
        cb(null, filename)
    }

})

//规定上传的参数
let upload = multer({
    storage: storage, //规定存储方式
    limits: { //文件限制
        fileSize: 1024 * 500 //限制大小不超过500k
    },
    fileFilter(req, file, cb) {
        cb(null, /\.(jpe?g|png|gif|webp)$/.test(file.originalname));
    }
}).single("file")

//头像的上传
router.post("/photo", (req, res) => {
    if (req.session.ifLogin) {
        upload(req, res, function(err) {
            if (err) {
                if (err instanceof multer.MulterError) {
                    res.send({
                        code: 8,
                        msg: err
                    })
                } else {
                    res.send({
                        code: 8,
                        msg: '上传失败'
                    })
                }

            } else {
                // deletePhoto(req.session._id, req.file.originalname.match(/(\.(jpe?g|png|gif|webp))$/)[0])
                user.updateOne({ _id: req.session._id }, { photo: req.file.filename })
                    .then(() => {
                        res.send({ code: 0, msg: '上传成功' })
                    })
                    .catch(() => {
                        res.send({ code: 1, msg: '服务器错误，请稍后再试' })
                    })
            }
        })
    } else {
        res.send({
            code: 4,
            msg: '登陆超时，请重新登陆～'
        })
    }

})

function deletePhoto(_id, ext) {
    ['.jpg', '.jpeg', '.png', '.gif', '.webp'].forEach(item => {
        if (item === ext) {
            fs.unlink(path.join(__dirname, '../static/images/avatar/', _id + item), () => {})
        }
    })
}
module.exports = router