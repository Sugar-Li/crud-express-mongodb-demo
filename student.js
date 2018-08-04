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
        enum:[1,2],
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
