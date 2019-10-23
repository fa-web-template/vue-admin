/**
 *
 * @export
 * @param {*} num
 * @returns
 */
export function numberFormat(num) {
  return num < 10 ? '0' + num : num
}

/**
 *
 *
 * @export
 * @param {*} object1
 * @param {*} object2
 * @param {*} [callback=null]
 * @returns {object}
 */
export function cover(object1, object2, callback = null) {
  const a = { ...object1 }
  const b = { ...object2 }
  for (const key in a) {
    if (b[key] !== undefined) {
      if (callback) {
        callback(key, b[key])
      } else {
        a[key] = b[key]
      }
    }
  }
  return a
}

/**
 *
 *
 * @export
 * @param {*} object
 * @param {*} keys
 * @returns {newObj}
 */
export function retainKeys(object, keys) {
  const newObj = {}
  keys.forEach(key => {
    newObj[key] = object[key]
  })
  return newObj
}

/**
 * @export
 * @param {*} str
 * @returns {string}
 */
export function removeBlank(str) {
  return str
    .split('\n')
    .map(s => s.trim())
    .filter(s => s)
    .join('\n')
}
