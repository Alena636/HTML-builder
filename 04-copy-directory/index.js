const { copyFile } = require('fs/promises') //импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path');
const fs = require('fs');

const folderSource = path.join(__dirname, 'files') //пути к папкам
const newFolder = path.join(__dirname, 'files-copy')
async function copyFolder() { 
    fs.mkdir(newFolder, {recursive: true}, (err) => {//создаем новую папку
        if(err) {
            throw err
        } else {
            console.log('Create folder "files-copy"')
        }
    })

    fs.readdir(folderSource, (err, files) => { //читаем папку файлс и копируем в новую папку содержимое
        if(err) {
            throw err
        }
        files.forEach((file) => {
            const fileDir = path.join(__dirname, 'files', file)
            const newFileDir = path.join(__dirname, 'files-copy', file)
            copyFile(fileDir, newFileDir)
            console.log(file)
        })
    })
}

copyFolder()