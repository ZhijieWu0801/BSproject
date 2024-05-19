const {
    app
} = require('./servicesComon.cjs')
const commonServe = require("./commonServeFunc.cjs")
const adminServe = require("./adminServe/adminServe.cjs")
const masterServe = require("./masterServe/masterServe.cjs")
const petServe = require("./petServe/petServe.cjs")
const cos = require("./petServe/cos.cjs")
const WSServe = require("./WSServe.cjs")

app.all("/api/admin/createAdmin", async (req, res) => {
    const ins = await adminServe.createAdmin(req.query)
    // console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/admin/deleteAdminByTel", async (req, res) => {
    console.log(req.query);
    let ins;
    try {
        ins = await adminServe.deleteAdminByTel(req.query);
    } catch (error) {
        ins = error
    }
    res.send({
        msg: ins,
        query: req.query
    })

})

app.all("/api/admin/updataAdmin", async (req, res) => {
    let ins;
    try {
        ins = await adminServe.updataAdmin(req.query)
    } catch (error) {
        ins = error
    }
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/admin/updataAdminTel", async (req, res) => {
    let ins;
    try {
        ins = await adminServe.updataAdminTel(req.query)
    } catch (error) {
        ins = error
    }
    res.send({
        msg: ins,
        query: req.query
    })
})

app.all("/api/admin/getAdminByTel", async (req, res) => {
    console.log(req.query);
    let ins;
    try {
        ins = await commonServe.getAdminByTel(req.query.tel)
    } catch (error) {
        ins = error
    }
    res.send({
        data: ins,
        query: req.query
    })
})
app.all("/api/admin/getAllAdmin", async (req, res) => {
    console.log(req.query);
    let ins;
    try {
        ins = await adminServe.findAllAdmin(req.query)
    } catch (error) {
        ins = error
    }

    res.send({
        data: ins,
        query: req.query
    })
})
app.all("/api/pet/uniqueLettersCount", async (req, res) => {
    // 查询表中不同字母的数量
    let ins;
    try {
        ins = await commonServe.uniqueLettersCount()
    } catch (error) {
        ins = error
    }

    res.send({
        data: ins,
        query: req.query
    })
})
















app.all("/api/login", async (req, res) => {
    let ins;
    try {
        ins = await commonServe.login(req.query)
    } catch (error) {
        ins = error;
    }
    // console.log("---",commonServe.getToken());
    // console.log(req.query, ins);
    res.send({
        ...ins,
        query: req.query,
        // isSuccessful: !!ins
    })
})














app.all("/api/master/signIn", async (req, res) => {
    let ins;
    try {
        ins = await masterServe.signIn(req.query)
    } catch (error) {
        ins = error;
    }
    console.log(req.query);
    res.send({
        msg: ins,
        data: {
            isSuccessful: ins === "注册成功"
        },
        query: req.query
    })
})

app.all("/api/master/updateMaster", async (req, res) => {
    let ins;
    try {
        ins = await masterServe.updateMaster(req.query)
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})

app.all("/api/master/deleteMaster", async (req, res) => {
    console.log(req.query);
    let ins;
    try {
        ins = await masterServe.deleteMaster(req.query)
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})

app.all("/api/master/upDataMasterTel", async (req, res) => {
    let ins;
    try {
        ins = await masterServe.upDataMasterTel(req.query)
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})


app.all("/api/master/getMasterByTel", async (req, res) => {
    let ins;
    try {
        ins = await masterServe.getMasterByTel(req.query.tel)
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: ins,
        msg: ins.msg,
        query: req.query
    })
})
app.all("/api/master/linkPet", async (req, res) => {
    let ins;
    try {
        ins = await masterServe.linkPet(req.query)
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: {
            code: ins.code
        },
        msg: ins.msg,
        query: req.query
    })
})


app.all("/api/master/disconnectPetLink", async (req, res) => {
    let ins;
    try {
        ins = await masterServe.disconnectPetLink(req.query)
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: {
            code: ins.code
        },
        msg: ins.msg,
        query: req.query
    })
})









