<template>
  <v-card :title="title"
          :class="['search',{ 'hidden': hidden }]">
    <div slot="toolbar"
         class="toolbar">
      <el-button :size="respBtnSize"
                 type="primary"
                 @click="submit">
        搜索
      </el-button>
      <el-button :size="respBtnSize"
                 type="info"
                 @click="handleReset">
        重置
      </el-button>
      <el-button :size="respBtnSize"
                 @click="toggleHidden">
        \{{ hidden ? '展开' : '收起' }}
      </el-button>
    </div>
    <v-form :inline="true"
            :form-item="innerFormItem"
            :form-data="innerFormData"
            @submit="submit" />
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import getData from '@/common/mixins/getData'
import submitChange from '@/common/mixins/submitChange'
import ResponsiveSize from '@/common/mixins/ResponsiveSize'
export default {
  name: 'BaseSearch',
  mixins: [ResponsiveSize, getData, submitChange],
  props: {
    title: {
      type: String,
      default: '搜索'
    },
    module: {
      type: String,
      required: true
    },
    formItem: {
      type: Array,
      default: null
    },
    getFormData: {
      type: Function,
      default: null
    }
  },
  data: () => ({
    search: [],
    hidden: false
  }),
  computed: {
    submitAction() {
      return `${this.module}search`
    },
    innerFormItem() {
      return this.formItem
        ? this.formItem
        : this.$v_data[this.module].search.item
    },
    innerFormData() {
      const state = this.$store.state[this.module]
      if (this._.isEmpty(state.search_data)) {
        state.search_data = this.getFormData
          ? this.getFormData()
          : this.$v_data[this.module].search.data()
      }
      return state.search_data
    }
  },
  created() {
    if (!this.module && !this.formItem) {
      throw new Error(
        'You must provide a `module` or `formItem` and `getFormData`'
      )
    }
  },
  methods: {
    ...mapActions(['resetSearchData', 'updateSearch']),
    reset() {
      this.resetSearchData({
        module: this.module,
        getFormData: this.getFormData
      })
<<<<<<< HEAD
=======
    },
    toggleHidden() {
      this.hidden = !this.hidden
>>>>>>> fix(修复一些问题): Fix some problems
    },
    handleReset() {
      this.reset()
      this.submit()
    },
    submit() {
      this.search = []
      this.initSearchData(this.innerFormItem)
      this.handleSubmit()
    },
    initSearchData(array, key = '') {
      array.forEach(el => {
        if (el.isObject) {
          return this.search.push({
            type: el.type,
            key: el.key,
            data: this.innerFormData[el.key]
          })
        } else if (el.items) {
          return this.initSearchData(el.items, key)
        }
        return this.setSearchData(el)
      })
    },
    setSearchData(item) {
      const key = item.key
      let data = this.innerFormData[key]
      if (data !== 0 && !data) return
      const operation = this._.get(item, 'meta.operation', 'like')
      if (operation === 'like') {
        data = `%${data}%`
      }
      this.search.push([
        key,
        operation,
        data,
        {
          ...this._.get(item, 'meta', {})
        }
      ])
    },
    async handleSubmit() {
      await this.updateSearch({
        module: this.module,
        search: this.search
      })
      this.beforeChange()
      await this.getData()
      this.afterChange()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  &.hidden {
    /deep/ .el-card__body {
      padding: 0;
      height: 0;
    }
  }
}
</style>
