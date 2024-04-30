const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
// const MasterFileMap = {
//     name: "MPName",
//     tel: "MTel",
//     address: "MAddress",
//     pwd: "MPwd"
// }
const {
    MasterFileMap
} = require("../common/const.cjs");

/**
 * 宠主注册
 * 密码使用MD5加密
 * @param {*} obj {tel,name,pwd,[address]}
 * @returns 是否能注册成功
 */

exports.signIn = async (obj) => {
    if (await commonServeFunc.getInfoByTel(obj.tel)) {
        return "电话已被占用"
    }
    let data = {}
    console.log(MasterFileMap);
    data = commonServeFunc.isMap(MasterFileMap, obj)
    data.loginToken = commonServeFunc.getToken()
    // console.log("data:::",data);
    const ins = await Models.PetMaster.create(data)
    console.log(ins.toJSON());
    return "注册成功"
}
/**
 * 宠主修改
 * @param {Object} obj {tel,pwd,[name,address,pwd]}
 * @returns 
 */
exports.updateMaster = async (obj) => {
    // data = {
    //     Mtel: obj.tel,
    //     MPName: obj.name,
    //     MAddress: obj.address,
    //     MPwd: obj.pwd,
    // }
    const data = commonServeFunc.isMap(MasterFileMap, obj)
    const ins = await Models.PetMaster.update(data, {
        where: {
            MTel: data.MTel,
            MPwd: data.MPwd
        }
    })
    console.log(ins);
    if (ins[0] === 0) {
        return "更新失败"
    }
    return "更新成功"
}
/**
 * 宠主删除
 * @param {Object} obj {tel,pwd}
 * @returns 
 */
exports.deleteMaster = async (obj) => {
    const data = commonServeFunc.isMap(MasterFileMap, obj)
    console.log(data);
    const ins = await Models.PetMaster.destroy({
        where: {
            MTel: data.MTel,
            MPwd: data.MPwd
        }
    })
    return ins && "删除成功"
}
/**
 * 宠主更新电话
 * @param {Object} obj {oldTel,nweTel,pwd}
 * @returns 
 */
exports.upDataMasterTel = async (obj) => {
    console.log(obj);
    const ins = await Models.PetMaster.update({
        MTel: obj.newTel
    }, {
        where: {
            MTel: obj.oldTel,
            MPwd: Models.md5(obj.pwd)
        }
    })
    console.log(ins, 1233333);
    if (ins[0] === 0) {
        return "删除失败"
    }
    return ins
}
/**
 * 通过地区获取该地区的注册过的用户
 */
exports.getAllMasterBydistrict = () => {
    // 暂定
}

/**
 * 收养(连接)一个宠物
 * @param obj {tel,serial}
 */
exports.linkPet = async (obj) => {
    const pet = await Models.Pet.findOne({
        where: {
            serial: obj.serial
        }
    })
    if (!pet) {
        return {
            msg: `宠物编号错误，未找到宠物`,
            code: 404,
        }
    }
    const master = await Models.PetMaster.findOne({
        where: {
            MTel: obj.tel
        }
    })
    if (!master) {
        return {
            mas: `用户未注册`,
            code: 404,
        }
    }
    const masterId = master.toJSON().id
    pet.update({
        PetMasterId: masterId
    })
    console.log(pet.toJSON(), "--------", master.toJSON());
    return {
        mas: `更新成功`,
        code: 200,
    }
}
/**
 * 断开宠物和主人的绑定
 * 宠物归还
 * @param {*} obj { tel , serial} 
 */
exports.disconnectPetLink = async (obj)=>{
    const pet = await Models.Pet.findOne({
        where: {
            serial: obj.serial
        }
    })
    if (!pet) {
        return {
            msg: `宠物编号错误，未找到宠物`,
            code: 404,
        }
    }
    if (!pet.toJSON().PetMasterId) {
        return {
            msg: `该宠物没有关联的主人`,
            code: 404,
        }
    }
    const master = await Models.PetMaster.findOne({
        where: {
            MTel: obj.tel,
        }
    })
    if (!master) {
        return {
            mas: `用户未注册`,
            code: 404,
        }
    }
    // const masterId = master.toJSON().id
    pet.update({
        PetMasterId: null,
    })
    console.log(pet.toJSON(), "--------", master.toJSON());
    return {
        mas: `更新成功`,
        code: 200,
    }
}