<template>
  <div>
    <el-table key="examine" v-loading="loading" :data="data" style="width: 100%" :header-cell-style="headClass">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.applicationCreateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="contractName" label="合同名称" align="center" />
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="rptotal" label="票据面额" align="center" />
      <el-table-column prop="acceptDate" label="汇票到期日" align="center" />
      <el-table-column label="商票扫描件" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            class="m-r-10"
            @click="draftFrontPage(scope.$index, scope.row)"
          >正面</el-button>
          <el-button
            type="text"
            size="small"
            @click="draftBackPage(scope.$index, scope.row)"
          >背面</el-button>
        </template>
      </el-table-column>
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
  data() {
    return {
    }
  },
  methods: {
    headClass() {
      return 'background: #F9FAFC;'
    },
    getDate(time) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/bill/examine/detail', query: { id: row.id }})
    },
    draftBackPage(index, row) {
      this.$emit('back', row)
    },
    draftFrontPage(index, row) {
      this.$emit('front', row)
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
