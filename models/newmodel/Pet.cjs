// 宠物模型
// 自动配置主键
const sequelize = require("./dbLink.cjs")
const {
    DataTypes
} = require("sequelize")
const Pet = sequelize.define(
    'Pet', {
        PName: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: `宠物名字`,
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `宠物种类`,
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `宠物编号`,
        },
        PetMaster: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: `宠物主人`,
        },
    }, {
        tableName: "pet",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
)
module.exports = Pet