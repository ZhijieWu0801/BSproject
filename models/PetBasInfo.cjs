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
            allowNull: false,
            comment:`宠物姓名`
        },
        pBreed: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:`宠物品种`
        },
        pSex: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            comment:`宠物性别`
        },
        pBirth:{
            type:DataTypes.DATE,
            allowNull:true,
            comment:`宠物生日`
        },
        pImg:{
            type: DataTypes.STRING,
            allowNull:true,
            comment:`宠物图片`
        },
        // pNum:{
        //     type: DataTypes.STRING,
        //     allowNull:false,
        //     autoIncrement:true,
        //     comment:`宠物编号`
        // },

    }, {
        tableName:"PetBasInfo",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = PetBasInfo