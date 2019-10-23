export default {
  async get(ctx, { module, url = null, doCommit = true }) {
    const path = url || module
    const res = await this._vm.$axios.get(
      `/${path}`,
      ctx.getters.requestData(ctx.rootState[module])
    )
    if (doCommit) {
      ctx.commit(`${module}/update`, res, {
        root: true
      })
    }
    return res
  },
  async getOptions(ctx, modules) {
    const res = await this._vm.$axios.get(`/options`, {
      models: modules
    })
    Object.keys(res).forEach(key => {
      ctx.commit(
        `${key}/update`,
        {
          options: res[key]
        },
        {
          root: true
        }
      )
    })
  },
  async add(ctx, { module, data }) {
    return await this._vm.$axios.post(`/${module}`, data)
  },
  async update(ctx, { module, data, id }) {
    return await this._vm.$axios.put(`/${module}/${id}`, data)
  },
  async upload(ctx, { url, data }) {
    return await this._vm.$axios.upload(url, data)
  },
  async delete(crx, { module, ids }) {
    return await this._vm.$axios.delete(`/${module}`, {
      ids
    })
  },
  async resetSearchData(ctx, { module, subModule }) {
    const getFormData = this._vm.$v_data[module][subModule].getFormData
    ctx.commit(
      `${module}/update`,
      {
        [`${subModule}_data`]: getFormData()
      },
      {
        root: true
      }
    )
  },
  async updateSearch(ctx, { module, subModule, search = [] }) {
    ctx.commit(
      `${module}/update`,
      {
        [subModule]: search
      },
      {
        root: true
      }
    )
  }
}
