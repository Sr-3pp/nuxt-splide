// scripts/build-themes.js
import { readdirSync, mkdirSync, writeFileSync, watch } from 'node:fs'
import { resolve, join, extname } from 'node:path'
import { renderSync } from 'sass'

const scssDir = resolve('themes')
const cssDir = resolve('src/css')

function compileTheme(file) {
  if (!file.endsWith('.scss')) return
  const scssPath = join(scssDir, file)
  const cssPath = join(cssDir, file.replace('.scss', '.css'))

  try {
    const result = renderSync({
      file: scssPath,
      includePaths: [resolve('themes/utils')],
      outputStyle: 'expanded',
    })

    mkdirSync(cssDir, { recursive: true })
    writeFileSync(cssPath, result.css)
    console.log(`✅ Compiled ${file} → src/css/${file.replace('.scss', '.css')}`)
  }
  catch (error) {
    console.error(`❌ Error compiling ${file}:`, error.message)
  }
}

// Initial full build
readdirSync(scssDir).forEach(compileTheme)

if (process.argv.includes('--watch')) {
  console.log('👀 Watching for SCSS changes...')
  watch(scssDir, (eventType, filename) => {
    if (extname(filename) === '.scss') {
      compileTheme(filename)
    }
  })
}
