const convertapi = require('convertapi')('h5PiuickiKiXdP5F');
const fs = require('fs');
const path = require('path');

const pptFolderPath = ''; // 起始
const pdfFolderPath = '';  // 目標

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
  }
});
