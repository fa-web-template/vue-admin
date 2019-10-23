import { isArray, last as getLast } from 'lodash'

const getWhereResult = search => {
  const res = {
    where: search
  }
  search.forEach((item, index) => {
    if (!isArray(item)) return
    const last = getLast(item)
    // The key => value into the outermost
    if (last.outside) {
      res[item[0]] = item[2]
      res.where.splice(index, 1)
    }
    // Replace key
    if (last.realKey) {
      item[0] = last.realKey
    }
  })
  return res
}

const getWhere = origin => {
  const { current_search_module } = origin
  const search = origin[current_search_module]

  return search.length ? getWhereResult(search) : {}
}

const getOrderBy = origin => {
  const { order_by, desc } = origin
  return order_by
    ? {
      order_by,
      desc
    }
    : {}
}

export default {
  requestData() {
    return origin => {
      const { current_page, per_page } = origin
      let data = {
        page: current_page,
        per_page
      }
      return Object.assign(data, getWhere(origin), getOrderBy(origin))
    }
  }
}
import { isArray, last as getLast } from 'lodash'

const getWhereResult = search => {
  const res = {
    where: search
  }
  search.forEach((item, index) => {
    if (!isArray(item)) return
    const last = getLast(item)
    // The key => value into the outermost
    if (last.outside) {
      res[item[0]] = item[2]
      res.where.splice(index, 1)
    }
    // Replace key
    if (last.realKey) {
      item[0] = last.realKey
    }
  })
  return res
}

const getWhere = origin => {
  const { current_search_module } = origin
  const search = origin[current_search_module]

  return search.length ? getWhereResult(search) : {}
}

const getOrderBy = origin => {
  const { order_by, desc } = origin
  return order_by
    ? {
      order_by,
      desc
    }
    : {}
}

export default {
  requestData() {
    return origin => {
      const { current_page, per_page } = origin
      let data = {
        page: current_page,
        per_page
      }
      return Object.assign(data, getWhere(origin), getOrderBy(origin))
    }
  }
}
