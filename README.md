# crud-express-MongoDB

## 1.学习如何操作MonggoDB

### 启动和关闭数据库

启动：

```shell
# monggoDB 默认使用执行 mongod 命令所处盘根目录下的 /data/db 作为自己的数据存储目录
# 所以在第一次执行命令前先自己手动建立一个 /data/db
mongod
```



### 连接和推出数据库

连接：

```shell
# 该命令默认连接到本机的 MongoDB 服务
mongo
```

瑞出：

```shell
exit
```



### 基本命令

- `show dbs`
  - 查看显示所有数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称`
  - 切换到指定的数据（如果没有会新建）
- 插入数据 `db.student.insert({"name":"SUGAR"})`
- 查看当前文件的数据 `db.student.find()`



## 2. 在node中如何操作MongoDB

+ 官方文档
+ 使用第三方包 mongoose 来操作MongoDB

## 3. 使用mongoose

### 安装：

```shell
npm i mongoose
```

### hello world

```shell
var mongoose = require('mongoose');

//连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/test');

//创建一个模型
//就是在设计数据库
//MongoDB 十分灵活，只需要在代码中设计你的数据库就可以了
//mongoose 可以使设计编写过程简化
var Cat = mongoose.model('Cat', {name: String});

for (var i = 0; i < 100; i++) {
    //实例化一个 Cat
    var kitty = new Cat({name: '喵喵' + i});

    //持久化保存一个 Cat
    kitty.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('meow')
        }
    })
}
```



### 具体使用方法

#### 设计 Schema 发布Model

```shell
var mongoose = require('mongoose')

var Schema = mongoose.schema

//1.连接数据库
//指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongoose://localhost/itcast')

// 2. 设计文档结构(表)
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username: {
        type: String,
        require: true//必须有
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },

})

// 3. 将文档结构发布为模型
//     mongoose.model 方法就是用来将一个架构发布为 model
//      第一个参数：传入一个大写名词单数字符串来表示你的数据库名称
//                  mongoose 会自动将大写名词的字符串生成小写复数 的集合名称
//                  例如：User-----users
//      第二个参数：架构 Schema

//      返回值：模型构造函数

var User = mongoose.model("User", userSchema)

//4. 当我们有了模型构造函数之后，就可以使用这个构造函数对User 中的数据为所欲为了。下面的增删查改都是基于模型构造函数来调用方法的



```



+ 增加数据： 

```javascript
//根据模型构造函数，实例一个user对象
var admin=new User({
    username:'Sugar',
    password:'123456',
    email:'123345@qq.com'
})

//将这个对象保存起来
admin.save(function (err, ret) {
    if (err) {
        console.log('保存成功')
    }else{
        console.log('垴村成功')
        console.log(ret)
    }
})
```



```shell
new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Sever error.')
        }
        res.redirect('/students')
    })
}
```





+ 删除

```shell
User.remove({
    username: 'Sugar'
}, function (err) {
    if (err) {
        console.log('删除失败')
    } else {
        console.log('删除成功')
    }
})
```



```shell
 Student.findByIdAndRemove(req.query.id,function (err) {
        if (err) {
            return res.status(500).send('Sever error.')
        }
        res.redirect('/students')
    })
}
```



+ 更新

```shell
User.findByIdAndUpdate('5b364b8da3d4961b9c1f586b',{
    username:'小鑫鑫'
},function (err, ret) {
    if (err) {
    console.log('更新失败')
    } else {
        console.log('更新成功')
        console.log(ret)
    }
})
```



+  查询

1.查询所有

```shell
User.find(function (err, ret) {
    if (err) {
        console.log('保存成功')
    }else{
        console.log(ret)
    }
})
```

2.按条件查询所有（即时只有一个对象，得到的也是数组）

```shell
User.find({
    name:'Sugar'
},function (err, ret) {
    if (err) {
        console.log('保存成功')
    }else{
        console.log(ret)
    }
})
```

3.按条件查询单个（得到的是对象）

```shell
User.findOne({
    username:'Xiner'
},function (err, ret) {
    if (err) {
        console.log('保存成功')
    }else{
        console.log(ret)
    }  
```



## 4.修改crud

​	mongodb主要是改变了数据存储方式，从之前存储到文件中，然后修改到存储到数据库中，因此在调用数据的方法也随之改变

​	之前我们封装了 `student` 模块来处理数据，现在调用数据库，主要也是将student模块进行更改



### student模块

```javascript
//声明
var mongoose=require("mongoose")

//调用Schema
var Schema=mongoose.Schema

//链接mongodb
mongoose.connect("mongodb://localhost/itcast")

//设计文档结构
var studentSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    gender:{
        type:Number,
        enum:[0,2],
        default:1
    },
    age:{
        type:Number,
    },
    hobbies:{
        type:String
    }
})

//发布模型，返回模型构造函数,导出构造函数
module.exports=mongoose.model("Student",studentSchema)

```



### router模块

​	在router模块中调用的api发生改变，也需要进行一定的更改

+ 渲染首页——不变
+ 渲染添加页面——不变
+ 处理添加学生请求
  + 保存学生的api发生变化
  + 在调用过程中，id要更改成_id
  + 在调用 byID 的函数时，我们从数据库中获取到的id是一个包含双引号的字符串，所以我们需要将这个双引号删除，这样才能在渲染的时候转到相关的页面上



## 总结：

+ 调用MongDB操作数据，省略了自己封装API，可以直接使用回调函数调用api
+ 但是在实际操作的时候，会有一些我们想要i的操作没有具体的api，这是我们仍然需要封装异步api，然后进行调用，这是node的基础核心