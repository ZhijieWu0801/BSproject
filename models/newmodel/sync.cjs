// 同步所有模型
// require("./admin.cjs")
// require("./PetBasInfo.cjs")
// require("./NowMuster.cjs")
// require("./functionList.cjs")

const Pet = require("./Pet.cjs")
const NowMuster = require("./NowMuster.cjs")
NowMuster.hasMany(PetBasInfo)


const sequelize = require('./dbLink.cjs')
sequelize.sync({alter:true}).then(()=>{
    console.log("所有模型同步完成");
})

