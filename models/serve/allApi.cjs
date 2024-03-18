const {
    app
} = require('./servicesComon.cjs')
const commonServe = require("./commonServeFunc.cjs")
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

app.all("/api/admin/deleteAdminByTel", async (req, res) => {
    const ins = await adminServe.deleteAdminByTel(req.query.tel)
    res.send({
        msg: ins,
        query: req.query
    })

})

app.all("/api/admin/updataAdmin", async (req, res) => {
    const ins = await adminServe.updataAdmin(req.query)
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/admin/updataAdminTel", async (req, res) => {
    const ins = await adminServe.updataAdminTel(req.query)
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/admin/getAdminByTel", async (req, res) => {
    const ins = await commonServe.getAdminByTel(req.query.tel)
    res.send({
        msg: ins,
        query: req.query
    })
})
















app.all("/api/login", async (req, res) => {
    const ins = await commonServe.login(req.query)
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

app.all("/api/master/updateMaster", async (req, res) => {
    let ins = await masterServe.updateMaster(req.query)
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})

app.all("/api/master/deleteMaster", async (req, res) => {
    console.log(req.query);
    let ins = await masterServe.deleteMaster(req.query)
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})

app.all("/api/master/upDataMasterTel", async (req, res) => {
    let ins = await masterServe.upDataMasterTel(req.query)
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})













app.all("/api/pet/addPet", async (req, res) => {
    // const masterActive = 
    const ins = await petServe.addPet(req.query)
    console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/pet/getPetByMasterTel", async (req, res) => {
    console.log(1111);
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


// const aaa = require("../../testPY.cjs")
const axios = require('axios');
app.all("/api/serve/PY", async (req, res) => {
    const postData = {
        key1: 'value1',
        key2: 'value2',
    };
const url = 'http://127.0.0.1:5000/api/hello'
    axios.post(url, postData)
        .then(response => {
            console.log('Response:', response.data);
            res.send({
                msg:response.data
            })
        })
        .catch(error => {
            console.error('Error:', error.message);
            res.send({
                msg:error.message
            })
        });
})