const func = require("./commonServeFunc.cjs")
const adminFun = require("./adminServe/adminServe.cjs")
const petFun = require("./petServe/petServe.cjs")
const masterFun = require("./masterServe/masterServe.cjs")
// console.log(func,func.func);
// func.createAdmin({
//     ATel:"12345678900",
//     AName:"11111",
//     APwd:"123456",
// }).then(i=>{
//     console.log(i);
// })
// 添加管理员
// adminFun.createAdmin({
//     ATel: "12345123",
//     AName:"bbb",
//     APwd:"12345",
//     Limit:1
// }).then(i => {
//     console.log(i);
// })


// adminFun.getLimitByTel(12345123).then(r=>console.log(r))
// func.login({tel:'12345123',pwd:'12345'})
// masterFun.signIn({tel:'1230451230',pwd:'12345',name:'signIn'})
// func.getIdByTel(12345123)
petFun.getPetByMasterTel(1230451230).then(r=>{
    console.log(r);
})
// petFun.deletPet(["D0001","D0002","D0003"]).then(r=>{
//     console.log(r);
// })

