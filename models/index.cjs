// const sequelize = require('./db.cjs');
// (async function (){

//     try {
//         // 测试链接
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })()
const {addAdmin,updateAdmin,deleteAdmin} = require("../services/adminServes.cjs")
const { login } = require("../services/login.cjs")
// const Admin = require('./admin.cjs')
// const ins = Admin.build({
//     loginId:"abc",
//     loginPwd:"123456",
//     name:"test"
// })
// ins.save().then(()=>{
//     console.log("ok++");
// })
// addAdmin({name:"ccc",loginId:"321",loginPwd:"123456"}).then(r=>{
//     console.log(r);
// })
// updateAdmin({name:"ccc",loginId:"321",loginPwd:"123456",id:'1'}).then(r=>{
//     console.log(r);
// })
// deleteAdmin({id:1}).then(r=>{
//         console.log(r);
//     })
login("3211","123456A").then(r=>{console.log(r);})