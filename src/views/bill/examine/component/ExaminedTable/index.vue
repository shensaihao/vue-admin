<template>
  <div>
    <el-table key="examined" :data="data" style="width: 100%">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center" />
      <el-table-column prop="passTime" label="通过时间" align="center" />
      <el-table-column prop="address" label="签发企业承兑时间戳" align="center" />
      <el-table-column prop="contractName" label="合同名称" align="center" />
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="total" label="申请贴现金额" align="center" />
      <el-table-column prop="acceptanceStatus" align="center">
        <template slot="header">
          <el-popover
            placement="bottom"
            width="140"
          >
            <div>
              <input v-model="pass" type="radio" name="pass" value="all" @change="handelChange">
              <span>全部</span>
            </div>
            <div>
              <input v-model="pass" type="radio" name="pass" value="unpass" @change="handelChange">
              <span>不通过</span>
            </div>
            <div>
              <input v-model="pass" type="radio" name="pass" value="pass" @change="handelChange">
              <span>已通过</span>
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
          >不通过</el-tag>
          <el-tag
            v-if="scope.row.acceptanceStatus===1"
            type="paimary"
            size="small"
          >通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >查看</el-button>
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
  data() {
    return {
      visible: true,
      pass: 'all'
    }
  },
  methods: {
    handelChange(sta) {
      this.$emit('filter', this.pass)
    },
    handelClose() {
      this.visible = false
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/bill/examine/detail', query: { id: row.id }})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
