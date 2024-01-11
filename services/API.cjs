const express = require('express')
const app = express()
const {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    login,
    signIn,
} = require("./adminServes.cjs")
app.listen(3000, () => { 
    console.log("监听3000");
})
app.all('/addAdmin', async (req, res) => {
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
app.all('/login', async (req, res) => {
    console.log('参数', req.query);
    try {
        const ins = await login({
            uPwd: req.query.uPwd,
            uTel: req.query.uTel,
        })
        try {
            const data = ins
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
            message: "账号或密码错误",
            data: {}
        })
    }
})
app.all('/signIn', async (req, res) => {
    console.log('参数', req.query);
    try {
        const ins = await signIn({
            uTel: req.query.uTel,
            uPwd: req.query.uPwd,
            uName: req.query.uName,
            uRank: req.query.uRank ? req.query.uRank : "",
            uBirth: req.query.uBirth ? req.query.uBirth : '',
            uDep: req.query.uDep ? req.query.uDep : ""
        })
        try {
            const data = ins
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
app.all('/deleteAdmin', async (req, res) => {
    console.log('参数', req.query);
    try {
        const ins = await deleteAdmin({
           cTel:req.query.cTel,
           uTel:req.query.uTel,
        })
        try {
            const data = ins
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
            message: ins,
            data: {}
        })
    }

    // console.log(111111);
})
// app.all('/updateAdmin', async (req, res) => {
//     console.log('参数', req.query);
//     // try {
//         const ins = await updateAdmin({
//             uTel: req.query.uTel,
//             uName: req.query.uName,
//             // uRank: req.query.uRank ? req.query.uRank : "",
//             // uPwd: req.query.uPwd?req.query.uPwd:'',
//             // uBirth: req.query.uBirth ? req.query.uBirth : '',
//             // uDep: req.query.uDep ? req.query.uDep : ""
//         })
//         // try {
//             const data = ins
//             res.send({
//                 status: 0,
//                 message: "okk",
//                 data
//             })
//         // } catch {
//             res.send({
//                 status: 0,
//                 message: ins,
//                 data: {}
//             })
//         // }
//     // } catch {
//         res.send({
//             status: 0,
//             message: "参数错误",
//             data: {}
//         })
//     // }

//     // console.log(111111);
// })
app.all('/updateAdmin', async (req, res) => {
    console.log('参数', req.query);
    try {
        const ins = await updateAdmin({
            uTel: req.query.uTel,
            cTel: req.query.cTel,
            uName: req.query.uName,
            // uRank: req.query.uRank ? req.query.uRank : "",
            // uPwd: req.query.uPwd?req.query.uPwd:'',
            // uBirth: req.query.uBirth ? req.query.uBirth : '',
            // uDep: req.query.uDep ? req.query.uDep : ""
        });

        const data = ins;
        res.setHeader('Content-Type', 'application/json'); // 设置头部
        res.send({
            status: 0,
            message: "okk",
            data
        });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json'); // 设置头部
        res.send({
            status: 0,
            message: error.message,
            data: {}
        });
    }
});
app.all('/updateOur', async (req, res) => {
    console.log('参数', req.query);
    try {
        const ins = await updateOur({
            uTel: req.query.uTel,
            uName: req.query.uName,
            // uRank: req.query.uRank ? req.query.uRank : "",
            // uPwd: req.query.uPwd?req.query.uPwd:'',
            // uBirth: req.query.uBirth ? req.query.uBirth : '',
            // uDep: req.query.uDep ? req.query.uDep : ""
        });

        const data = ins;
        res.setHeader('Content-Type', 'application/json'); // 设置头部
        res.send({
            status: 0,
            message: "okk",
            data
        });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json'); // 设置头部
        res.send({
            status: 0,
            message: error.message,
            data: {}
        });
    }
});