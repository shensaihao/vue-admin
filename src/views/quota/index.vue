<template>
  <div>
    <el-card class="my-card">
      <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
      <el-form :inline="true" :model="companyQuery" class="qupta-form-inline" size="small">
        <el-form-item label="搜索企业名称">
          <el-input v-model="companyQuery.companyName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="搜索企业ID">
          <el-input v-model="companyQuery.companyId" placeholder="请输入" />
        </el-form-item>
        <el-form-item class="text-right">
          <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
          <el-button size="small" class="m-l-10" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="enterpriseList" border style="width: 100%">
        <el-table-column prop="accountName" label="账户名称" align="center" />
        <el-table-column prop="accountNumber" label="银行账号" align="center" />
        <el-table-column prop="bankName" label="所属银行" align="center" />
        <el-table-column prop="bankAddress" label="开户行" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click.native.prevent="editQuota(scope.$index, scope.row)"
            >修改额度</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[20, 50, 100, 150]"
        :page-size="100"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="align-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-dialog :visible.sync="dialogVisible" title="修改企业额度" width="40%" style="padding:0">
        <div class="m-b-20">
          <el-tag><i class="el-icon-warning" />若您调整后的额度低于企业已占用额度，则企业可用余额度自动置为0。</el-tag>
        </div>
        <div class="m-b-20">
          <span class="font-weight">调整额度为：</span>
          <el-input v-model="limit" style="width: 100px" />元
        </div>
        <div class="flex-between">
          <div>
            <div class="m-b-20">
              当前企业总额度：500000元
            </div>
            <div class="m-b-20">
              当前企业可用额度：200000元
            </div>
            <div class="m-b-20">
              当前企业已占用额度：300000元
            </div>
          </div>
          <div>
            <i class="el-icon-right" style="font-size: 56px; font-weight: blod;color: #ccc" />
          </div>
          <div>
            <div class="m-b-20">
              调整后企业总额度：500000元
            </div>
            <div class="m-b-20">
              调整后企业可用额度：200000元
            </div>
            <div class="m-b-20">
              当前企业已占用额度：300000元
            </div>
          </div>
        </div>
        <div style="text-align:right;">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" class="m-l-10" @click="confirmEdit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// import PanelGroup from './component/PanelGroup'
import { getEnterpriseList, editEnterpriseQuota } from '@/api/quota'

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
  // components: {
  //   PanelGroup
  // },
  data() {
    return {
      total: 0,
      page: 1,
      size: 20,
      enterpriseInfo: {},
      companyQuery: {
        companyName: '',
        companyId: ''
      },
      enterpriseList: [],
      dialogVisible: false,
      newquota: '',
      lineChartData: lineChartData.newVisitis,
      limit: 0
    }
  },
  created() {
    this.getEnterpriseList()
  },
  methods: {
    getEnterpriseList() {
      const { companyName, companyId } = this.companyQuery
      const companyQuery = {
        companyName,
        companyId
      }
      getEnterpriseList(companyQuery).then((res) => {
        this.enterpriseList = res.content.list
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    editQuota(index, row) {
      this.companyQuery = row
      this.dialogVisible = true
    },
    handleSizeChange(size) {
      this.size = size
    },
    handleCurrentChange(page) {
      this.page = page
    },
    onSubmit() {
      this.getEnterpriseList()
    },
    reset() {
      this.companyQuery = {}
      this.getEnterpriseList()
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    confirmEdit() {
      const { companyName, companyId } = this.companyQuery
      const companyQuery = {
        limit: this.limit,
        companyName,
        companyId
      }
      editEnterpriseQuota(companyQuery).then((res) => {
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.qupta-form-inline {
  margin-top: 20px;
}
</style>
