
const SecretId = AKIDliSxFNL6oLn466tWw7XosocHm4B5nKfn;
const SecretKey = Rkyzut9LaospbCsRoGk5EF984wiMr9HM


const COS = require('cos-nodejs-sdk-v5');
const express = require('express');
const multer = require('multer');

const app = express();

// 配置 COS SDK
const cos = new COS({
  SecretId,
  SecretKey,
});

// 配置 multer 来处理文件上传
const upload = multer({ dest: 'uploads/' });

// 处理图片上传的 POST 请求
app.post('/upload', upload.single('image'), (req, res) => {
  const params = {
    Bucket: 'bs-img-cos-1317764751',
    Region: 'ap-beijing',
    Key: 'img/' + req.file.originalname,
    Body: req.file.buffer,
  };

  cos.putObject(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Image uploaded successfully!');
    }
  });
});

// 启动 Express 服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
