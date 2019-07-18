<template>
  <div class="app-aside">
    <div class="title-container">
      <h1 class="title">
        <router-link to="/index">{{ title }}</router-link>
      </h1>
    </div>
    <el-menu v-if="!_.isEmpty(navList)"
             :default-active="activeIndex"
             class="el-menu-vertical"
             router>
      <template v-for="item of navList">
        <el-submenu v-if="item.children"
                    :key="item.name"
                    :index="item.path">
          <template slot="title">
            <i v-if="item.meta.icon"
               :class="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="subItem of item.children"
                        :key="subItem.name"
                        :index="subItem.path"
                        class="sub-item-item">
            <i v-if="subItem.meta.icon"
               :class="subItem.meta.icon" />
            <span>{{ subItem.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else
                      :key="item.name"
                      :index="item.path">
          <i v-if="item.meta.icon"
             :class="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        activeIndex: ''
    }),
    computed: {
        ...mapGetters(['title', 'navList'])
    },
    watch: {
        $route() {
            this.updateActive()
        }
    },
    mounted() {
        this.updateActive()
    },
    beforeUpdate() {
        this.updateActive()
    },
    methods: {
        updateActive() {
            const match = this.$route.matched[1]
            const path = match.meta.isReplace
                ? this.$route.matched[0].path
                : match.path
            this.activeIndex = path
        }
    }
}
</script>

<style lang="scss" scoped>
.app-aside {
    @include wh($sidebar-width, 100%);
    @include flex-column;
    & > .el-menu {
        flex: 1;
        box-shadow: 4px 1px 12px rgba(0, 55, 107, 0.04);
        overflow-y: auto;
        @include no-scrollbar;
    }
}
.title-container {
    @include wh(100%, $app-header-height);
    @include sub-center;
    background: $app-header-bgcolor;
    color: $app-header-color;
    .title {
        font-size: $title-font-size;
    }
}
span {
    @include no-user-select;
}
</style>
<style lang="scss">
.el-menu {
    background: transparent;
    border: none;
    overflow: hidden;
    .el-submenu__title {
        color: $app-menu-item-color;
    }
    .el-menu-item {
        background: $sidebar-color;
        color: $app-menu-item-color;
        &.is-active {
            color: $app-menu-item-active-color;
        }
    }
    .sub-item-item {
        background: $app-sub-menu-item-bgcolor;
    }
    .el-menu-item,
    .el-submenu__title {
        font-size: 0.9rem;
    }
    .el-menu-item,
    .el-submenu__title,
    .el-submenu .el-menu-item {
        height: $app-menu-item-height;
        line-height: $app-menu-item-height;
        transition: background 0.5s ease;
    }
    .el-menu-item:hover,
    .el-submenu__title:hover,
    .el-menu-item:focus,
    .el-submenu__title:focus {
        background: $app-menu-item-hover-bgcolor;
    }
    .el-menu-item [class^='el-icon-'],
    .el-submenu [class^='el-icon-'] {
        font-size: 1.2rem;
    }
}
</style>
