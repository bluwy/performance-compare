// iterate all .jsx files in src recursively and inject `import './util.js'` at the top

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const srcDir = path.resolve(__dirname, '../src')
const srcUtilPath = path.resolve(srcDir, './util.js')

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f))
  })
}

walk(srcDir, (f) => {
  if (f.endsWith('.jsx') && !f.includes('app')) {
    const content = fs.readFileSync(f, 'utf-8')
    if (!content.includes(`({ style }) {`)) return
    let importPath = path.relative(path.dirname(f), srcUtilPath)
    if (importPath[0] !== '.') {
      importPath = './' + importPath
    }
    fs.writeFileSync(f, `import { increment } from '${importPath}'\n` + content.replace(`({ style }) {`, `({ style }) {\n\tincrement()\n`))
  }
})
