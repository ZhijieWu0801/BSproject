const {
    Op
} = require("sequelize");
//有关操作petbasinfo表的操作
const Pet = require('../models/PetBasInfo.cjs')
const Admin = require('../models/admin.cjs')
const md5 = require("md5")

const operable = {
    '0001': '超管',
    '0002': '普通管理员'
}
module.exports = {
    Op,
    Pet,
    Admin,
    md5,
    operable
}
