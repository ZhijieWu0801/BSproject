const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
/**
 * 宠主注册
 * 密码使用MD5加密
 * 
 * @param {*} obj {tel,name,pwd,[address]}
 * @returns 是否能注册成功
 */

exports.signIn = async (obj) => {
    if(await commonServeFunc.getInfoByTel(obj.tel)){
        return "电话已被占用"
    }
    const ins = await Models.PetMaster.create({
        MTel:obj.tel,
        MPName:obj.name,
        MPwd:Models.md5(obj.pwd),
        MAddress:obj.address,
    })
    console.log(ins.toJSON());
    return "注册成功"
}

