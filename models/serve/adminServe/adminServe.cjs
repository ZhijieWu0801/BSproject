const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
// 创建用户
/**
 * 
 * @param {*} obj {ATel,AName,APwd,[Limit,Tissue,AAddress.ABirth]}
 * @returns mes
 */
exports.createAdmin = async (obj) => {
    const isExist = await commonServeFunc.getInfoByTel(obj.ATel)
    console.log(isExist);
    if (!!isExist) {
        return {
            "mes": "手机号已被占用"
        }
    }
    obj.APwd = Models.md5(obj.APwd)
    Models.Admin.create(obj)
    return {
        "mes": "成功添加"
    }
}


// 通过电话获取管理员权限
exports.getLimitByTel = async (ATel) => {
    const ins = await commonServeFunc.getAdminByTel(ATel)
    console.log(ins);
    return ins ? (ins.Limit ? ins.Limit : "未设置管理员权限") : "未查询到管理员"
}