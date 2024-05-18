const fs = require('fs');
// const sharp = require('sharp');

exports.base64ToFile = (base64Data, fileName) => {
    // 将base64数据解码
    // console.log(base64Data,6666);
    // let _base64Data = base64Data.split(',')[1];
    // const dataBuffer = Buffer.from(_base64Data, 'base64');
    // console.log(123333);
    const baseUrl = __dirname + `\\AllImg`;
    // 将数据写入文件
    const aaa = fs.writeFileSync(baseUrl + '\\' + fileName + ".png", base64Data);
    console.log(aaa, 44555)
    console.log('文件已保存到：', baseUrl + "\\" + fileName);
}
exports.baseUrl = __dirname + `\\AllImg`
// this.base64ToFile()
// exports.getImg = async (name) => {
//     return fs.readFile(name)
// }
