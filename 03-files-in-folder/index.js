const { readdir, stat } = require('fs/promises') //импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path');
const { stdout } = process;

const secretFolder = path.join(__dirname, 'secret-folder'); //получаем путь к файлу
async function readFolder(directory) {
    const files = await readdir(directory, {withFileTypes: true})//читаем папку
    for(const file of files) {
        if(file.isFile()) { //если это файл, то берем из него имя, расширение, размер
            const nameFile = path.basename(file.name, path.extname(file.name))
            const extName = path.extname(file.name).slice(1)
            const stats = await stat(path.join(directory, file.name))
            const size = stats.size / Math.pow(1024, 1)
            stdout.write(`\n${nameFile} - ${extName} - ${size}kb`)
        }
    } 
}
readFolder(secretFolder)