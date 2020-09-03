<template>
  <div>
    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.applicationCreateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="passedTime" label="通过时间" align="center" />
      <el-table-column prop="acceptDate" label="汇票到期日" align="center" />
      <!-- <el-table-column prop="address" label="距离到期日期还剩" align="center" /> -->
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="acceptedAmount" sortable label="承兑金额" align="center" />
      <el-table-column prop="acceptanceStatus" label="票据状态" align="center">
        <template slot="header">
          <el-popover
            placement="bottom"
            width="140"
          >
            <div>
              <input v-model="acceptanceStatusCheckList" type="checkbox" value="all" @change="handelFilterAcceptanceStatus">
              <span>全部</span>
            </div>
            <div>
              <input v-model="acceptanceStatusCheckList" type="checkbox" :value="0" @change="handelFilterAcceptanceStatus">
              <span>正常</span>
            </div>
            <div>
              <input v-model="acceptanceStatusCheckList" type="checkbox" :value="1" @change="handelFilterAcceptanceStatus">
              <span>临期</span>
            </div>
            <div>
              <input v-model="acceptanceStatusCheckList" type="checkbox" :value="2" @change="handelFilterAcceptanceStatus">
              <span>已过期</span>
            </div>

            <div slot="reference">
              <span>票据状态</span>
              <i class="el-icon-caret-bottom" />
            </div>
          </el-popover>
        </template>
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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >去确认</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Confirmtable',
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
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
