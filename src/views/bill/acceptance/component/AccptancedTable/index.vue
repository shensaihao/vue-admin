<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center" />
      <el-table-column prop="expireDate" label="票据到期日" align="center" />
      <el-table-column prop="address" label="承兑日期" align="center" />
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="total" sortable label="申请贴现金额" align="center" />
      <el-table-column prop="address" label="确认承兑的人员" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Accptancedtable',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    gotoDetail(index, row) {
      this.$router.push({ path: '/bill/acceptance/detail', query: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
