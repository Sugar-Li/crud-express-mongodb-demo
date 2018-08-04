/*
* 路由模块
*   职责：
*       处理路由
*       根据不同的请求方法+请求路径设置具体的请求函数
*
* */

//声明
var express=require('express')
var Student=require('./student')

//1.调用express方法，创建一个路由容器
var router = express.Router()


//2.将路由都挂载到 router 路由容器中
// 渲染首页
router.get('/students',function (req,res) {
    //使用 utf8 可以使得读取的文件按照 utf-8 编码
    // fs.readFile('./db.json','utf8',function (err,data) {
    //     if(err){
    //         return res.status(500).send('Server error')
    //     }
    //
    //     //data是字符串
    //     // console.log(typeof data)
    //     var students=JSON.parse(data).students
    //     //调用art-template，自动在根目录下寻找到views文件夹中的index.html
    //     res.render('index.html',{
    //         fruits:[
    //             '苹果',
    //             '香蕉',
    //             '西瓜'
    //         ],
    //         students:students
    //     })
    // })

    Student.find(function (err,students) {
        if (err){
            return res.status(500).send('Server error')
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '西瓜'
            ],
            students:students
        })
    })

})

//渲染添加学生页面
router.get('/students/new',function (req,res) {
    res.render('new.html')
})

//处理添加学生请求
router.post('/students/new',function (req,res) {

    new Student(req.body).save(function (err) {
        if (err){
            console.log(err)
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })

})

//渲染编辑页面
router.get('/students/edit',function (req,res) {
//    1. 在客户端的列表页中处理链接问题（需要有id参数）
//    2.获取需要编辑的学生的id
//    3.渲染编辑页面
//      根据id获取学生信息
//       使用模板引擎渲染页面
//     console.log(typeof req.query.id.replace(/"/g,''))
    Student.findById(req.query.id.replace(/"/g,''),function (err,student) {
        if (err){
            return res.status(500).send('Server error')
        }
        res.render('edit.html',{
            student:student
        })
    })
})

// 处理编辑请求
router.post('/students/edit',function (req,res) {
//    1.获取表单数据
//    2.更新
//    3.发送响应

    Student.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function (err) {
        if (err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

//处理删除请求
router.get('/students/delete',function (req,res) {
    //1.获取要删除的id
    //2. 根据id执行删除操作
    //3.根据操作结果发送响应数据
    Student.findByIdAndRemove(req.query.id.replace(/"/g,''),function (err) {
        if (err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

//将路由导出
module.exports=router