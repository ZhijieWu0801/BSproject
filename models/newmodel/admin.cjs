// 管理员模型
// 自动配置主键
// 用于登录等
const sequelize = require("./dbLink.cjs")
const {
    DataTypes
} = require("sequelize")
const Admin = sequelize.define(
    'Admin', {
        ATel: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `管理员电话`,
        },
        AName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `管理员名字`,
        },
        Limit: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: `管理员权限`,
        },
        Tissue: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: `管理员组织`,
        },
        AAddress: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: `管理员地址`,
        },

        APwd: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: `管理员密码`,
        },
        ABirth: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: `管理员生日`,
        },
    }, {
        tableName: "Admin",
        createdAt: true, // 创建时间
        updatedAt: true, // 更新时间
        paranoid: true // 删除时间，设置后将不能删除，只会添加删除时间
    }
);
module.exports = Admin