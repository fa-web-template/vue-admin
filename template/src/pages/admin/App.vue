<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
import ResizeHandler from '@/common/mixins/ResizeHandler.js'
import { hasPermission } from '@/common/utils/role'
import { mapGetters, mapActions } from 'vuex'
export default {
    mixins: [ResizeHandler],
    data() {
        return {
            isRouterAlive: true
        }
    },
    computed: {
        ...mapGetters(['device', 'meRoles'])
    },
    watch: {
        device() {
            this.setHTMLClass()
        }
    },
    mounted() {
        this.setHTMLClass()
    },
    methods: {
        ...mapActions('app', ['updateNavList', 'updateSearchList']),
        initNavList() {
            const navList = this._.cloneDeep(this.$router.options.routes)
            const res = this.filterNavList(navList)
            const search = this.initSearch(res)
            this.updateNavList(res)
            this.updateSearchList(search)
        },
        initSearch(navList, parent = null) {
            let res = []
            navList.forEach(item => {
                let title = [item.meta.title]
                if (parent) {
                    title = [parent.meta.title].concat(title)
                }
                res.push({
                    title: title,
                    path: item.path
                })
                if (item.children) {
                    res = res.concat(this.initSearch(item.children, item))
                }
            })
            return res
        },
        filterNavList(list, parent = null) {
            const res = list.map(item => {
                if (item.hidden) return
                if (this._.get(item, 'meta.roles')) {
                    if (!hasPermission(this.meRoles, item)) {
                        return
                    }
                }
                if (item.children) {
                    item.children = this.filterNavList(item.children, item)
                    if (!item.children.length) {
                        delete item.children
                    }
                }
                const keys = ['path', 'name', 'meta', 'children']
                const newItem = {}
                for (const key of Object.keys(item)) {
                    if (keys.includes(key)) {
                        newItem[key] = item[key]
                    }
                }

                if (parent) {
                    newItem.path = parent.path + '/' + newItem.path
                }
                return newItem
            })
            return res.filter(item => item)
        },
        setHTMLClass() {
            document.querySelector('html').className = this.device
        },
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }
    }
}
</script>

<style lang="scss">
@import '@/common/styles/_reset.scss';
</style>
