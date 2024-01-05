// 宠物基本信息模型(表)
// 自动配置主键
// 用于存储动物基本信息
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const PetBasInfo = sequelize.define(
    'PetBasInfo', {
        pName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pSex: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pBirth:{
            type:DataTypes.DATE,
            allowNull:false
        },
        pImg:{
            type: DataTypes.STRING
        },
        pNum:{
            type: DataTypes.STRING,
            allowNull:false
        },
        pBreed: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName:"PetBasInfo",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = PetBasInfo