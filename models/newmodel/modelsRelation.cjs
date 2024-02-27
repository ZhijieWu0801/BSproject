const pet = require("./Pet.cjs")
const PetMuster = require("./PetMuster.cjs")


PetMuster.hasMany(pet)
require('./dbLink.cjs')