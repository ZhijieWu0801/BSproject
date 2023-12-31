// 管理员模型(?表)
// 自动配置主键
// 用于登录等
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const Admin = sequelize.define(
    'Admin', {
        loginId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        loginPwd: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName:"Admin",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = Admin