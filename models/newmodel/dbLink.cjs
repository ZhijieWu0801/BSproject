const {
    Sequelize
} = require('sequelize')
// 数据库连接
const dbName = `bsdb`
const useName = `root`
const pwd = `123456`


const sequelize = new Sequelize(dbName, useName, pwd, {
    // const sequelize = new Sequelize(dbName, useName, pwd, {
    host: 'localhost', // 路径
    dialect: 'mysql' // 数据库类型
})
module.exports = sequelize;
