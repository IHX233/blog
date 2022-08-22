const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

//创建app
let app = express()
app.listen('2333', () => {
    console.log('启动2333端口成功')
})

//连接服务器
mongoose.connect('mongodb://admin:123456@localhost:27017/blog?authSource=admin', { useNewUrlParser: true }).then(() => {
        console.log('连接成功')
    })
    .catch((err) => {
        console.log(err)
    })

//默认中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/static')))

//设置模版引擎
app.set('view engine', 'ejs')

//路由监听
app.use('/', require('./routers/index'))
app.use('/favicon', (req, res) => {
        res.sendFile('/favicon.ico')
    })
    //注册路由
app.post('/regist', require('./routers/regist'))