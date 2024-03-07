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
    PetMasterId: {
      type: DataTypes.INTEGER, // Assuming the id in PetMaster is an integer
      allowNull: true,
      comment: `宠物主人`,
      references: {
        model: PetMaster,
        key: 'id',
      },
    },
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
