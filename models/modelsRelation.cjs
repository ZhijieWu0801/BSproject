const PetBasInfo = require("./PetBasInfo.cjs")
const NowMuster = require("./NowMuster.cjs")


NowMuster.hasMany(PetBasInfo)
require('./db.cjs')