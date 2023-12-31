// 宠物基本信息模型(表)
// 自动配置主键
// 用于存储动物基本信息
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const PetBasInfo = sequelize.define(
    'PetBasInfo', {
        petName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        petSex: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petBreed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        petBrth:{
            type:DataTypes.DATE,
            allowNull:false
        },
        petImg:{
            type: DataTypes.STRING
        }
    }, {
        tableName:"PetBasInfo",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = PetBasInfo