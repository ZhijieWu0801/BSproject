//有关admin表的操作
const Admin = require("../models/admin.cjs")
exports.addAdmin = (obj)=>{
    return Admin.create(obj)
}
exports.deleteAdmin = (obj)=>{
    return Admin.destroy({
        where:{id:obj.id}
    })
}
exports.updateAdmin = (obj)=>{
    return Admin.update(obj,{
        where:{
            id:obj.id
        }
    })
}