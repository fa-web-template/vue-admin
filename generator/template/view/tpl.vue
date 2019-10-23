<template>
  <not-sub-router :name="`${module}List`">
    <base-search :module="module"
                 :get-data="getData"
                 @before-change="beforeChange"
                 @after-change="afterChange" />
    <s-table ref="table"
             :module="module"
             :get-data="getData" />
  </not-sub-router>
</template>
<script>
const __module = '{{ name }}'
import BaseSearch from '@/common/components/BaseSearch'
import sTable from './components/{{upperFirst name }}Table'
import { mapActions } from 'vuex'
import syncChangeMixin from '@/common/mixins/syncChangeMixin'
export default {
  components: {
    BaseSearch,
    sTable
  },
  mixins: [syncChangeMixin],
  data: () => ({
    module: __module
  }),
  methods: {
    ...mapActions(__module, ['getData'])
  }
}
</script>
