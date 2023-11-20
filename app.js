const express = require('express');
const multer  = require('multer');
const upload = multer();
const convertapi = require('convertapi')('h5PiuickiKiXdP5F');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));  
app.use(express.json());  // 解析 JSON 請求
app.use(express.urlencoded({ extended: true }));  // 解析 URL 編碼的請求


app.post('/convert', upload.none(), (req, res) => {
  const pptFolderPath = req.body['source-path'];
  const pdfFolderPath = req.body['destination-path'];

  // 獲得ppt列表
  const pptFiles = fs.readdirSync(pptFolderPath);

  // 查詢所有ppt檔案
  pptFiles.forEach((pptFile) => {
    if (path.extname(pptFile).toLowerCase() === '.ppt' || path.extname(pptFile).toLowerCase() === '.pptx') {
      const pptFilePath = path.join(pptFolderPath, pptFile);
      const pdfFilePath = path.join(pdfFolderPath, `${path.basename(pptFile, path.extname(pptFile))}.pdf`);

      convertapi.convert('pdf', { File: pptFilePath }, 'pptx').then(function(result) {
        result.saveFiles(pdfFolderPath);
        console.log(`Converted ${pptFile} to PDF successfully.`);
      }).catch(function(error) {
        console.error(`Error converting ${pptFile} to PDF: ${error}`);
      });
  }});
  res.json({ message: 'OK.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

