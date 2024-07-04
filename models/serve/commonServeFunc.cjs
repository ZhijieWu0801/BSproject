const Models = require("./servicesComon.cjs")
const {
    petType2Text,
    petText2Type
} = require("../serve/common/const.cjs")
const {
    v4: uuidv4
} = require('uuid');
const fs = require('fs');
// const uuid = uuidv4();
// console.log(uuid);

// const petType2Text = {
//     M: "猫",
//     D: "狗"
// }
// const petText2Type = {
//     "猫": "M",
//     "狗": "D"
// }






const SecretId = "AKIDliSxFNL6oLn466tWw7XosocHm4B5nKfn";
const SecretKey = "Rkyzut9LaospbCsRoGk5EF984wiMr9HM";


const COS = require('cos-nodejs-sdk-v5');
// const express = require('express');
// const multer = require('multer');

// const app = express();

// 配置 COS SDK
const cos = new COS({
    SecretId,
    SecretKey,
});

// 配置 multer 来处理文件上传
// const upload = multer({ dest: 'uploads/' });
exports.upload = (fileName, fileData) => {
    const params = {
        Bucket: 'bs-img-cos-1317764751',
        Region: 'ap-beijing',
        Key: 'img/' + fileName + ".png",
        Body: fileData,
    };

    cos.putObject(params, (err, data) => {
        if (err) {
            console.error(err);
            return err
        } else {
            console.log("上传成功");
            return "上传成功"
        }
    });
}
exports.getImg = async (path) => {
    // console.log(111);
    if (!path) {
        return null
    }
    // console.log(123);
    const name = path.replace(/\\/g, "/") + '.png'
    const data = await fs.promises.readFile(name);
    return `data:image/png;base64,${data.toString('base64')}`


}
// 处理图片上传的 POST 请求
// app.post('/upload', upload.single('image'), (req, res) => {
//   const params = {
//     Bucket: 'bs-img-cos-1317764751',
//     Region: 'ap-beijing',
//     Key: 'img/' + req.file.originalname,
//     Body: req.file.buffer,
//   };

//   cos.putObject(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.send('Image uploaded successfully!');
//     }
//   });
// });







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
            (data[key] = obj[item])
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
    obj.loginToken = this.getToken()
    Models.Admin.create(obj)
    return {
        "mes": "成功添加"
    }
}


/**
 * 通过电话获取个人信息
 * 第二个参数代表返回的时实例还是json转换后的对象，默认返回json对象，传入true返回实例
 * 第三个区分用户和管理员 1用户 2管理员
 * @param {String} Tel 
 * @returns 查询结果
 */
exports.getInfoByTel = async (Tel, user = 100, not = false) => {
    let ins;
    console.log(user);
    if (user == 1) {
        console.log(10);
        ins = (await Models.PetMaster.findOne({
            where: {
                MTel: Tel
            }
        }))

    }
    else if (user == 2) {
        console.log(20);
        ins = (await Models.Admin.findOne({
            where: {
                ATel: Tel,
            }
        }))
    } else {
        console.log(30);
        ins =
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
    }
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
    if (!await this.getInfoByTel(obj.tel, obj.user)) {
        console.log("未找到用户");
        return {
            msg: "未找到用户",
            isSuccessful: false,
            state: 404
        }
    }
    obj.pwd = Models.md5(obj.pwd)
    let ins;
    if (obj.user == 1) {
        ins = await Models.PetMaster.findOne({
            where: {
                MTel: obj.tel,
                MPwd: obj.pwd
            }
        })
    }
    else if (obj.user == 2) {
        ins = await Models.Admin.findOne({
            where: {
                ATel: obj.tel,
                APwd: obj.pwd
            }
        })
    } else {
        ins = await Models.Admin.findOne({
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
    }
    return ins ? {
        data: ins,
        msg: "登陆成功",
        isSuccessful: true,
        state: 200
    } : {
        data: {},
        msg: "密码错误",
        isSuccessful: false,
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
const {
    log
} = require("@tensorflow/tfjs");

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

// 获取一个随机的数
/**
 * 
 * @returns 数据格式 YYYYMMDDHHMMSSXXXX
 */
exports.getRandomNum = () => {
    const randomNum = `${String((new Date()).getUTCFullYear()).padStart(2,"0") }${String((new Date()).getUTCMonth()+1).padStart(2,"0") }${String((new Date()).getUTCDay()).padStart(2,"0") }${String((new Date()).getUTCHours()).padStart(2,"0") }${String((new Date()).getUTCMinutes()).padStart(2,"0") }${String((new Date()).getUTCSeconds()).padStart(2,"0") }${String(Math.floor(Math.random()*10000)).padStart(4,"0") }`
    console.log(randomNum);
    return randomNum
}

/**
 * 获取一个随机的token
 * @return token
 */

exports.getToken = () => {
    // const RandomNum = `${(~~(Math.random() * Math.pow(10,10))).toString(36)}${(~~(Math.random() * Math.pow(10,10))).toString(36)}`
    const uuid = uuidv4()
    console.log(uuid);
    return uuid
}

// this.getToken()