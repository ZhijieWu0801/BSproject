const express = require('express')
const app = express()
// const {
//     addAdmin,
//     updateAdmin,
//     deleteAdmin,
//     login,
//     signIn,
// } = require("./adminServes.cjs")
app.listen(3000, () => { 
    console.log("监听3000");
})
module.exports = {
    app
}