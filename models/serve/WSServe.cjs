const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 3001
});
const clients = []; // 用来存储连接到服务器的用户
const Admin = []; //存储管理员
wss.on('connection', function connection(ws) {
    console.log('客户端已连接');

    // 将新连接的客户端加入到 clients 数组中

    ws.on('message', function incoming(message) {
        // 二进制数据（示例）
        const binaryData = new Uint8Array(message);

        // 创建一个 TextDecoder 对象
        const decoder = new TextDecoder('utf-8');

        // 解码二进制数据并转换为字符串
        const utf8String = decoder.decode(binaryData);
        // console.log(JSON.parse(utf8String), 9999);
        const messageObj = JSON.parse(utf8String);
        const standing = messageObj.standing;
        const userId = messageObj.userId;
        const messages = messageObj.message;
        console.log('收到消息:', messageObj, standing);
        if (standing === 0 && !findWsById(Admin, userId, ws)) {
            console.log("添加到Admin");
            Admin.push({
                ws,
                id: messageObj.userId
            });
        }
        if (standing === 100 && !findWsById(clients, userId, ws)) {
            console.log("添加到yonghu");
            clients.push({
                ws,
                id: messageObj.userId
            });

        }



        if (standing === 100) {//100代表用户
            toAdmin(message, Admin)
        }
        if (standing === 0) {
            toUser(message, clients)
        }
        // let postUser
        // if (standing === 0) {
        //     postUser = findWsById(Admin, userId, ws);

        // }
        // if (standing === 100) {
        //     postUser = findWsById(clients, userId, ws);
        //     // broadcast(clients,111)
        // }
        // // console.log("postUser==>",postUser);
        // sendMsg(ws, messages, userId);
        // // broadcast("已收到");
        // broadcastOne(ws, "收到");
    });

    ws.on('close', function () {
        console.log('客户端已断开连接');
        const user = findWS(clients, ws);
        const admin = findWS(Admin, ws);
        // 在用户端断开连接时，将其从 clients 数组中移除
        // const index1 = clients.indexOf(ws);
        if (!!user) {
            console.log("删除用户", user);
            clients.splice(user.index, 1);
        }
        // 在管理员端断开连接时，将其从 Admin 数组中移除
        // const index2 = Admin.indexOf(ws);
        if (!!admin) {
            console.log("删除管理员", admin);
            Admin.splice(admin.index, 1);
        }
    });
});

function findWS(arr, ws) {
    let user = {}
    // console.log("arr", arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].ws === ws) {
            user = {
                item: arr[i],
                index: i
            }
            return
        }
    }
    // console.log(user);
    return user
}

function findWsById(arr, id) {
    let ws = null;
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i].id, id);
        if (arr[i].id == id) {
            ws = arr[i].ws;
            break
        }
    }
    return ws
}

// 发送消息给所有客户端的函数
// 如果一个客户端发送消息后，其他的客户端都能收到服务器返回的消息，则为服务器主动给客户端发了消息
function broadcast(arr, data) {
    const array = arr
    // console.log(array);
    array.forEach(client => {
        // console.log(client,6666);
        client.ws.send(data);
    });
}

// 发送消息给发消息过来的客户端的函数
function broadcastOne(ws, message) {
    ws.send(message);
}

function sendMsg(ws, message, postUserId) {

    // const isYonghu = clients.indexOf(ws) !== -1;
    // const isAdmin = Admin.indexOf(ws) !== -1;
    const isYonghu = findWsById(clients, postUserId);
    const isAdmin = findWsById(Admin, postUserId);
    // console.log(isYonghu, isAdmin,clients ,Admin);
    // console.log(!!isYonghu, !!isAdmin);
    const data = JSON.stringify({
        message,
        postUserId
    })
    // console.log(message, "========")
    if (isYonghu) {
        broadcast(Admin, "data")
    } else if (isAdmin) {
        broadcast(clients, "data");

    }

}



function toAdmin(message, Admin) {
    /*
    用户消息
    {
      userId: '12222222222223333',
      standing: 100,
      content: '这是来自用户的消息',
      timestamp: 1716111361891,
      message: {
        result: true,
        petSerial: 'M-202404010742212521',
        masterTel: '12222222222223333',
        masterId: '12222222222223333'
      }
    }
    */

    // 二进制数据（示例）
    const binaryData = new Uint8Array(message);

    // 创建一个 TextDecoder 对象
    const decoder = new TextDecoder('utf-8');

    // 解码二进制数据并转换为字符串
    const utf8String = decoder.decode(binaryData);
    console.log(utf8String, 999);
    const obj = JSON.parse(utf8String);

    console.log("toAdmin===>", obj);
    const reqMessage = JSON.stringify(obj.message);
    Admin.forEach(admin => {
        admin.ws.send(reqMessage)
    })
}


function toUser(message, clients) {
    /*{
        管理员的 消息
      userId: '18580528913',
      standing: 0,
      content: '这是来自管理员的消息',
      timestamp: 1716111667445,
      message: {
        result: true,
        petSerial: 'M-202405051113560099',
        masterTel: '11111111111122',
        masterId: 36
      }
    } */
    // 二进制数据（示例）
    const binaryData = new Uint8Array(message);

    // 创建一个 TextDecoder 对象
    const decoder = new TextDecoder('utf-8');

    // 解码二进制数据并转换为字符串
    const utf8String = decoder.decode(binaryData);
    
    const obj = JSON.parse(utf8String);
    // const reqMessage = JSON.stringify(utf8String.message);
    console.log(obj,111122);
    if (!obj.message) {
        return
    }
    let userWs = null;
    for (let i = 0; i < clients.length; i++) {
        console.log(clients,456);
        if (clients[i].id === obj.message.masterTel) {
            userWs = clients[i].ws;
            break
        }
    }
    const reqMessage = JSON.stringify({
        adminId: obj.userId,
        message: obj.message
    })
    console.log("toUser===>", reqMessage);
    console.log(userWs)
    userWs && userWs.send(reqMessage);
}

// function adminToServer(message,clients){

// }