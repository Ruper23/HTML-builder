
const path = require('path')
const fs = require('fs')
const pathJoin = path.join(__dirname, 'files')
const pathCopy = path.join(__dirname, 'files-copy')

const copyFolder = () => {
   fs.mkdir(pathCopy, { recursive: true }, error => {
      if (error) throw error
   })

   fs.readdir(pathCopy, { withFileTypes: true }, (error, files) => {
      if (error) { console.log(error) }
      else {
         files.forEach(file => {
            fs.unlink(path.join(pathCopy, file.name), error => {
               if (error) throw error
            })
         })
      }
   })

   fs.readdir(pathJoin, { withFileTypes: true }, (error, files) => {
      if (error) {
         console.log(error)
      } else {
         files.forEach(file => {
            if (file.isFile()) {
               fs.copyFile(path.join(pathJoin, file.name), path.join(pathCopy, file.name), error => {
                  if (error) throw error;
               })
            }
         })
      }
   })
}
copyFolder()