const sequelize = require('./dbLink.cjs');
const { DataTypes } = require('sequelize');
const PetMaster = require('./PetMaster.cjs');
const Admin = require('./Admin.cjs');

const Pet = sequelize.define(
  'Pet',
  {
    PName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: `宠物名字`,
    },
    PVaccine: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: `疫苗情况`,
    },
    PBirth: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: `出生日期`,
    },
    PHealth: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: `健康状况`,
    },
    PDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: `描述`,
    },
    PSex: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: `宠物性别`,
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
      unique: true,
    },
    PetMasterId: {
      type: DataTypes.INTEGER, 
      allowNull: true,
      comment: `宠物主人`,
      references: {
        model: PetMaster,
        key: 'id',
      },
    },
    PetImg:{
      type: DataTypes.STRING,
      allowNull: true,
      comment: `宠物照片`,
    },
    returnReason:{
      type: DataTypes.STRING,
      allowNull: true,
      comment: `退还原因`,
    }
  },
  {
    tableName: 'pet',
    createdAt: true,
    updatedAt: true,
    paranoid: true,
  }
);
PetMaster.hasMany(Pet);
Pet.belongsTo(PetMaster, { foreignKey: 'PetMasterId', as: 'petMaster' });
Admin.hasMany(Pet);
Pet.belongsTo(Admin, { foreignKey: 'AdminId', as: 'admin' });
module.exports = Pet;
