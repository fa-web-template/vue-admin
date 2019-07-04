<template>
  <div :class="containerClassName">
    <!-- is object -->
    <template v-if="item.isObject">
      <form-item v-for="(subItem) in item.subs"
                 :key="getKey(subItem)"
                 :splice-key="getKey(subItem)"
                 :item="subItem"
                 :rules="rules"
                 :form-item="formItem"
                 :form-data="formData" />
    </template>
    <!-- is array -->
    <template v-else-if="item.isArray">
      <form-item v-for="(subItem,subIndex) in item.subs"
                 :key="getKey(subItem,subIndex)"
                 :splice-key="getKey(subItem,subIndex)"
                 :item="subItem"
                 :rules="rules"
                 :form-item="formItem"
                 :form-data="formData" />
    </template>
    <!-- is multiple -->
    <template v-else-if="item.isMultiple">
      <form-item v-for="(subItem,subIndex) in item.items"
                 :key="subIndex"
                 :item="subItem"
                 :rules="rules"
                 :form-item="formItem"
                 :form-data="formData"
                 :splice-key="subItem.key" />
    </template>
    <!-- is tab -->
    <template v-else-if="item.isTab">
      <el-tabs v-model="item.activeName">
        <el-tab-pane v-for="(subItem,subIndex) in item.items"
                     :key="subIndex"
                     :label="subItem.title"
                     :name="subItem.key"
                     :lazy="true">
          <form-item :item="subItem"
                     :form-item="formItem"
                     :form-data="formData"
                     :rules="rules"
                     :splice-key="subItem.key" />
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-else-if="item.isTitle">
      <el-divider>\{{ item.title }}</el-divider>
    </template>
    <template v-else>
      <!-- 一行多个 -->
      <template v-if="item.items">
        <label v-if="item.label"
               class="el-form-item__label">\{{ item.label }}</label>
        <el-form-item v-for="(subItem) in item.items"
                      :key="getKey(subItem)"
                      :label="subItem.label"
                      :prop="spliceKey +'.'+ subItem.key"
                      :class="getClassName(subItem)"
                      :style="getStyle(subItem)">
          <span v-show="false">\{{ setModel(spliceKey +'.'+ subItem.key) }}</span>
          <form-control :item="subItem"
                        :model.sync="model[subItem.key]"
                        @submit="submit" />
        </el-form-item>
      </template>
      <!-- 一行一个 -->
      <template v-else>
        <el-form-item :label="item.label"
                      :prop="spliceKey"
                      :class="{'hidden-label':_.get(item,'meta.hiddenLabel')}">
          <span v-show="false">\{{ setModel(spliceKey) }}</span>
          <form-control :item="item"
                        :model.sync="model[item.key]"
                        @submit="submit" />
        </el-form-item>
      </template>
    </template>
  </div>
</template>
<script>
import FormControl from '@/common/components/FormControl'
export default {
    name: 'FormItem',
    components: {
        FormControl
    },
    props: {
        spliceKey: {
            type: String,
            default: ''
        },
        rules: {
            type: Object,
            required: true
        },
        item: {
            type: Object,
            required: true
        },
        formData: {
            type: Object,
            required: true
        },
        formItem: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        model: null
    }),
    computed: {
        containerClassName() {
            return [
                'el-form-item ',
                'el-form-item-container',
                { 'el-form-item-tab': this.item.isTab },
                { 'is-required': this._.get(this.item, 'meta.required') }
            ]
        }
    },
    methods: {
        showWhen(enableWhen) {
            if (!enableWhen || !Object.keys(enableWhen)) return true
            for (const key in enableWhen) {
                if (this.getProperty(key) === enableWhen[key]) return true
            }
        },
        getStyle(item) {
            return {
                display: 'inline-block',
                width: this._.get(item, 'meta.width') || 'auto'
            }
        },
        getClassName(item) {
            return {
                hidden: !this.showWhen(this._.get(item, 'meta.enableWhen')),
                'hidden-label': this._.get(item, 'meta.hiddenLabel')
            }
        },
        getKey(item, index = null) {
            const hasIndex = index !== null
            const key = this.spliceKey
            if (!key) return hasIndex ? index : item.key
            else if (!item.key && !hasIndex) return key
            return key + (hasIndex ? `[${index}]` : `.${item.key}`)
        },
        setModel(path) {
            const paths = this._.toPath(path)
            paths.pop()
            this.model = path.includes('.')
                ? this._.get(this.formData, paths)
                : this.formData
        },
        submit() {
            this.$emit('submit')
        }
    }
}
</script>
<style lang="scss" scoped>
.el-form-item.hidden {
    visibility: hidden;
}
</style>
<style lang="scss">
.el-form-item .el-tabs__header.is-top {
    margin-left: 80px;
}
.el-divider__text {
    color: #606266;
}
.hidden-label {
    .el-form-item__label {
        display: none;
    }
    .el-form-item__content {
        margin-left: 0 !important;
        margin-right: 10px;
    }
}
</style>
