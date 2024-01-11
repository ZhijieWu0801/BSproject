const {operable,Op,Pet,Admin} = require("./servicesComon.cjs")
//获取权限的方法，返回权限的代码如 0001
exports.getRank = async (uTel) => {
    const ins = await Admin.findOne({
        where: {
            uTel
        }
    })
    const uRank = ins ? ins.toJSON().uRank : "0000"
    // console.log(uRank);
    return uRank
}
exports.getInfoById = async (id) => {
    const ins = await Pet.findOne({
        where: {
            id
        }
    })
    const petInfo = ins ? ins.toJSON() : null
    return petInfo
}
const isExist = async (id) => {
    const isExist = await this.getInfoById(id)
    return !!isExist
}
exports.addPet = async (obj) => {
    const runkCode = await this.getRank(obj.uTel)
    if (operable.hasOwnProperty(runkCode)) {
        Pet.create(obj)
    } else {
        return "未找到该管理员"
    }
}
exports.deletePet = async (obj) => {
    const runkCode = await this.getRank(obj.uTel)
    if (runkCode === '0000') {
        return "未找到该管理员"
    }
    if (operable.hasOwnProperty(runkCode)) {
        Pet.destroy({
            where: {
                id: obj.id
            }
        })
    } else {
        return "权限不足"
    }
}
exports.updatePet = async (obj) => {
    const runkCode = await this.getRank(obj.uTel)
    if (runkCode === '0000') {
        return "没有修改权限"
    }
    const isFind = await isExist(obj.update.id)
    if(!isFind){
        return "未找到宠物信息"
    }
    Pet.update(obj.update, {
        where: {
            id: obj.update.id
        }
    })
}