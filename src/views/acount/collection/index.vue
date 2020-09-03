<template>
  <el-card v-loading="loading" class="my-card" shadow="hover">
    <el-button type="primary" class="m-b-20" @click="handelClickAdd">新增账户</el-button>
    <el-table :data="collectionList" style="width: 100%" :row-class-name="defaultAccount">
      <el-table-column prop="accountName" label="账户名称" width="180" />
      <el-table-column prop="accountNumber" label="银行账号" width="180" />
      <el-table-column prop="bankName" label="所属银行" />
      <el-table-column prop="bankAddress" label="开户行" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="watchRecord(scope.$index, scope.row)"
          >查看对应的开票记录</el-button>
          <el-button
            v-if="!scope.row.isDefault"
            type="text"
            size="small"
            class="m-l-10"
            @click.native.prevent="setPreventAcount(scope.$index, scope.row)"
          >设为默认账户</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="账户名称：" prop="name">
          <el-input v-model="ruleForm.accountName" />
        </el-form-item>
        <el-form-item label="银行账号：" prop="number">
          <el-input v-model="ruleForm.accountNumber" />
        </el-form-item>
        <el-form-item label="所属银行：" prop="bank">
          <el-input v-model="ruleForm.bankName" />
        </el-form-item>
        <el-form-item label="开户行：" prop="address">
          <el-input v-model="ruleForm.bankAddress" />
        </el-form-item>
        <el-form-item prop="isPrimary">
          <el-checkbox v-model="ruleForm.isPrimary">
            设为默认账户
          </el-checkbox>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" class="m-l-10" @click="onSubmit('ruleForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script>
import { setPrimaryAcount, addNewAcount, getHistoryAcount } from '@/api/acount'

export default {
  data() {
    return {
      ruleForm: {},
      hasAdded: false,
      collectionList: [],
      tableData: [],
      total: 0,
      page: 1,
      size: 20,
      dialogVisible: false,
      loading: false
    }
  },
  created() {
    this.getHistoryAcount()
  },
  methods: {
    getHistoryAcount() {
      this.loading = true
      getHistoryAcount(this.page).then((res) => {
        this.collectionList = res.content.list
        this.total = res.content.count
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    defaultAccount({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'default-row'
      }
    },
    handleSizeChange(size) {
      this.size = size
      this.getHistoryAcount()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getHistoryAcount()
    },
    handelClickAdd() {
      this.dialogVisible = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const bankAccount = this.ruleForm
          addNewAcount(bankAccount).then((res) => {
            this.getHistoryAcount()
            this.dialogVisible = false
          }).catch((err) => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
        } else {
          this.$message.error('请正确填写账号信息')
          return false
        }
      })
    },
    cancelAddNew() {
      this.hasAdded = false
    },
    setPreventAcount(index, row) {
      setPrimaryAcount(row.id).then((res) => {
        this.$message.success('设置成功')
      }).catch(() => {
        this.$message.success('设置失败')
      })
    },
    watchRecord(row) {
      this.$router.push({ path: '/bill/examine', params: { acount: row.acount }})
    }
  }
}
</script>
<style lang="scss">
.demo-ruleForm {
  width: 500px;
}
.account-button {
  margin-bottom: 20px;
}
.el-table .default-row {
  background: #f4f4f5;
}
</style>
