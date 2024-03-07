const Models = require("./servicesComon.cjs")


/**
 * 第一个参数是目标对象
 * 第二个参数是需要映射的对象
 * 如果有 pwd 字段则会用 md5 加密
 * @param {Object} mapObj 映射成为的目标
 * @param {Object} obj 需要映射的对象
 * @returns 映射完成的结果
 */
exports.isMap = (mapObj, obj) => {
    let data = {}
    for (item in obj) {
        const key = mapObj[item]
        if (item === 'pwd') {
            data[key] = Models.md5(obj[item])
        }
        else if(item === 'birth'){
            data[key] = new Date((obj[item])).getTime();

        } else {
            data[key] = obj[item]
        }
    }
    return data
}


/**
 * 创建管理员
 * @param {Object} obj {ATel,APwd,AName,Limit,[Tissue,AAddress,Abirth]}
 * @returns 是否添加成功
 */
exports.createAdmin = async (obj) => {
    const isExist = await this.getAdminByTel(obj.ATel)
    // console.log(isExist);
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


/**
 * 通过电话获取个人信息
 * 第二个参数代表返回的时实例还是json转换后的对象，默认返回json对象，传入true返回实例
 * @param {String} Tel 
 * @returns 查询结果
 */
exports.getInfoByTel = async (Tel,not = false) => {
    const ins =
        (await Models.Admin.findOne({
            where: {
                ATel: Tel,
            }
        })) ||
        (await Models.PetMaster.findOne({
            where: {
                MTel: Tel
            }
        }))
        if (not) {
            return ins
        }
    // console.log(ins?.toJSON());
    return ins && ins.toJSON()
}

/**
 * 通过电话获取管理员信息 
 * @param {String} ATel 
 * @returns 查询结果
 */
exports.getAdminByTel = async (ATel) => {
    const ins = await Models.Admin.findOne({
        where: {
            ATel
        }
    })
    // console.log(ins?.toJSON());
    return ins && ins.toJSON()
}

/**
 * 登录
 * 密码使用MD5加密
 * @param {Object} obj {tel,pwd}
 * @returns 返回能不能成功登录
 */
exports.login = async (obj) => {
    if (!await this.getInfoByTel(obj.tel)) {
        console.log("未找到用户");
        return "未找到用户"
    }
    obj.pwd = Models.md5(obj.pwd)
    const ins = await Models.Admin.findOne({
            where: {
                ATel: obj.tel,
                APwd: obj.pwd
            }
        }) ||
        await Models.PetMaster.findOne({
            where: {
                MTel: obj.tel,
                MPwd: obj.pwd
            }
        })
    console.log(ins?.toJSON());
    return ins ? "登陆成功" : "密码错误"
}

/**
 * 通过电话获取id
 * @param {String} tel 
 * @returns id
 */
exports.getIdByTel = async (tel) => {
    return (await this.getInfoByTel(tel))?.id
}

