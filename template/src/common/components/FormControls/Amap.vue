<template>
  <el-amap v-if="loaded"
           ref="amap"
           vid="amap"
           :center="center"
           :zoom="12"
           class="amap"
           :events="events">
    <slot></slot>
  </el-amap>
</template>
<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap'

Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'your key',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  v: '1.4.4'
})

export default {
  name: 'Amap',
  props: {
    center: {
      type: Array,
      required: true
    }
  },
  data() {
    const self = this
    return {
      loaded: false,
      events: {
        click(e) {
          self.submit(e.lnglat)
        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true
    }, 500)
    lazyAMapApiLoaderInstance.load().then(() => {
      localStorage.removeItem('_AMap_raster')
    })
  },
  methods: {
    submit(data) {
      this.$emit('click', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.amap {
  height: 600px;
}
</style>
