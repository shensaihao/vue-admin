<template>
  <div>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="gmtCreate" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.gmtCreate) }}
        </template>
      </el-table-column>
      <el-table-column prop="tokenId" label="申请贴现的tokenid" align="center" />
      <el-table-column prop="tokenAmountDiscount" label="申请贴现金额" align="center" />
      <el-table-column prop="acceptDate" label="商票承兑日期" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.acceptDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="日利率" align="center" />
      <el-table-column prop="rptotal" label="原始商票面额" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >去审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDate(time) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/discount/apply/detail', query: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
