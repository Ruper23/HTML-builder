const path = require('path')
const fs = require('fs')
const pathJoin = path.join(__dirname, './text.txt')

const readStream = fs.createReadStream(pathJoin, 'utf-8')

readStream.on('data', (data) => {
   console.log(data)
})