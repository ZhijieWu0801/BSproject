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
exports.getImg = async (name) => {
    return fs.readFile(name)
}


// exports.sharpImg = (file) => {
//     const options = {
//         width: 800,
//         height: 600,
//         fit: 'contain',
//         background: {
//             r: 255,
//             g: 255,
//             b: 255,
//             alpha: 1
//         },
//         quality: 80
//     };
//     // 执行图片压缩
//     sharp(Buffer.from(inputBase64.split(',')[1], 'base64'))
//         .resize(options.width, options.height, {
//             fit: options.fit,
//             background: options.background
//         })
//         .jpeg({
//             quality: options.quality
//         })
//         .toBuffer()
//         .then((data) => {
//             // 返回压缩后的base64数据
//             const compressedBase64 = `data:image/jpeg;base64,${data.toString('base64')}`;
//             console.log(compressedBase64);
//         })
//         .catch((err) => {
//             console.error('图片压缩失败:', err);
//         });
// }