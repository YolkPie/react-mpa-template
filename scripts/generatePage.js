const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))

log('请输入要生成的页面名称')
process.stdin.on('data', async chunk => {
  const inputName = String(chunk).trim().toString()
  /**
	 * 页面目录路径
	 */
  const pageDirectory = resolve('../src/pages', inputName)
  /**
	 * html 文件路径
	 */
  const htmlName = resolve(pageDirectory, `${inputName}.html`)
  /**
	 * tsx 文件路径
	 */
  const tsxName = resolve(pageDirectory, `${inputName}.tsx`)
  /**
	 * 视图路由页面
	 */
  const viewDirectory = resolve(pageDirectory, 'index')
  /**
	 * 视图 scss 文件路径
	 */
  const viewScssName = resolve(viewDirectory, `index.scss`)
  /**
	 * 视图 tsx 文件路径
	 */
  const viewTsxName = resolve(viewDirectory, `index.tsx`)
  /**
	 * router 文件路径
	 */
  const routerName = resolve('../src/router', `${inputName}.tsx`)
  const hasPageDirectory = fs.existsSync(pageDirectory)
  if (hasPageDirectory) {
    errorLog(`${inputName}页面目录已存在，请重新输入`)
    process.exit()
  } else {
    log(`正在生成 page 目录 ${pageDirectory}`)
    await dotExistDirectoryCreate(pageDirectory)
    log(`正在生成 view 目录 ${viewDirectory}`)
    await dotExistDirectoryCreate(viewDirectory)
  }
  try {
    log(`正在生成 router 文件 router/${inputName}.tsx`)
    replaceContent(resolve('../template/router.tsx'), routerName, 'pageName', inputName)
    log(`正在生成页面 html 文件 pages/${inputName}.html`)
    generateFile(resolve('../template/page.html'), htmlName)
    log(`正在生成页面 tsx 文件 pages/${inputName}.tsx`)
		replaceContent(resolve('../template/page.tsx'), tsxName, 'pageName', inputName)
    log(`正在生成视图 scss 文件 views/${inputName}.scss`)
    generateFile(resolve('../template/view.scss'), viewScssName)
    log(`正在生成视图 tsx 文件 index/index.tsx`)
		generateFile(resolve('../template/view.tsx'), viewTsxName)
    successLog('生成成功')
  } catch (err) {
    errorLog(err.message)
  }
  process.exit()
})

function generateFile (src, dst) {
  if (fs.existsSync(dst)) {
    errorLog(`${dst}文件已存在`)
    return
  }
  const content = fs.readFileSync(src, 'utf8')
  fs.writeFileSync(dst, content, 'utf8')
}

function replaceContent (src, dst, key, value) {
  let content = fs.readFileSync(src, 'utf8')
  content = content.replace(new RegExp(`{{${key}}}`, 'gm'), value)
  fs.writeFileSync(dst, content, 'utf8')
}

function dotExistDirectoryCreate (directory) {
  return new Promise(resolve => {
    mkdirs(directory, () => {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  const exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
