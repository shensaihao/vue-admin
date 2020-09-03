<template>
  <el-dialog :visible.sync="companyVisible" :before-close="beforeClose" title="新增授信企业" width="40%" style="padding:0">
    <el-form v-if="step===2" :inline="true" :model="companyQuery" class="qupta-form-inline" size="small">
      <el-form-item label="企业编号：">
        <el-input v-model="companyQuery.no" disabled placeholder="请输入" />
      </el-form-item>
      <el-form-item label="企业名称：">
        <el-input v-model="companyQuery.companyName" disabled placeholder="请输入" />
      </el-form-item>
      <el-form-item label="授信额度">
        <el-input v-model="companyQuery.limit" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="日利率">
        <el-input v-model="companyQuery.rate" clearable placeholder="请输入" />
      </el-form-item>
    </el-form>
    <el-form v-if="step===1" :inline="true" :model="companyQuery" class="qupta-form-inline" size="small">
      <el-form-item label="企业编号">
        <el-input v-model="companyQuery.no" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="companyQuery.companyName" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-if="step===1" :data="enterpriseList" style="width: 100%" :select="handelSelect">
      <el-table-column
        type="selection"
        width="55"
        :selectable="selectDisableRoom"
      />
      <el-table-column prop="id" label="企业编号" align="center" />
      <el-table-column prop="name" label="企业名称" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status?'已授信':'未授信' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.status"
            size="small"
            type="text"
            @click.native.prevent="chooseCompany(scope.row)"
          >选择该企业</el-button>
          <span v-if="scope.row.status">不可选择</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:right;margin-top:20px">
      <el-button @click="beforeClose">取消</el-button>
      <el-button v-if="step===1" type="primary" class="m-l-10" @click="nextStep">下一步</el-button>
      <el-button v-if="step===2" type="primary" class="m-l-10" :disabled="selected.length===0" @click="prevStep">上一步</el-button>
      <el-button v-if="step===2" type="primary" class="m-l-10" @click="confirmEdit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { searchLimitManageList } from '@/api/quota'
export default {
  props: {
    companyVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      companyQuery: {},
      enterpriseList: [],
      step: 1,
      page: 1,
      size: 20,
      selected: []
    }
  },
  created() {
    const query = {
      page: this.page,
      size: this.size
    }
    this.searchLimitManageList(query)
  },
  methods: {
    handelSelect(selection, row) {
      this.selected.push(row)
    },
    selectDisableRoom(row, index) {
      if (row.status) {
        return false
      } else {
        return true
      }
    },
    searchLimitManageList(query) {
      searchLimitManageList(query).then((res) => {
        if (res.content) {
          this.enterpriseList = res.content.list
        } else {
          this.enterpriseList = []
        }
      }).catch(() => {
        this.$message.error('请求失败')
      })
    },
    onSubmit() {
      const query = {
        page: this.page,
        size: this.size,
        ...this.companyQuery
      }
      this.searchLimitManageList(query)
    },
    chooseCompany(row) {
      this.companyQuery = row
    },
    nextStep() {
      this.step += 1
    },
    prevStep() {
      this.step -= 1
    },
    confirmEdit() {
      this.$emit('confirmadd', this.companyQuery)
    },
    beforeClose() {
      this.$emit('close')
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
