// 同步所有模型
require("./admin.cjs")
require("./PetBasInfo.cjs")
require("./NowMuster.cjs")

const PetBasInfo = require("./PetBasInfo.cjs")
const NowMuster = require("./NowMuster.cjs")
NowMuster.hasMany(PetBasInfo)


const sequelize = require('./db.cjs')
sequelize.sync({alter:true}).then(()=>{
    console.log("所有模型同步完成");
})