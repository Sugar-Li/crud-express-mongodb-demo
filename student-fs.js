var fs=require('fs')

var dbPath='./db.json'

/*
* 获取全部学生
* 返回的是一个列表[]
* callback中的参数
*   第一个参数是 err
*       成功时null
*       失败时就是错误对象——所以才会在回调函数触发 if（err）
*
*   第二个参数是 结果
*       成功是 数组
*       失败是 undefined
*
* */
exports.find=function (callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

//根据id获取学生信息
exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        var students=JSON.parse(data).students
        var student=students.find(function (item) {
            return item.id==parseInt(id)
        })

        callback(null,student)
    })
}

//添加保存学生(传入两个参数，一个是要保存的学生对象，一个是回调函数)
exports.save=function(student,callback){
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        //将字符串转换成对象，然后获取数据数组
        var students=JSON.parse(data).students

        //处理id唯一的，不重复
        student.id=students[students.length-1].id+1

        // 将对象保存到数组中
        students.push(student)

        //数组转回对象，在转转回字符串
        var fileData=JSON.stringify({
            students:students
        })

        // 保存文件
        fs.writeFile(dbPath,fileData,function (err) {
            if (err){
                //失败就吧错误对象返回
                return callback(err)
            }
            // 成功则返回一个null
            return callback(null)
        })
    })
}

//更新学生
exports.updateById=function(student,callback){
    fs.readFile(dbPath,'utf8',function (err,data){
        if (err){
            return callback(err)
        }
        //将字符串转换成对象，然后获取数据数组
        var students=JSON.parse(data).students

        //注意，读取文件获取到的这个对象的id是字符串，需要转换成数字类型才能进行比较
        student.id=parseInt(student.id)

        //调用find遍历students数组，当找到对像中的id和给定对象student的id一致时，返回这个对象
        var stu=students.find(function (item) {
            return item.id=== student.id
        })

        //通过循环的遍历对象的方法，将student更改的信息传到对应的stu中
        for (key in student){
            stu[key]=student[key]
        }

        //数组转回对象，在转回字符串
        var fileData=JSON.stringify({
            students:students
        })

        // 保存文件
        fs.writeFile(dbPath,fileData,function (err) {
            if (err){
                //失败就吧错误对象返回
                return callback(err)
            }
            // 成功则返回一个null
            return callback(null)
        })
    })
}

//删除学生
exports.deleteById=function(id,callback){
    fs.readFile(dbPath,'utf8',function (err,data) {
        if (err){
            return callback(err)
        }
        console.log("gaga")
        //将字符串转换成对象，然后获取数据数组
        var students=JSON.parse(data).students

        //调用find遍历students数组，当找到对像中的id和给定对象student的id一致时，返回这个对象
        var deleteId=students.findIndex(function (item) {
            return item.id=== parseInt(id)
        })

        students.splice(deleteId,1)

        //数组转回对象，在转回字符串
        var fileData=JSON.stringify({
            students:students
        })

        // 保存文件
        fs.writeFile(dbPath,fileData,function (err) {
            if (err){
                //失败就吧错误对象返回
                return callback(err)
            }
            // 成功则返回一个null
            return callback(null)
        })
    })
}