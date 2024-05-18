//模型连接
const Pet = require("./Pet.cjs")
const PetMuster = require("./PetMaster.cjs")
const Admin = require("./Admin.cjs")

Admin.hasMany(Pet) //建立外键
PetMuster.hasMany(Pet) //建立外键
// require('./dbLink.cjs')