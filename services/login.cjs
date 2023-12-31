const Admin = require("../models/admin.cjs")
exports.login = async function  (loginId, loginPwd)  {
    const login = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    })
    if (login.loginPwd === loginPwd && login.loginId === loginId) {
        return login.toJSON()
    }
    return null
}