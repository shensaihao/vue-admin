<template>
  <div>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.applicationCreateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="acceptDate" label="汇票到期日" align="center" />
      <!-- <el-table-column prop="expireDate" label="承兑日期" align="center" /> -->
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="rptotal" sortable label="票据面额" align="center" />
      <el-table-column prop="acceptanceStatus" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.acceptanceStatus===0"
            type="warning"
            size="small"
          >临期</el-tag>
          <el-tag
            v-if="scope.row.acceptanceStatus===1"
            type="paimary"
            size="small"
          >正常</el-tag>
          <el-tag
            v-if="scope.row.acceptanceStatus===2"
            type="danger"
            size="small"
          >已过期</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="noticeAccptance(scope.$index, scope.row)"
          >催办</el-button>
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
import { urgeOneAcceptance } from '@/api/bill'
export default {
  name: 'AccptancedTable',
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
  data() {
    return {
      visible: false,
      acceptanceStatusCheckList: []
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
    handelFilterAcceptanceStatus() {
      this.$emit('filter', this.acceptanceStatusCheckList)
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/bill/acceptance/detail', query: { id: row.id }})
    },
    noticeAccptance(index, row) {
      urgeOneAcceptance(row.id).then((res) => {
        this.$message.success('催办成功')
      }).catch(() => {
        this.$message.error('催办失败，请重新加载')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
