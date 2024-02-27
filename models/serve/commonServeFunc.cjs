const Models = require("./servicesComon.cjs")
async function createAdmin(obj){
    const isExist = await getAdminByTel(obj.ATel)
    // console.log(isExist);
    if(!!isExist) {
        return {"mes":"手机号已被占用"}
    } 
    obj.APwd = Models.md5(obj.APwd)
    Models.Admin.create(obj)
    return {"mes":"成功添加"}
    
}

// 通过电话获取个人信息
function getInfoByTel(){}

// 通过电话获取管理员信息
async function getAdminByTel(ATel){
    const ins = await Models.Admin.findOne({
        where:{
            ATel
        }
    })
    // console.log(ins?.toJSON());
    return ins?.toJSON()
}

// 通过电话获取管理员权限
function getLimitByTel(){

}
const func = {
    createAdmin:createAdmin,
    getInfoByTel,
    getAdminByTel,
    getLimitByTel,
}

exports.func = func