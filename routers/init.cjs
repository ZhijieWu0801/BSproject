const {
    app
} = require("./servicesComon.cjs")

const {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    login,
    signIn,
    updateOur
} = require("../services/adminServes.cjs")
app.all('/api/admin/addAdmin', async (req, res) => {
    console.log('参数', req.query);
    try {
        const ins = await addAdmin({
            cTel: req.query.cTel,
            uName: req.query.uName,
            uRank: req.query.uRank ? req.query.uRank : "",
            uPwd: req.query.uPwd,
            uTel: req.query.uTel,
            uBirth: req.query.uBirth ? req.query.uBirth : '',
            uDep: req.query.uDep ? req.query.uDep : ""
        })
        try {
            const data = ins.toJSON()
            res.send({
                status: 0,
                message: "okk",
                data
            })
        } catch {
            res.send({
                status: 0,
                message: ins,
                data: {}
            })
        }
    } catch {
        res.send({
            status: 0,
            message: "参数错误",
            data: {}
        })
    }

    // console.log(111111);
})
app.all('/api/admin/login', async (req, res) => {
    console.log('参数', req.query);
    let data
    let status
    let message
    try {
        const ins = await login({
            uPwd: req.query.uPwd,
            uTel: req.query.uTel,
        })
        console.log(111, ins);
        if (ins instanceof Error) {
            status = -1,
                message = ins.message,
                data = {}
            return
        }
        data = ins;
        status = 0;
        message = "登陆成功"
    } catch (err){
        console.log(err);
        data='',
        status = -1;
        message = '登陆失败'
    } finally {
        res.send({
            status,
            message,
            data
        })
        // console.log(111, ins instanceof Error);

        res.end()
    }
})
app.all('/api/admin/signIn', async (req, res) => {
    console.log('参数', req.query);
    let data
    let status
    let message
    try {
        const ins = await signIn({
            uTel: req.query.uTel,
            uPwd: req.query.uPwd,
            uName: req.query.uName,
            uRank: req.query.uRank ? req.query.uRank : "",
            uBirth: req.query.uBirth ? req.query.uBirth : '',
            uDep: req.query.uDep ? req.query.uDep : ""
        })
        if (ins instanceof Error) {
            status = -1,
                message = ins.message,
                data = {}
            return
        }
        data = ins
        status = 0;
        message = "注册成功"
    } catch {} finally {
        res.send({
            status,
            message,
            data
        })
        res.end()
    }
})
app.all('/api/admin/deleteAdmin', async (req, res) => {
    console.log('参数', req.query);
    let data
    let status
    let message
    try {
        const ins = await deleteAdmin({
            cTel: req.query.cTel,
            uTel: req.query.uTel,
        })
        if (ins instanceof Error) {
            status = -1,
                message = ins.message,
                data = {}
            return
        }
        data = ''
        status = 0;
        message = ins
    } catch {} finally {
        res.send({
            status,
            message,
            data
        })
        res.end()
    }
})
app.all('/api/admin/updateAdmin', async (req, res) => {
    console.log('参数', req.query);
    let data
    let status
    let message
    try {
        const ins = await updateAdmin({
            uTel: req.query.uTel,
            cTel: req.query.cTel,
            uName: req.query.uName,
            ...(req.query.uRank && {
                uRank: req.query.uRank
            }),
            ...(req.query.uPwd && {
                uPwd: req.query.uPwd
            }),
            ...(req.query.uBirth && {
                uBirth: req.query.uBirth
            }),
            ...(req.query.uDep && {
                uDep: req.query.uDep
            })
        });
        if (ins instanceof Error) {
            status = -1,
                message = ins.message,
                data = {}
            return
        }
        data = {}
        status = 0;
        message = "更新成功"
    } catch {} finally {
        res.send({
            status,
            message,
            data
        })
        res.end()
    }
});
app.all('/api/admin/updateOur', async (req, res) => {
    console.log('参数', req.query);
    let data
    let status
    let message
    try {
        const ins = await updateOur({
            uTel: req.query.uTel,
            uName: req.query.uName,
            ...(req.query.uPwd && {
                uPwd: req.query.uPwd
            }),
            ...(req.query.uBirth && {
                uBirth: req.query.uBirth
            })
        });
        if (ins instanceof Error) {
            status = -1,
                message = ins.message,
                data = {}
            return
        }
        data = {}
        status = 0;
        message = "更新成功"
    } catch {} finally {
        res.send({
            status,
            message,
            data
        })
        res.end()
    }
});
app.all('/api/admin/addPet', async (req, res) => {

})

const FunctionList = require("../models/functionList.cjs")
app.all("/api/function/getfunctionList", async (req, res) => {
    const ins = await FunctionList.findAll()
    res.json({
        data: ins
    })
    res.end()
})
// 添加功能列表，用于sideNav
app.all("/api/function/addFunction", async (req, res) => {
    console.log(req.query);
    const hasExisted = await FunctionList.findOne({
        where: {
            functionName: req.query.functionName
        }
    })
    try {
        console.log(!!hasExisted && hasExisted.toJSON());
        if (hasExisted) {
            throw new Error("功能已存在")
        }
        const ins = await FunctionList.create({
            functionName: req.query.functionName
        })
        res.json({
            data: ins,
            message: "成功创建功能",
            state: 0
        })
        res.end()
    } catch (err) {
        res.send({
            data: {},
            message: err.message,
            state: -1
        })
        res.end()
    }
})