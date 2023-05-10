//импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path');
const fs = require('fs');

const folderSource = path.join(__dirname, 'files') //пути к папкам
const newFolder = path.join(__dirname, 'files-copy')
async function copyFolder(source, output) { 
   try {
    await delFolder(output)
   } catch {
    console.log('Create folder files-copy')
   } finally {
    await createFolder(output)
    const data  = await readFolder(source)
    await copyFiles(data, source, output)
   }
    }

async function delFolder(folder) {
    await fs.promises.rm(folder, {recursive: true})
}

async function createFolder(folder) {
    fs.promises.mkdir(folder, {recursive: true})
}

async function readFolder(folder) {
    const namesFile = await fs.promises.readdir(folder, {withFileTypes: true})
return namesFile
}

async function copyFiles(namesFile, folderSource, newFolder) {
    for (let file of namesFile) {
        const fileSource = path.join(folderSource, file.name)
        const fileOutput = path.join(newFolder, file.name)
        if(file.isFile()) {
            fs.promises.copyFile(fileSource, fileOutput)
        } else {
            await copyFolder(fileSource, fileOutput)
        }
    }
}

copyFolder(folderSource, newFolder)


