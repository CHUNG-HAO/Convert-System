const express = require('express');
const multer  = require('multer');
const upload = multer();
const convertapi = require('convertapi')('h5PiuickiKiXdP5F');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "yourdatabase"
});
*/

app.use(express.static('public'));
// 解析 JSON 請求  
app.use(express.json()); 
// 解析 URL 編碼的請求
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
      const pdfFilePath = path.join(pdfFolderPath, `${path.basename(wordFile, path.extname(wordFile))}.pdf`);

      convertapi.convert('pdf', { File: wordFilePath }, 'docx').then(function(result) {
        result.saveFiles(pdfFolderPath);
        console.log(`Converted ${wordFile} to PDF successfully.`);
      }).catch(function(error) {
        console.error(`Error converting ${wordFile} to PDF: ${error}`);
      });
  }});
  res.json({ message: 'OK.' });
});

    /*------------ Databsae ------------

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

app.post('/signin', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(err, result) {
    if (err) throw err;

    if (result.length > 0) {
      req.session.loggedin = true;
      req.session.email = email;
      res.redirect('/home');
    } else {
      res.send('Incorrect Email and/or Password!');
    }            
    res.end();
  });
});

*/

    /*------------ 檢查是否有註冊並登入 ------------*/



    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
