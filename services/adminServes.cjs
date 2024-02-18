// //有关操作admin表的操作
const {
    Op,
    Admin,
    md5
} = require('../routers/servicesComon.cjs')
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
// 判断电话是否被注册 返回 true / false
exports.findOneByUTel = async (uTel)=>{
    const ins = await Admin.findOne({
        where: {
            uTel
        }
    })
    const hasTel = ins ? ins.toJSON().uTel : null
    return hasTel
}
exports.getTel = async (uTel) => {
const findOne = await this.findOneByUTel(uTel)
    console.log(!!findOne);
    return findOne
}
exports.addAdmin = async (obj) => {
    // console.log(this.getRank(obj.uTel));
    const isFind = await Admin.findOne({
        where: {
            uTel: obj.cTel
        }
    })
    console.log(isFind);
    if (!isFind) {
        // return "管理员用户未找到"
       return new Error("管理员用户未找到")
    }
    if (await this.getRank(obj.cTel) != "0001") {
       return new Error("权限不足")
    }
    const getTel = await this.getTel(obj.uTel);
    if (!!getTel) {
        // return "手机号已被注册"
       return new Error("手机号已被注册")
    }
    obj.uPwd = md5(obj.uPwd)
    const ins = await Admin.create(obj)
    return ins.toJSON()
}
exports.deleteAdmin = async (obj) => {
    if (await this.getRank(obj.cTel) != "0001") {
        return new Error("权限不足")
    }
    if (!(await this.getTel(obj.uTel))) {
        return new Error("未找到用户")
    }
    const ins = await Admin.destroy({
        where: {
            uTel: obj.uTel
        }
    })
    console.log(ins);
    return ins ? `成功删除${ins}个账号` : '删除账号失败'
}
exports.updateAdmin = async (obj) => {
    if (await this.getRank(obj.cTel) != "0001") {
        return new Error("权限不足")
    }
    if (!(await this.getTel(obj.uTel))) {
        return new Error("未找到用户")
    }
    // const select = await Admin.findOne({
    //     where: {
    //         uTel: obj.uTel
    //     }
    // })
    // if (select === null) {
    //     return '未找到该管理员'
    // }
    // obj.uPwd && (obj.uPwd = md5(obj.uPwd))
    console.log(obj);
    const ins = await Admin.update(obj, {
        where: {
            uTel: obj.uTel
        }
    })
    console.log(ins);
    return ins
}
exports.updateOur = async (obj) => {
    if (!(await this.getTel(obj.uTel))) {
        return new Error("未找到用户")
    }
    obj.uPwd = md5(obj.uPwd)
    const ins = await Admin.update(obj, {
        where: {
            uTel: obj.uTel
        }
    })
    console.log(ins);
    return ins
}
exports.getAdminByUTel = async (uTel) => {
    const ins = await Admin.findOne({
        where: {
            uTel
        }
    })
    return inside ? ins.toJSON() : "未找到账号"
}
exports.login = async (obj) => {
    obj.uPwd = md5(obj.uPwd)
    console.log(obj.uTel);
    if (!await this.getTel(obj.uTel)) {
        console.log(222);
        return new Error("账号不存在")
    }
    let ins = await Admin.findOne({
        where: {
            [Op.and]: [{
                    uTel: obj.uTel
                },
                {
                    uPwd: obj.uPwd
                }
            ]
        }
    })
    if (ins === null) {
        return new Error('密码错误')
    }
    // 删除密码字段
    ins = ins.toJSON()
    return ins
}
exports.signIn = async (obj) => {
    console.log(obj);
    const useTel = await this.getTel(obj.uTel)
    if (useTel) {
        return new Error("手机号已被注册")
    }
    let ins = await Admin.findOne({
        where: {
            uTel: obj.uTel,
        }
    })
    if (ins && ins.uTel === obj.uTel) {
        return new Error("账号已存在")

    }
    obj.uPwd = md5(obj.uPwd)
    await Admin.create({
        uTel: obj.uTel,
        uPwd: obj.uPwd,
        uName: obj.uName,
        uRank: obj.uRank,
        uBirth: obj.uBirth,
        uDep: obj.uDep,
    })
    return "成功创建账号"
}