// 注册
const Admin = require("../models/admin.cjs")
exports.signIn = async (obj)=>{
    const findId = await  Admin.findOne({
        where:{
            loginId:obj.loginId,
        }
    })
    if(findId && findId.loginId === obj.loginId){
        return console.log("账号已存在");
    }
    // const signIn = 
    await Admin.create({
        loginId:obj.loginId,
        loginPwd:obj.loginPwd,
        name:obj.name,
        adminTel:obj.adminTel
    })
    return findId
}