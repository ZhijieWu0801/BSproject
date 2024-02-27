// 宠主模型
// 自动配置主键
const sequelize = require("./dbLink.cjs")
const {
    DataTypes
} = require("sequelize")
const PetMaster = sequelize.define(
    'PetMaster', {
        MTel: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `宠主电话`,
        },
        MPName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `宠主名字`,
        },
        MAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: `宠主地址`,
        },
        MPwd: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `宠主密码`,
        },
    }, {
        tableName: "PetMaster",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = PetMaster