/**
 * 选项
 *
 * @export
 * @returns {array}
 */
export function stateOptions(hasAll = false, options = null) {
  let default_options = []
  if (options) {
    options.forEach((item, index) => {
      default_options.push({
        text: item,
        value: index
      })
    })
  } else {
    default_options = [
      {
        text: '是',
        value: 1
      },
      {
        text: '否',
        value: 0
      }
    ]
  }
  return hasAll
    ? [].concat(
      [
        {
          text: '全部',
          value: ''
        }
      ],
      default_options
    )
    : default_options
}

/**
 * 性别选项
 *
 * @export
 * @param {boolean} [hasAll=false]
 * @returns
 */
export function sexOptions(hasAll = false) {
  return stateOptions(hasAll, ['男', '女'])
}
