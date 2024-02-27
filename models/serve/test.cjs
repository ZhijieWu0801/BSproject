const func = require("./commonServeFunc.cjs")
// console.log(func,func.func.createAdmin);
func.func.createAdmin({
    ATel:"12345678900",
    AName:"11111",
    APwd:"123456",
}).then(i=>{
    console.log(i);
})