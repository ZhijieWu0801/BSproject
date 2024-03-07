const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
const FileMap = {
    name: "MPName",
    tel: "MTel",
    address: "MAddress",
    pwd: "MPwd"
}


/**
 * 宠主注册
 * 密码使用MD5加密
 * @param {*} obj {tel,name,pwd,[address]}
 * @returns 是否能注册成功
 */

exports.signIn = async (obj) => {
    if (await commonServeFunc.getInfoByTel(obj)) {
        return "电话已被占用"
    }
    let data = {}
    data = commonServeFunc.isMap(FileMap, obj)
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
    const data = commonServeFunc.isMap(FileMap, obj)
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
    const data = commonServeFunc.isMap(FileMap, obj)
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