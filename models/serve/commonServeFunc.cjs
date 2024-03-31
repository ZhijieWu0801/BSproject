const Models = require("./servicesComon.cjs")

const petType2Text = {
    M: "猫",
    D: "狗"
}
const petText2Type = {
    "猫": "M",
    "狗": "D"
}
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
        } else if (item === 'birth') {
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
exports.getInfoByTel = async (Tel, not = false) => {
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
 * @param {String} useOriginal 返回查询到的实例 或者 解析后的JSON 
 * @returns 查询结果
 */
exports.getAdminByTel = async (ATel, useOriginal = false) => {
    const ins = await Models.Admin.findOne({
        where: {
            ATel
        }
    })
    if (useOriginal) {
        return ins
    }
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
    console.log(obj);
    if (!await this.getInfoByTel(obj.tel)) {
        console.log("未找到用户");
        return {
            msg: "未找到用户",
            state: 404
        }
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
    console.log(ins?.toJSON(),111111);
    return ins ? {
        data:ins,
        msg: "登陆成功",
        state: 200
    } : {
        msg: "密码错误",
        state: 401
    }
}

/**
 * 通过电话获取id
 * @param {String} tel 
 * @returns id
 */
exports.getIdByTel = async (tel) => {
    return (await this.getInfoByTel(tel))?.id
}

const sequelize = require('sequelize');

// 查询表中不同字母的种类数量
exports.uniqueLettersCount = async () => {

    const ins = await Models.Pet.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.fn('SUBSTRING_INDEX', sequelize.col('serial'), '-', 1)), 'first_letter']
            ]
        })
        .then(results => {
            const uniqueLettersCount = results.map(i => {
                return petType2Text[i.getDataValue("first_letter")]
            });
            console.log('不同字母的种类数量：', uniqueLettersCount);
            return uniqueLettersCount
        })
        .catch(error => {
            console.error('查询数据时出错：', error);
            return error
        });
    return ins
}