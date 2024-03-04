const {
    app
} = require('./servicesComon.cjs')
const conmmonServe = require("./commonServeFunc.cjs")
const adminServe = require("./adminServe/adminServe.cjs")
const masterServe = require("./masterServe/masterServe.cjs")
const petServe = require("./petServe/petServe.cjs")
app.all("/api/admin/createAdmin", async (req, res) => {
    const ins = await adminServe.createAdmin(req.query)
    console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})


app.all("/api/login", async (req, res) => {
    const ins = await conmmonServe.login(req.query)
    console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})


app.all("/api/master/signIn", async (req, res) => {
    const ins = await masterServe.signIn(req.query)
    console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})


app.all("/api/pet/addPet", async (req, res) => {
    const ins = await petServe.addPet(req.query)
    console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/getPetByMasterTel", async (req, res) => {
    const ins = await petServe.getPetByMasterTel(req.query.tel)
    const typeofIns = typeof ins
    console.log(req.query.tel, typeofIns);
    res.send({
        data: ins,
        msg: typeofIns !== "string" ? (typeofIns === "object" && ins.length ? "查询成功" : "用户无宠物") : ins,
        query: req.query
    })
})

app.all("/api/pet/deletPet", async (req, res) => {
    const end = req.query.serial.length - 1
    const split = req.query.serial.substring(1, end).split(',')
    const length = split.length
    let ins = ''
    if (length > 1) {
        ins = await petServe.deletPet(split)
    } else {
        ins = await petServe.deletOnePet(req.query.serial)
    }
    console.log(req.query);
    console.log(ins);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})

app.all("/api/pet/updatePet", async (req, res) => {
    let ins = await petServe.updatePet(req.query)
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})