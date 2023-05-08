const fs = require('fs') //импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path');
const { readdir, mkdir } = require('fs/promises') 

const templateHtml = path.join(__dirname, 'template.html') //прописываем пути к папкам и файлам
const componentsFolder = path.join(__dirname, 'components') 
const projectFolder = path.join(__dirname, 'project-dist') 
const projectFile = path.join(__dirname, 'project-dist/style.css')
const stylesFolder = path.join(__dirname, 'styles') 

const writeStream = fs.createWriteStream(projectFile)

const assetsFolder = path.join(__dirname, 'assets')
const newAssetsFolder = path.join(__dirname, 'project-dist/assets')

async function createFolder() { //создаем папку проджэкт-дист
    fs.mkdir(projectFolder, {recursive:true}, (err) => {
        if(err) {
            throw new Error(err)
        } else {
            console.log('Folder created')
        }
    })
}

createFolder()

async function buildTemplate(templateHtml, projectFolder) { //заменяем компоненты в штмл
    let template = await fs.promises.readFile(templateHtml, 'utf-8')
    const matches = template.matchAll(/{{(.*?)}}/g)
    for(let match of matches) {
        const componentName = match[1]
        let fileOfComponent = path.join(componentsFolder, `${componentName}.html`)
        const componentHtml = await fs.promises.readFile(fileOfComponent, 'utf8')
        template = template.replace(match[0], componentHtml)
    }
    await fs.promises.writeFile(path.join(projectFolder, 'index.html'), template, 'utf-8')
}

buildTemplate(templateHtml, projectFolder)

async function buildCss() {  //собираем все стили 
    fs.readdir(stylesFolder, (err, files) => {
        try {
            files.forEach((file) => {
                const filePath = path.join(stylesFolder, file)
                const fileName = path.basename(filePath)
                if(path.extname(filePath) === '.css') {
                    const readStream = fs.createReadStream(path.join(stylesFolder, fileName))
                    readStream.on('data', data => {
                        writeStream.write(data)
                    })
                }
            })
        } catch(err) {
            console.log(err)
        }
    })
}

buildCss()

async function copyFolder(assetsFolder, newAssetsFolder){ 
    fs.mkdir(newAssetsFolder, {recursive: true}, (err) => {
        if(err) {
            throw new Error(err)
        }
    })
        fs. readdir(assetsFolder, {withFileTypes: true}, (err, files) => {
        if(err) {
            throw new Error(err)
        }
        files.forEach(async (file) => {
            if(file.isFile()) {
                const assetsFile = path.join(assetsFolder, file.name)
                const newAssetsFile = path.join(newAssetsFolder, file.name)
                await fs.promises.copyFile(assetsFile, newAssetsFile)
            } else {
                copyFolder(path.join(assetsFolder, file.name), path.join(newAssetsFolder, file.name))
            }
        })
    })
}

copyFolder(assetsFolder, newAssetsFolder)