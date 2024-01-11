// 管理员模型(?表)
// 自动配置主键
// 用于登录等
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const Admin = sequelize.define(
    'Admin', {
        uTel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uPwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uRank:{
            type:DataTypes.STRING,
            allowNull:true
        },
        uBirth:{
            type:DataTypes.STRING,
            allowNull:true
        },
        uDep:{
            type:DataTypes.STRING,
            allowNull:true
        },

    }, {
        tableName:"Admin",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = Admin