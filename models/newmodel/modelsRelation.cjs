//模型同步
const pet = require("./Pet.cjs")
const PetMuster = require("./PetMaster.cjs")


PetMuster.hasMany(pet)
require('./dbLink.cjs')