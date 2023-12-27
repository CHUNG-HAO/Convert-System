const express = require('express');
const multer  = require('multer');
const upload = multer();
const convertapi = require('convertapi')('h5PiuickiKiXdP5F');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

    /*------------PPT to PDF------------*/

app.post('/convert', upload.none(), (req, res) => {
  const pptFolderPath = req.body['source-path'];
  const pdfFolderPath = req.body['destination-path'];

  // 獲得ppt列表
  const pptFiles = fs.readdirSync(pptFolderPath);

  // 查詢所有ppt檔案
  pptFiles.forEach((pptFile) => {
    if (path.extname(pptFile).toLowerCase() === '.ppt' || path.extname(pptFile).toLowerCase() === '.pptx') {
      const pptFilePath = path.join(pptFolderPath, pptFile);

      convertapi.convert('pdf', { File: pptFilePath }, 'pptx').then(function(result) {
        result.saveFiles(pdfFolderPath);
        console.log(`Converted ${pptFile} to PDF successfully.`);
      }).catch(function(error) {
        console.error(`Error converting ${pptFile} to PDF: ${error}`);
      });
  }});
  res.json({ message: 'OK.' });
});


    /*------------WORD to PDF------------*/

app.post('/convertWord', upload.none(), (req, res) => {
  const wordFolderPath = req.body['source-path'];
  const pdfFolderPath = req.body['destination-path'];

  // 獲得 Word 文件列表
  const wordFiles = fs.readdirSync(wordFolderPath);

  // 轉換所有 Word 文件
  wordFiles.forEach((wordFile) => {
    if (path.extname(wordFile).toLowerCase() === '.doc' || path.extname(wordFile).toLowerCase() === '.docx') {
      const wordFilePath = path.join(wordFolderPath, wordFile);

      convertapi.convert('pdf', { File: wordFilePath }, 'docx').then(function(result) {
        result.saveFiles(pdfFolderPath);
        console.log(`Converted ${wordFile} to PDF successfully.`);
      }).catch(function(error) {
        console.error(`Error converting ${wordFile} to PDF: ${error}`);
      });
  }});
  res.json({ message: 'OK.' });
});


    app.listen(PORT, () => {
      console.log(`server started on port http://localhost:${PORT}`);
    });
