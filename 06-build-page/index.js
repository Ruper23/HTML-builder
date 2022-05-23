const path = require('path')
const fs = require('fs')
const pathDist = path.join(__dirname, 'project-dist')
const pathAssets = path.join(__dirname, 'assets')
const pathComponents = path.join(__dirname, 'components')
const pathStyles = path.join(__dirname, 'styles')
const pathTemplate = path.join(__dirname, 'template.html')


async function createStyles() {
   const pathCSS = path.join(pathDist, 'style.css')
   await fs.promises.rm(pathCSS, { force: true })
   await fs.promises.writeFile(pathCSS, '')
   const createStreamCSS = fs.createWriteStream(pathCSS)
   const files = await fs.promises.readdir(pathStyles, { withFileTypes: true })
   const cssFiles = files.filter(file => file.isFile() && file.name.match(/\.css$/))
   cssFiles.reverse().forEach((file) => {
      const pathSrcFile = path.join(pathStyles, file.name)
      const readStream = fs.createReadStream(pathSrcFile, 'utf-8')
      readStream.pipe(createStreamCSS)
   })
}

async function createHTML() {
   let template = await fs.promises.readFile(pathTemplate, 'utf-8')
   const pathHtml = path.join(pathDist, 'index.html')
   const components = await fs.promises.readdir(pathComponents)
   for (let i = 0; i < components.length; i++) {
      let component = components[i]
      const pathComponent = path.join(pathComponents, component)
      const componentCode = await fs.promises.readFile(pathComponent, 'utf-8')
      const templateTag = (`{{${component.slice(0, -5)}}}`)
      template = template.replace(templateTag, componentCode)
      await fs.promises.writeFile(pathHtml, template)
   }
}

async function copyAssets(pathSrc, pathDestination) {
   const pathCopy = path.join(pathDestination, path.parse(pathSrc).name)
   await fs.promises.rm(pathCopy, { recursive: true, force: true })
   await fs.promises.mkdir(pathCopy, { recursive: true })
   const elements = await fs.promises.readdir(pathSrc, { withFileTypes: true })
   elements.forEach((elem) => {
      const source = path.join(pathSrc, elem.name)
      const copy = path.join(pathCopy, elem.name)
      if (elem.isDirectory()) {
         copyAssets(source, pathCopy)
      } else {
         fs.promises.copyFile(source, copy)
      }
   })
}

async function createPage() {
   await copyAssets(pathAssets, pathDist)
   await createHTML()
   await createStyles()
}

createPage()