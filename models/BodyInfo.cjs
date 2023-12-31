// 宠物身体信息模型(表)
// 自动配置主键
// 
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const BodyInfo = sequelize.define(
    'BodyInfo', {
        vaccine: {
            type: DataTypes.STRING,
            allowNull: true
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true
        },
        character: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        tableName:"BodyInfo",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = BodyInfo