//模型连接
const pet = require("./Pet.cjs")
const PetMuster = require("./PetMaster.cjs")
const Admin = require("./admin.cjs")

Admin.hasMany(pet) //建立外键
PetMuster.hasMany(pet) //建立外键
// require('./dbLink.cjs')