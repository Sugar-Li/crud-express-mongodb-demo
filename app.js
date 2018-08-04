/*
* app.js 入门模块
* 职责：
*       创建服务
*       做一些服务相关配置
*           模板引擎
*           body-parser 解析表单 post 请求体
*           提供静态资源服务
*       挂载路由
*       监听端口启动服务
*
*
* */

//声明
var express=require("express")
var router=require('./router')
var bodyParser=require("body-parser")

//调用express方法
var app=express()

//开放node_modules和public
//提供静态服务
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

//配置引擎
app.engine('html',require('express-art-template'))

// body-parser 解析表单 post 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//把路由容器挂载到app 服务中
app.use(router)

// 监听，端口号为3000
app.listen(3000,function () {
    console.log('running...')
})