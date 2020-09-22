<template>
  <div>
    <el-card class="my-card">
      <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
      <el-form :inline="true" :model="companyQuery" class="qupta-form-inline" size="small">
        <el-form-item label="企业编号">
          <el-input v-model="companyQuery.no" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="companyQuery.companyName" placeholder="请输入" />
        </el-form-item>
        <el-form-item class="text-right">
          <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
          <el-button size="small" class="m-l-10" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" size="small" @click="handelClickAdd">
        新增授信企业
      </el-button>
      <el-table v-loading="loading" :data="enterpriseList" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column prop="id" label="企业编号" align="center" />
        <el-table-column prop="name" label="企业名称" align="center" />
        <el-table-column prop="limitNum" label="授信额度" align="center" />
        <el-table-column prop="limitUsed" label="已使用额度" align="center" />
        <el-table-column prop="limitAvailable" label="可用额度" align="center" />
        <el-table-column prop="limitFrozen" label="冻结额度" align="center" />
        <el-table-column prop="rate" label="日利率" align="center" />
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
        :page-size="size"
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
              当前企业总额度：{{ companyQuery.limitNum }}元
            </div>
            <div class="m-b-20">
              当前企业可用额度：{{ companyQuery.limitAvailable }}元
            </div>
            <div class="m-b-20">
              当前企业已用额度：{{ companyQuery.limitUsed }}元
            </div>
          </div>
          <div>
            <i class="el-icon-right" style="font-size: 56px; font-weight: blod;color: #ccc" />
          </div>
          <div>
            <div class="m-b-20">
              调整后企业总额度：{{ limit }}元
            </div>
            <div class="m-b-20">
              调整后企业可用额度：{{ limit - companyQuery.limitUsed <= 0 ? 0 : limit - companyQuery.limitUsed }}元
            </div>
            <div class="m-b-20">
              当前企业已占用额度：{{ companyQuery.limitUsed }}元
            </div>
          </div>
        </div>
        <div style="text-align:right;">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" class="m-l-10" @click="confirmEdit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <AddCompany :company-visible="companyVisible" @confirmadd="handelConfirmAddCompany" @close="closeAddDialog" />
  </div>
</template>

<script>
// import PanelGroup from './component/PanelGroup'
import { getEnterpriseList, editEnterpriseQuota, addLimitManage } from '@/api/quota'
import AddCompany from './component/AddCompany'

export default {
  components: {
    AddCompany
  },
  data() {
    return {
      total: 0,
      page: 1,
      size: 20,
      enterpriseInfo: {},
      companyQuery: {
        companyName: '',
        no: ''
      },
      enterpriseList: [],
      dialogVisible: false,
      newquota: '',
      limit: 0,
      companyVisible: false,
      loading: false
    }
  },
  created() {
    const companyQuery = {
      page: 1,
      size: 20
    }
    this.getEnterpriseList(companyQuery)
  },
  methods: {
    handelClickAdd() {
      this.companyVisible = true
    },
    handelConfirmAddCompany(query) {
      const { id, limit, rate } = query
      const q = { id, limit, rate }
      addLimitManage(q).then((res) => {
        this.$message.success('添加成功')
      }).catch((err) => {
        this.$message.error(err)
      })
      console.log(query)
      console.log('con')
    },
    closeAddDialog() {
      this.companyVisible = false
    },
    getEnterpriseList(companyQuery) {
      this.loading = true
      getEnterpriseList(companyQuery).then((res) => {
        if (res.content) {
          this.enterpriseList = res.content.list
          this.total = res.content.count
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    editQuota(index, row) {
      this.companyQuery = row
      this.limit = row.limitNum
      this.dialogVisible = true
    },
    handleSizeChange(size) {
      this.size = size
      const { companyName, no } = this.companyQuery
      const companyQuery = {
        page: 1,
        size: this.size,
        companyName,
        no
      }
      this.getEnterpriseList(companyQuery)
    },
    handleCurrentChange(page) {
      this.page = page
      const { companyName, no } = this.companyQuery
      const companyQuery = {
        page: this.page,
        size: this.size,
        companyName,
        no
      }
      this.getEnterpriseList(companyQuery)
    },
    onSubmit() {
      const { companyName, no } = this.companyQuery
      const companyQuery = {
        page: 1,
        size: this.size,
        companyName,
        no
      }
      this.getEnterpriseList(companyQuery)
    },
    reset() {
      this.companyQuery = {}
      const companyQuery = {
        page: 1,
        size: 20,
        ...this.companyQuery
      }
      this.getEnterpriseList(companyQuery)
    },
    confirmEdit() {
      const { id } = this.companyQuery
      editEnterpriseQuota(id, this.limit).then((res) => {
        this.$message.success('修改成功')
        const companyQuery = {
          page: 1,
          size: 20
        }
        this.getEnterpriseList(companyQuery)
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
