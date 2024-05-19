const fs = require('fs');
const Models = require("../servicesComon.cjs")
const commonServeFunc = require("../commonServeFunc.cjs")
const {
    base64ToFile,
    baseUrl
} = require("../../../savefile.cjs")
const FileMap = {
    name: "PName",
    master: "PetMaster",
    species: "species",
    serial: "serial",
    img_B: "PetImg",
}
const {
    petText2Type,
    petText2Type2,
    petType2Text
} = require("../common/const.cjs")

const request = require('request')
const AK = "ceFAXkERb8mNh8oQjqJu2qKq";
const SK = "9ykC2KmFOJgp1ZQgAFlVstjKQ90MZamA";
/**
 * 使用 AK，SK 生成鉴权签名（Access Token）
 * @return string 鉴权签名信息（Access Token）
 */
function getAccessToken() {

    let options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + AK + '&client_secret=' + SK,
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response) => {
            if (error) {
                reject(error)
            } else {
                resolve(JSON.parse(response.body).access_token)
            }
        })
    })
}
const tocken = getAccessToken();


exports.search = async (base64, res) => {
    // console.log(base64);
    options = {
        'method': 'POST',
        'url': 'https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/similar/search?access_token=' + await getAccessToken(),
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'image': base64,
            'pn': '0',
            'rn': '10', //拿开始的10个，最相似的10个
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        res.send({
            data: JSON.parse(response.body)
        })
    });
}

// function base64ToFile(base64Data, filePath) {
//     // 将base64数据解码
//     const dataBuffer = Buffer.from(base64Data, 'base64');

//     // 将数据写入文件
//     fs.writeFileSync(filePath, dataBuffer);

//     console.log('文件已保存到：', filePath);
// }

/**
 * 通过主人的电话查询名下的所有宠物
 * @param {String} tel 
 * @returns 宠物列表
 */
exports.getPetByMasterTel = async (tel) => {
    // try {

    const PetMasterId = await commonServeFunc.getIdByTel(tel);
    if (!PetMasterId) {
        return "未找到用户"
    }
    const ins = await Models.Pet.findAll({
        include: [{
            model: Models.PetMaster,
            as: "petMaster"
        }],
        where: {
            PetMasterId
        }
    }).then((pets) => {
        const data = pets.map(pet => {
            const Json = pet && pet.toJSON();
            return Json
        })
        return data
    })
    // } catch (error) {
    //     console.log(error);
    // }
    // try {

    const petData = await Promise.all(
        ins.map(async (element) => {
            if (element.PetImg) {
                element.img = await commonServeFunc.getImg(element.PetImg);
            }
            return element;
        })
    );
    console.log(petData, 123);
    return petData.length ? petData : "未找到用户的宠物"
    // } catch (error) {
    //     console.log(error);
    // }
}

// exports.getPetBySerial = async (serial) => {
//     console.log(111);
//     // return 
//     const ins = await Models.Pet.findOne({
//         where: {
//             serial: serial
//         }
//     })
//     // const path = baseUrl + "\\" + serial;
//     if (!ins) {
//         return null
//     }
//     const data = ins.toJSON();
//     const petData = await Promise.all(
//         data.map(async (element) => {
//             if (element.PetImg) {
//                 element.img = await commonServeFunc.getImg(element.PetImg);
//             }
//             return element;
//         })
//     );
//     return petData
// }

/**
 * 添加一个宠物
 * @param {Object} obj {species,serial,[name,master]} 
 * @returns 创建结果
 */
