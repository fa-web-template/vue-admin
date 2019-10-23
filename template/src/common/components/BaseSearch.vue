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
    <ele-form :inline="true"
              :is-show-submit-btn="false"
              v-bind="attrs"
              :form-data="formData"
              :request-fn="submit" />
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import submitChangeMixin from '@/common/mixins/submitChangeMixin'
import responsiveSizeMixin from '@/common/mixins/responsiveSizeMixin'
export default {
  name: 'BaseSearch',
  mixins: [responsiveSizeMixin, submitChangeMixin],
  props: {
    getData: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      default: '搜索'
    },
    module: {
      type: String,
      required: true
    },
    subModule: {
      type: String,
      default: 'search'
    },
    needReset: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    search: [],
    formData: {},
    hidden: false
  }),
  computed: {
    attrs() {
      return this.$v_data[this.module][this.subModule]
    }
  },
  created() {
    if (this.needReset) {
      this.reset()
      this.handleUpdateSearch()
    }
    this.formData = this.getFormData()
    this.hidden = this.isMobile
  },
  methods: {
    ...mapActions(['resetSearchData', 'updateSearch']),
    getFormData() {
      const state = this.$store.state[this.module]
      const key = `${this.subModule}_data`
      if (this._.isEmpty(state.search_data)) {
        state[key] = this.attrs.getFormData()
      }
      return state[key]
    },
    reset() {
      this.resetSearchData({
        module: this.module,
        subModule: this.subModule
      })
      this.formData = this.getFormData()
    },
    toggleHidden() {
      this.hidden = !this.hidden
    },
    handleReset() {
      this.reset()
      this.submit()
    },
    submit() {
      this.search = []
      this.initSearchData()
      this.handleSubmit()
    },
    initSearchData() {
      const formDesc = this.attrs.formDesc
      Object.keys(formDesc).forEach(key => {
        this.setSearchData(formDesc[key], key)
      })
    },
    setSearchData(item, key) {
      let value = this.formData[key]
      if (value !== 0 && !value) return
      const operation = this._.get(item, 'meta.operation', '=')
      this.search.push([
        key,
        operation,
        value,
        Object.assign({}, this._.get(item, 'meta', {}))
      ])
    },
    async handleSubmit() {
      await this.handleUpdateSearch()
      await this.handleGetData()
    },
    async handleUpdateSearch() {
      await this.updateSearch({
        module: this.module,
        subModule: this.subModule,
        search: this.search
      })
    },
    async handleGetData() {
      this.beforeChange()
      await this.getData()
      this.afterChange()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  /deep/ .el-card__body {
    padding: 0;
    max-height: 100px;
    transition: max-height 0.15s ease;
    > .ele-form {
      padding: $card-body-padding !important;
    }
    .el-form-item + .el-form-item {
      margin-left: 10px;
    }
  }
  &.hidden {
    /deep/ .el-card__body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.15s ease;
    }
  }
}
</style>
