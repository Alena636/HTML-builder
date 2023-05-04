const fs = require('fs') //импортируем нужные модули(фс используется для взаимодействия с ноде)
const path = require('path'); //предоставляет утилиты для работы с путями к файлам и каталогам
const { stdout } = process; //подключаем процесс к выводу

const readStream = fs.createReadStream(path.join(__dirname, 'text.txt')) //создаем ридстрим из файла текст.ткст
readStream.on('data', (text) => stdout.write(text)) //открываем функцию, eventEmitter.on(), которая позволяет прикрепить одну или несколько функций к именованным событиям, испускаемым объектом