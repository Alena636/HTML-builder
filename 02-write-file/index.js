const fs = require('fs') //импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path');
const { stdin, stdout, exit } = process;

const file = fs.createWriteStream(path.join(__dirname, 'text.txt')); //создаем файл с потоком записи
stdout.write('Hello, enter your text\n'); //записываем строку и выводим в консоль
stdin.on('data', text => {
    if(text.toString().trim() === 'exit') { //если вводят в консоль ексит, то выход
        exit()
    }
    file.write(text)//записываем данные в фал
})


process.on('exit', () => stdout.write('Goodbye!'))//заканчиваем процесс и пишем гудбай
process.on('SIGINT', exit);

