const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const mongoSession = require('connect-mongo')(session)

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

//session中间件
app.use(session({
        secret: 'ihx', //密钥，可以自定义字符串
        cookie: { maxAge: 10 * 60 * 1000 }, //设置cookie的过期时间
        roll: true, //是否每次请求都重新刷新存储时间
        store: new mongoSession({ url: "mongodb://admin:123456@localhost:27017/blog?authSource=admin" }), //把session存到数据库
        resave: false, //重新存储session
        saveUninitialized: false //初始值

    }))
    //设置模版引擎
app.set('view engine', 'ejs')

//路由监听
app.use('/', require('./routers/index'))
app.use('/favicon', (req, res) => {
    res.sendFile('/favicon.ico')
})

//注册路由
app.post('/regist', require('./routers/regist'))

//登陆路由
app.post('/login', require('./routers/login'))

//用户中心
app.get('/usercenter', require('./routers/usercenter'))
app.post('/usercenter', require('./routers/postUsercenter'))
app.get('/loginout', require('./routers/loginout'))
app.post('/update', require('./routers/update'))

//忘记密码
app.use('/resetPwd', require('./routers/resetPwd'))