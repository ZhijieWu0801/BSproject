const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
const FileMap = {
    name: "AName",
    tel: "ATel",
    address: "AAddress",
    pwd: "APwd",
    limit: "Limit",
    tissue: "Tissue",
    birth: "ABirth",
}
/**
 * 创建用户
 * @param {*} obj {ATel,AName,APwd,[Limit,Tissue,AAddress.ABirth]}
 * @returns mes
 */
exports.createAdmin = async (obj) => {
    const data = commonServeFunc.isMap(FileMap, obj)
    // 手机号码是否存在
    const isExist = await commonServeFunc.getInfoByTel(data.ATel)
    // console.log(isExist,"-----------------------------------------");
    if (!!isExist) {
        return {
            "mes": "手机号已被占用"
        }
    }
    // obj.APwd = Models.md5(obj.APwd)
    Models.Admin.create(data)
    return {
        "mes": "成功添加"
    }
}

/**
 * 通过电话删除管理员
 * @param {*} tel {tel}
 * @returns 
 */
exports.deleteAdminByTel = async (obj) => {
    // console.log(obj);
    const ATel = obj.tel
    // 第二个参数代表需要的是查询到的源数据
    const isActive = await commonServeFunc.getAdminByTel(ATel,true)
    console.log(isActive,45654);
    if (!isActive) {
        return "未查询到管理员"
    }
    // 有删除的额外消息则设置，没有就不设置
    if(obj.msg){
        isActive.deleteMsg = obj.msg
        isActive.save()
    }
    const ins = await Models.Admin.destroy({
        where: {
            ATel
        }
    })
    // console.log("ins:::", ins);
    return ins
}

/**
 * 更新管理员
 * @param {Object} obj {tel,pwd,[name,address,limit,tissue,birth]}
 * @returns 
 */
exports.updataAdmin = async (obj) => {
    const data = commonServeFunc.isMap(FileMap, obj)
    const isActive = await commonServeFunc.getAdminByTel(data.ATel)
    if(!isActive){
        return "未找到管理员"
    }
    console.log(data, 123);
    const ins = await Models.Admin.update(data, {
        where: {
            ATel: data.ATel,
            APwd: Models.md5(data.APwd)
        }
    })
    console.log(ins);
    if (ins[0] === 0) {
        return "密码错误"
    }
    return ins.toJSON ? ins.toJSON() : ins
}
/**
 * 更新管理员电话
 * @param {Obj} obj {oldTel,newTel,pwd} 
 * @returns 
 */
exports.updataAdminTel = async (obj) => {
    const isActive = await commonServeFunc.getAdminByTel(obj.oldTel)
    if (!isActive) {
        return "未找到管理员"
    }
    const ins = Models.Admin.update({
        ATel: obj.newTel
    }, {
        where: {
            ATel: obj.oldTel,
            APwd: Models.md5(obj.pwd)
        }
    })
    if (ins[0] === 0) {
        return "密码错误，请核对账号和密码"
    }
    return ins && ins.toJSON ? ins.toJSON() : ins
}

// 通过电话获取管理员权限
exports.getLimitByTel = async (ATel) => {
    const ins = await commonServeFunc.getAdminByTel(ATel)
    console.log(ins);
    return ins ? (ins.Limit ? ins.Limit : "未设置管理员权限") : "未查询到管理员"
}
exports.findAll = async (ATel) => {
    const ins = await Models.Admin.findAll()
    console.log(ins);
    const aaa = ins.map(r=>{
        return r.toJSON()
    })
    return aaa 
}