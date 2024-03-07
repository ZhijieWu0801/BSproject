const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
const FileMap = {
    name: "PName",
    master: "PetMaster",
    species: "species",
    serial: "serial",
}
/**
 * 通过主人的电话查询名下的所有宠物
 * @param {String} tel 
 * @returns 宠物列表
 */
exports.getPetByMasterTel = async (tel) => {
    const PetMasterId = await commonServeFunc.getIdByTel(tel)
    if (!PetMasterId) {
        return "未找到用户"
    }
    const ins = await Models.Pet.findAll({
        where: {
            PetMasterId
        }
    }).then((pets) => {
        const data = pets.map(pet => {
            const Json = pet && pet.toJSON()
            return Json
        })
        return data
    })
    console.log(ins);
    return ins.length ? ins : "未找到用户的宠物"
}


/**
 * 添加一个宠物
 * @param {Object} obj {species,serial,[name,master]} 
 * @returns 创建结果
 */
exports.addPet = async (obj) => {
    const data = commonServeFunc.isMap(FileMap, obj)
    const ins = await Models.Pet.create(data)
    return ins && ins.toJSON()
}


/**
 * 删除一个宠物
 * 传入宠物编号
 * @param {String} obj {serial} 
 * @returns 删除结果
 */
exports.deletOnePet = async (serial) => {

    const ins = await Models.Pet.destroy({
        where: {
            serial: serial
        }
    })
    return ins === 0 ? `未找到编号为${serial}的宠物` : `成功删除了${ins}个宠物`
}

/**
 * 删除多个宠物
 * 传入宠物编号数组
 * @param {Array} arr {serial} 
 * @returns 删除结果
 */
exports.deletPet = async (arr) => {
    const ins = await Models.Pet.destroy({
        where: {
            serial: {
                [Models.Op.in]: arr,
            },
        }
    })
    return ins === 0 ? `未找到编号为${obj.serial}的宠物` : `成功删除了${ins}个宠物`
}
/**
 * 编辑/更新 宠物信息
 * @param {Object} obj {serial,[species,PName,PetMasterTel,AdminTel]} 
 * @returns 
 */
exports.updatePet = async (obj) => {
    const Pet = await this.getPetBySerial(obj.serial, true)
    if (!Pet) {
        return "宠物编号有误，未查询到宠物"
    }
    let ins
    if (obj.PetMasterTel) {
        const master = await commonServeFunc.getInfoByTel(obj.PetMasterTel, true)
        if (!(master && master.toJSON && master.toJSON())) {
            return "未找到用户"
        }
        await Pet.setPetMaster(master.id);
        ins = await Models.Pet.update(obj, {
            where: {
                serial: obj.serial
            },
        })
    }
    if (obj.AdminTel) {
        const admin = await commonServeFunc.getInfoByTel(obj.AdminTel, true)
        if (!(admin && admin.toJSON && admin.toJSON())) {
            return "未找到管理员"
        }
        await Pet.setAdmin(admin.id);
        ins = await Models.Pet.update(obj, {
            where: {
                serial: obj.serial
            },
        })
    }
    console.log(ins);
    return ins
}

/**
 * 通过编号获取宠物信息
 * 第二个参数代表返回的时实例还是json转换后的对象，默认返回json对象，传入true返回实例
 * @param {String} serial 
 * @returns 宠物信息
 */
exports.getPetBySerial = async (serial, not = false) => {
    const ins = await Models.Pet.findOne({
        where: {
            serial
        }
    })
    if (not) {
        return ins
    }
    return ins && ins.toJSON()
}