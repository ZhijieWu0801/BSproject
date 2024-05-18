const SecretId = "AKIDliSxFNL6oLn466tWw7XosocHm4B5nKfn";
const SecretKey = "Rkyzut9LaospbCsRoGk5EF984wiMr9HM";

const fs = require("fs");
const COS = require('cos-nodejs-sdk-v5');
const express = require('express');
// const multer = require('multer');

const app = express();

// 配置 COS SDK
const cos = new COS({
  SecretId,
  SecretKey,
});

// 配置 multer 来处理文件上传
// const upload = multer({
//   dest: 'uploads/'
// });


// 腾讯云获取对象地址
// exports.putImgAndGetUrl = async (res, serial, base64) => {
//   let url = null;
//   const buffer = Buffer.from(base64, 'base64');
//   // const buffer = base64;
//   const putParams = {
//     Bucket: 'bs-img-cos-1317764751',
//     Region: 'ap-beijing',
//     Key: 'img/' + serial + '.png',
//     Body: buffer,
//   };
//   const getParams = {
//     Bucket: 'bs-img-cos-1317764751',
//     Region: 'ap-beijing',
//     Key: 'img/' + serial + '.png',
//   };
//   console.log(putParams, getParams, 789);
//   // 上传文件到腾讯云对象存储
//   cos.putObject(putParams, (err, data) => {
//     if (err) {
//       console.error('Error uploading to COS:', err);
//       res.status(500).json({
//         error: 'Error uploading to Tencent Cloud COS.'
//       });
//       return;
//     }
//     // 获取对象 URL
//   });
//   cos.getObjectUrl(getParams, (err, data) => {
//     if (err) {
//       console.error('Error getting object URL:', err);
//       // res.status(500).json({
//       //   error: 'Error getting object URL.'
//       // });
//       return;
//     }
//     url = data.Url
//     res.send({
//       objectUrl: data.Url
//     });
//   });
//   return url
// }

function base64ToFile(base64, fileName, mimeType) {
  // 将 Base64 数据转换为 Uint8Array
  const binaryData = atob(base64.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // 创建 Blob 对象
  const blob = new Blob([uint8Array], { type: mimeType });

  // 创建 File 对象
  return new File([blob], fileName, { type: mimeType });
}


exports.putImgAndGetUrl = async (res, serial, base64) => {
  try {
    // const file = base64ToFile(base64,`${serial} + '.png'`,'image/png')
    const buffer = Buffer.from(base64, 'base64');
    // fs.base64("aaa.text",base64)
    const putParams = {
      Bucket: 'bs-img-cos-1317764751',
      Region: 'ap-beijing',
      Key: 'img/' + serial + '.png',
      Body: buffer,
      ContentType: "image/png",
      ContentLength: buffer.length,
      ACL: 'public-read',//公共读
    };
    const getParams = {
      Bucket: 'bs-img-cos-1317764751',
      Region: 'ap-beijing',
      Key: 'img/' + serial + '.png',
    };

    cos.putObject(putParams,
      (err, data) => {
        if (err) {
          console.error('Error uploading to COS:', err);
          res.status(500).json({
            error: 'Error uploading to Tencent Cloud COS.'
          });
          return;
        }
      }
    );
    const {
      Url
    } = await new Promise((resolve, reject) =>
      cos.getObjectUrl(getParams, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    );
    // console.log(Url, 555666);
    return Url;
  } catch (err) {
    console.error('Error:', err);
    res.send({
      error: 'Error uploading or getting object URL.'
    });
    return null;
  }
};

// 处理图片上传的 POST 请求
// 这里应该是数据处理的时候有问题，导致了存到腾讯云后预览失败
// app.post('/upload', upload.single('image'), (req, res) => {
//   const params = {
//     Bucket: 'bs-img-cos-1317764751',
//     Region: 'ap-beijing',
//     Key: 'img/' + req.file.originalname,
//     Body: req.file.buffer,
//   };

//   cos.putObject(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.send('Image uploaded successfully!');
//     }
//   });
// });
// app.all('/upload',async (res,req)=>{
//   const url = await this.putImgAndGetUrl(res.query.serial, res.query.img)
//   console.log(url,456666);
// })
// // 启动 Express 服务器
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });