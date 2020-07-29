<template>
  <div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="gmtCreate" label="申请时间" align="center" />
      <el-table-column prop="checkTime" label="通过时间" align="center" />
      <el-table-column prop="tokenId" label="申请贴现的tokenid" align="center" />
      <el-table-column prop="tokenAmountDiscount" label="申请贴现金额" align="center" />
      <el-table-column prop="expireTime" label="承兑到日期" align="center" />
      <el-table-column prop="interestRate" label="日利率" align="center" />
      <el-table-column prop="amount" label="原始商票面额" align="center" />
      <el-table-column prop="checkUserName" label="审核人员" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >进行贴现</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    gotoDetail(index, row) {
      this.$router.push({ path: '/discount/apply/detail', query: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
