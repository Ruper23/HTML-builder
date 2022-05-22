const path = require('path')
const fs = require('fs')
const input = process.stdin
const output = process.stdout

const pathJoin = path.join(__dirname, './text.txt')

fs.writeFile(pathJoin, '', (error) => {
   if (error) throw error;
})
const createStram = fs.createWriteStream(pathJoin)
output.write('File create now, you can write anything \n')
input.on('data', (data) => {
   if (data.toString().trim() === 'exit') {
      process.exit()
   } else {
      createStram.write(data.toString())
   }
});

process.on('SIGINT', process.exit);
process.on('exit', () => output.write('File save, bye'))