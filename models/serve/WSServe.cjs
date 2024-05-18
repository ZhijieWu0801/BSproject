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
        const standing = JSON.parse(utf8String).standing;
        const userId = JSON.parse(utf8String).userId;
        console.log('收到消息:', utf8String, JSON.parse(utf8String), standing);
        if (standing === 0 && findWS(Admin, ws, userId)) {
            console.log("添加到Admin");
            Admin.push({
                ws,
                id: JSON.parse(utf8String).userId
            });
        }
        if (standing === 100 && findWS(clients, ws)) {
            console.log("添加到yonghu");
            clients.push({
                ws,
                id: JSON.parse(utf8String).userId
            });

        }
        let postUser
        if (standing === 0) {
            postUser = findWS(Admin, ws);
        }
        if (standing === 100) {
            postUser = findWS(clients, ws);
        }
        console.log(postUser);
        sendMsg(ws, utf8String, postUser?.ws);
        // broadcast("已收到");
        broadcastOne(ws, "收到");
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
    console.log("arr", arr);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].ws === ws) {
            user = {
                item: arr[i],
                index: i
            }
            return
        }
    }
    console.log(user);
    return user
}

function findWsById(arr, id) {
    let ws = null;
    for (let i = 0; i < arr.length; i++) {
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
    console.log(array);
    array.forEach(client => {
        client.send(data);
    });
}

// 发送消息给发消息过来的客户端的函数
function broadcastOne(ws, message) {
    ws.send(message);
}

function sendMsg(ws, message, postUserId) {
    const isYonghu = clients.indexOf(ws) !== -1;
    const isAdmin = Admin.indexOf(ws) !== -1;
    const data = {
        message,
        postUserId
    }
    if (isYonghu) {
        broadcast(Admin, data)
    } else if (isAdmin) {
        broadcast(clients, data);

    }

}