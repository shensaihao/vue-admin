<template>
  <div v-loading="loading">
    <el-card class="my-card">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />

    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './component/PanelGroup'
import { getEnterpriseInfo } from '@/api/dashboard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Dashboard',
  components: {
    PanelGroup
  },
  data() {
    return {
      loading: false,
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    created() {
      this.getInfo()
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getInfo() {
      this.loading = true
      getEnterpriseInfo().then((res) => {
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
