const fs = require('fs') //импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles') //пути к нужным файлам
const fileName = path.join(__dirname, 'project-dist/bundle.css')

const writeStream = fs.createWriteStream(fileName) //файлы из стайлс записываются в необходимый файл

const buildBundle = async () => {
    fs.readdir(stylesFolder, (err, files) => {
        try {
            files.forEach((file) => {
                const pathFile = path.join(stylesFolder, file) //путь к файлу в папке стайлс
                const newFile = path.basename(pathFile) 
                if(path.extname(pathFile) === '.css') { //если расширение сисс, то читаем его и записвваем в нужный файл
                    const readStream = fs.createReadStream(path.join(stylesFolder, newFile))
                    readStream.on('data', data => {
                        writeStream.write(data)
                    })
                }
            })
        } catch (err) {
            console.log(err)
        }
    })
}

buildBundle()