app.all('/upload', async (req, res) => {
    // const url = await cos.putImgAndGetUrl(res, req.query.serial, req.query.img)
    // console.log(url, 456666);
    // res.send({
    //     img: url
    // })
})



app.all("/api/pet/getImg", async (req, res) => {
    const ins = await commonServe.getImg(req, res)

        res.send({
            img: ins
        })
})
/**
 * 相似图片检索
 */
app.all("/api/pet/search", async (req, res) => {
    // console.log(req);
    const ins = await petServe.search(req.query.img, res).then(r => {

        // res.send({
        //     img: r
        // })
    })
})
app.all("/api/pet/addPet", async (req, res) => {
    // const masterActive = 
    let ins;
    try {
        ins = await petServe.addPet(req.query)
    } catch (error) {
        ins = error;
    }
    // console.log(req.query);
    res.send({
        msg: ins,
        query: req.query
    })
})
app.all("/api/pet/getAllPets", async (req, res) => {
    // const masterActive = 
    let ins;
    try {
        ins = await petServe.getAllPets(req.query)
    } catch (error) {
        ins = error;
    }
    // console.log(req.query, ins);
    res.send({
        data: ins,
        query: req.query
    })
})

app.all("/api/pet/getPetByMasterTel", async (req, res) => {
    // console.log(1111);
    let ins;
    try {
        ins = await petServe.getPetByMasterTel(req.query.tel)
    } catch (error) {
        ins = error;
    }
    const typeofIns = typeof ins
    // console.log(req.query.tel, typeofIns);
    res.send({
        data: ins,
        msg: typeofIns !== "string" ? (typeofIns === "object" && ins.length ? "查询成功" : "用户无宠物") : ins,
        query: req.query
    })
})
app.all("/api/pet/getPetBySerial", async (req, res) => {
    let ins;
    try {
        ins = await petServe.getPetBySerial(req.query.serial)
    } catch (error) {
        ins = error;
    }
    const typeofIns = typeof ins
    // return 
    // console.log(req.query.tel, typeofIns, JSON.stringify(ins));
    res.send({
        data: ins,
        msg: typeofIns !== "string" ? (typeofIns === "object" && ins ? "查询成功" : "站内无该宠物") : ins,
        query: req.query
    })
})


app.all("/api/pet/getAllPetByType", async (req, res) => {
    // console.log(1111);
    let ins;
    try {
        ins = await petServe.getAllPetByType(req.query)
    } catch (error) {
        ins = error;
    }
    const typeofIns = typeof ins
    // console.log(ins,typeofIns,ins.length);
    res.send({
        data: ins.ins,
        total: ins.total,
        msg: typeofIns !== "string" ? (typeofIns === "object" && ins.total ? "查询成功" : "无该类型宠物") : ins,
        query: req.query
    })
})

app.all("/api/pet/deletPet", async (req, res) => {
    const end = req.query.serial.length - 1
    const split = req.query.serial.substring(1, end).split(',')
    const length = split.length
    let ins = ''
    try {
        if (length > 1) {
            ins = await petServe.deletPet(split)
        } else {
            ins = await petServe.deletOnePet(req.query.serial)
        }
    } catch (error) {
        ins = error;
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
    let ins;
    try {
        ins = await petServe.updatePet(req.query);
    } catch (error) {
        ins = error;
    }
    console.log(ins, req.query);
    res.send({
        data: '',
        msg: ins,
        query: req.query
    })
})


const axios = require('axios');
app.all("/api/serve/PY", async (req, res) => {
    const postData = {
        image: req.query.image,
    };
    const url = 'http://127.0.0.1:5000/api/hello'
    axios.post(url, postData)
        .then(response => {
            console.log('Response:', response.data);
            res.send({
                msg: response.data
            })
        })
        .catch(error => {
            console.error('Error:', error.message);
            res.send({
                msg: error.message
            })
        });
})