exports.addPet = async (obj) => {
    // console.log(petText2Type[obj.species], obj);
    const aaa = obj.img.split(",")[1]
    img = Buffer.from(aaa, 'base64');
    serial = `${petText2Type[obj.species]}-${commonServeFunc.getRandomNum()}`
    obj.img_B = baseUrl + `\\` + serial;
    const data = commonServeFunc.isMap(FileMap, obj);
    data.serial = serial;
    data.img = baseUrl + `\\` + serial;
    // console.log(data, 666);
    const ins = await Models.Pet.create(data);
    if (ins) {
        base64ToFile(img, serial);
        // console.log(tocken, 556666);
        console.log(img);
        let options = {
            'method': 'POST',
            'url': 'https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/similar/add?access_token=' + await getAccessToken(),
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // image 可以通过 getFileContentAsBase64("C:\fakepath\微信图片_20231009164814.png") 方法获取,
            form: {
                'image': aaa, //base64数据
                'brief': `{"serial":${serial}}`
            }
        };
        console.log(1122);
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    }
    // if(ins){
    const res = commonServeFunc.upload(data.serial, obj.img);
    console.log(res, 777);
    // }
    return ins && ins.toJSON()
}


/**
 * 删除一个宠物
 * 传入宠物编号
 * @param {String} obj {serial} 
 * @returns 删除结果
 */
exports.deletOnePet = async (serial) => {
    const isActive = await this.getPetBySerial({
        serial
    })
    if (!isActive) {
        return "宠物编号有误"
    }
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
    try {

        const ins = await Models.Pet.findOne({
            where: {
                serial
            },
            include: {
                model: Models.PetMaster,
                as: 'petMaster'
            }
        })
        if (not) {
            return ins
        }
        const data = ins && ins.toJSON();
        // console.log(data);
        const petData =
            data.PetImg &&
            (data.img = await commonServeFunc.getImg(data.PetImg))
        // console.log(petData);
        return data
    } catch (error) {
        console.log(error);
    }
}


/**
 * 通过类型获得宠物列表
 * @param {*} obj {species，[page,pageSize]}
 * @param {*} not 是否返回原始数据，默认不返回
 * @returns 
 */
exports.getAllPetByType = async (obj, not = false) => {
    // console.log(obj, petText2Type2[obj.species], 2222);
    try {
        //所有的长度
        const totalIns = await Models.Pet.findAll({
            where: {
                species: petType2Text[petText2Type2[obj.species]],
            }
        })
        // console.log(totalIns);
        // const total = totalIns.length;
        const ins = await Models.Pet.findAll({
            where: {
                species: petType2Text[petText2Type2[obj.species]],
            },
            limit: obj.pageSize ? +obj.pageSize : null,
            offset: obj.pageSize && obj.page ? (+obj.page - 1) * +obj.pageSize : null,
            include: {
                model: Models.PetMaster,
                as: 'petMaster'
            }
        })
        if (!ins) {
            // console.log(ins,555555);
            return "未查询到"
        }
        if (not) {
            console.log(ins, 6666);
            return {
                ins: ins,
                total: totalIns.length
            }
        }
        // const data = ins.toJSON()
        // console.log(ins, ins.toJSON());
        const petData = await Promise.all(
            ins.map(async (element) => {
                const item = element.toJSON();
                if (item.PetImg) {
                    item.img = await commonServeFunc.getImg(item.PetImg);
                }
                return item;
            })
        );
        // console.log(petData, 777);
        return {
            ins: petData,
            total: totalIns.length
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @returns 获取站内所有宠物
 */
exports.getAllPets = async (obj) => {
    // console.log(obj);
    try {

        const ins = await Models.Pet.findAll({
            limit: obj.pageSize ? +obj.pageSize : null,
            offset: obj.pageSize && obj.page ? (+obj.page - 1) * +obj.pageSize : null,
        });
        // console.log(ins);
        if (!ins || ins.length === 0) {
            return "站内无宠物"
        }
        const petData = await Promise.all(
            ins.map(async (element) => {
                const json = element.toJSON();
                if (json.PetImg) {
                    json.img = await commonServeFunc.getImg(json.PetImg);
                }
                return json;
            })
        );

        return petData;
    } catch (error) {
        console.log(error);
    }
}