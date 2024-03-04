const {
    Op
} = require("sequelize");
//有关操作petbasinfo表的操作
const Pet = require('../newmodel/Pet.cjs')
const Admin = require('../newmodel/admin.cjs')
const PetMaster = require('../newmodel/petMaster.cjs')
const md5 = require("md5")
const operable = {
    '0001': '超管',
    '0002': '普通管理员'
}
const express = require('express')
const app = express()

// cors中间件，处理跨域，允许所有源，所有请求类型
const cors = require("cors")
app.use(cors())
app.options('*', cors())


//解析body传递的参数
const bodyParser = require('body-parser');
// 解析 application/x-www-form-urlencoded 格式的参数
app.use(bodyParser.urlencoded({
    extended: false
}));
// 解析 application/json 格式的参数
app.use(bodyParser.json());
// 将传入的参数统一先处理，避免后续参数问题
const handleParams = (req, res, next) => {
    const query = {
        ...req.query, // 处理查询参数
        ...req.params, // 处理路径参数
        ...req.body // 处理请求体参数
    }
    req.query = query
    next()
}
app.use(handleParams);

// 开启监听
app.listen(3000, () => {
    console.log("监听3000");
})
module.exports = {
    Op,
    Pet,
    Admin,
    PetMaster,
    md5,
    operable,
    app
}