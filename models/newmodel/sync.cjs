// 同步所有模型
// const Pet = require("./Pet.cjs")
// const Admin = require("./admin.cjs")
// const PetMaster = require("./PetMaster.cjs")
// const NowMuster = require("./NowMuster.cjs")
// PetMaster.hasMany(Pet)//建立外键
require("./modelsRelation.cjs")

const sequelize = require('./dbLink.cjs')
sequelize.sync({alter:true}).then(()=>{
    console.log("所有模型同步完成");
})

