// 软件功能表
// 
const sequelize = require("./db.cjs")
const {
    DataTypes
} = require("sequelize")
const FunctionList = sequelize.define(
    'FunctionList', {
        functionName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName:"FunctionList",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = FunctionList