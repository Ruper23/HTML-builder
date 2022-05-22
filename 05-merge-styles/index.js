const fs = require('fs')
const path = require('path')
const cssFolder = path.join(__dirname, 'styles')

fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), (error, file) => {
   if (file) {
      if (error) throw error
   }
})

fs.readdir(cssFolder, { withFileTypes: true }, (error, files) => {
   if (error) {
      console.log(error)
   } else {
      files.forEach(file => {
         if (file.isFile() & path.extname(file.name) === '.css') {
            const input = fs.createReadStream(path.join(cssFolder, file.name))
            let array = []
            input.on('data', chunk => array.push(chunk.toString()))
            input.on('end', () => fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), array.join(''), error => {
               if (error) throw error
            }))
         }
      })
   }
})