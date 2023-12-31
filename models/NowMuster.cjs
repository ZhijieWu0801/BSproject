// 现在的主人模型(表)
// 自动配置主键
// 
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const NowMuster = sequelize.define(
    'NowMuster', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName:"NowMuster",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = NowMuster