const { join } = require('path')
const templateJSON = require('../../../template/template.json')
const pages = templateJSON.pages
const generator_path = join(__dirname, '../../template/')
let tmp_page_value = 'admin'

const question = [
  {
    name: 'page',
    type: 'input',
    message: '添加到页面',
    default: tmp_page_value,
    validate(val) {
      if (val === '') {
        return '页面名称为必填'
      }
      tmp_page_value = val
      return true
    }
  },
  {
    name: 'name',
    type: 'input',
    message: '请输入页面名称(英文)',
    validate(val) {
      const page = pages.find(
        item => item.name === val && item.page === tmp_page_value
      )
      if (val === '') {
        return '页面名称为必填'
      } else if (page) {
        return '页面名称已存在'
      } else {
        return true
      }
    }
  },
  {
    name: 'title',
    type: 'input',
    message: '请输入页面标题(中文)',
    validate(val) {
      if (val === '') {
        return '页面名称为必填'
      } else {
        return true
      }
    }
  },
  {
    name: 'hasSub',
    type: 'confirm',
    message: '操作页面是否独立？'
  }
]

function getFileTplList(answers, user_path) {
  const { name, page, hasSub } = answers
  const first_upper_name = name[0].toUpperCase() + name.slice(1)
  const hasSubStr = hasSub ? 'has_sub_' : ''
  return [
    {
      from: join(generator_path, 'data/tpl.js'),
      to: join(user_path, `src/common/data/modules/${name}.js`)
    },
    {
      from: join(generator_path, `router/${hasSubStr}tpl.js'`),
      to: join(user_path, `src/pages/${page}/router/modules/${name}.js`)
    },
    {
      from: join(generator_path, 'store/tpl.js'),
      to: join(user_path, `src/pages/${page}/store/modules/${name}.js`)
    },
    {
      from: join(generator_path, `view/tpl.vue`),
      to: join(user_path, `src/pages/${page}/views/${name}/index.vue`)
    },
    {
      from: join(generator_path, `view/components/${hasSubStr}Table.vue`),
      to: join(
        user_path,
        `src/pages/${page}/views/${name}/components/${first_upper_name}Table.vue`
      )
    }
  ]
}

module.exports = {
  question,
  getFileTplList
}
