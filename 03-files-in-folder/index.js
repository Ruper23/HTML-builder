const path = require('path')
const fs = require('fs')
const pathJoin = path.join(__dirname, 'secret-folder')

fs.readdir(pathJoin, { withFileTypes: true }, (error, files) => {
   if (error) {
      console.log(error)
   } else {
      console.log('\nFiles:')
      files.forEach(file => {
         if (file.isFile()) {
            let fileName = file.name.split('.')[0]
            let fileExtention = (path.extname(file.name)).slice(1)
            fs.stat(path.join(pathJoin, file.name), (error, stats) => {
               if (error) {
                  console.log(error)
               } else {
                  console.log(`${fileName} - ${fileExtention} - ${stats.size}b`)
               }
            })
         }
      })
   }
})