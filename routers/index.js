const express = require('express')
const path = require('path')
const article = require('../model/article')
const cheerio = require('cheerio')
let router = express.Router()
router.get('/', (req, res) => {
    article.find({}, {}, {
            sort: { date: -1 }, //按时间
            limit: 4, //查找个数
            skip: 0 //跳过的个数
        })
        .then(data => {
            let Data = []
            data.forEach(item => {
                let $ = cheerio.load(`<div id="ihx">${item.content}</div>`)
                Data.push({
                    title: item.title,
                    content: $("#ihx").text(),
                    date: item.date,
                    author: item.author,
                    _id: item._id
                })
            })
            res.render('index', { data: Data })
        })
})
module.exports = router