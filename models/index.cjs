// const sequelize = require('./db.cjs');
// const md5 = require("md5")
// console.log(md5("12354654651"));
// (async function (){

//     try {
//         // 测试链接
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })()
const {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAdminById,
    login,
    getRank,
    signIn,
    getTel
} = require("../services/adminServes.cjs")
// const Admin = require('./admin.cjs')
// const ins = Admin.build({
//     uTel:"abc",
//     uPwd:"123456",
//     uName:"test"
// })
// ins.save().then(()=>{
//     console.log("ok++");
// })
// addAdmin({
//     cTel: "18580528916",
//     uName: "ccc2",
//     uRank: "0001",
//     uPwd: "123456",
//     uTel: '18580528920',
//     uBirth: "2000-08-01",
//     uDep: "0"
// }).then(r => {
//     console.log(r);
// })
// updateAdmin({uName:"ccc",uTel:"3219",uPwd:"123456",adminTel:'1234567888888'}).then(r=>{
//     console.log(r);
// })
deleteAdmin({cTel: "18580528916",uTel:"18580528913"}).then(r=>{
        console.log(r);
    })
// login("3211","123456A").then(r=>{console.log(r);})
// 注册一个账号
// signIn({uRank:"0001",uPwd:"123",uName:'test1',uTel:"18580528916",uBirth:"2000-08-01",uDep:"0"}).then((r)=>{
//     console.log(r);
// })
// getAdminById("3211")
// login({uTel:'3218',uPwd:'12345'}).then((r)=>{
//     console.log(r);
// })
// getRank("18580528913").then((r)=>{
//     console.log(r);
// })
// getTel("18580528910").then((r)=>{
//     console.log(r);
// })