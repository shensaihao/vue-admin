<template>
  <div>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="gmtCreate" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.gmtCreate) }}
        </template>
      </el-table-column>
      <el-table-column prop="checkTime" label="通过时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.checkTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="confirmTime" label="确认转账时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.checkTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="tokenAmountDiscount" label="申请贴现金额" align="center" />
      <el-table-column prop="actualPayAmount" label="贴现金额" align="center" />
      <el-table-column prop="rate" label="贴现日利率" align="center" />
      <el-table-column prop="tokenId" label="贴现tokenid" align="center" />
      <!-- <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.acceptanceStatus===0"
            type="warning"
            size="small"
          >不通过</el-tag>
          <el-tag
            v-if="scope.row.acceptanceStatus===1"
            type="paimary"
            size="small"
          >已完成</el-tag>
          <el-tag
            v-if="scope.row.acceptanceStatus===2"
            type="danger"
            size="small"
          >未收款</el-tag>
        </template>
      </el-table-column> -->
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
