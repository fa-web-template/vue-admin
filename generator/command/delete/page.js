const { join } = require("path")
const question = [
    {
        name: "page",
        type: "input",
        message: "属于哪个页面",
        default: "admin",
        validate(val) {
            if (val === "") {
                return "页面为必填"
            }
            return true
        }
    },
    {
        name: "name",
        type: "input",
        message: "请输入页面名称(英文)",
        validate(val) {
            if (val === "") {
                return "页面名称为必填"
            } else {
                return true
            }
        }
    }
]

function getFileTplList(answers, user_path) {
    const { name, page } = answers
    return [
        {
            path: join(user_path, `src/common/data/modules/${name}.js`)
        },
        {
            path: join(user_path, `src/pages/${page}/router/modules/${name}.js`)
        },
        {
            path: join(user_path, `src/pages/${page}/store/modules/${name}.js`)
        },
        {
            path: join(user_path, `src/pages/${page}/views/${name}`)
        }
    ]
}

module.exports = {
    question,
    getFileTplList
}
