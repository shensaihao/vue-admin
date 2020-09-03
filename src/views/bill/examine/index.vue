<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20" class="m-b-20 m-t-20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-110">申请编号：</span>
          <el-input v-model="searchForm.reviewId" placeholder="请输入" style="width:200px" size="small" class="m-l-10 tetx-left" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-110">受信企业名称：</span>
          <el-input v-model="searchForm.drawerName" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-110">合同名称：</span>
          <el-input v-model="searchForm.contractName" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-110">申请时间：</span>
          <el-date-picker
            v-model="searchForm.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            style="width: 200px"
            class="m-l-10 tetx-left"
            value-format="timestamp"
          />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-110">承兑金额：</span>
          <el-input v-model.number="searchForm.minAmount" placeholder="最小" style="width:100px" size="small" class="m-l-10" />
          <el-input v-model.number="searchForm.maxAmount" placeholder="最大" style="width:100px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <el-button type="primary" size="small" @click="searchList">搜索</el-button>
          <el-button class="m-l-10" size="small" @click="resetList">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-card">
      <el-tabs v-model="activeName" @tab-click="changeStatus">
        <el-tab-pane label="待审核" name="examine">
          <ExamineTable :data="examineData" :loading="loading" @front="draftFrontPage" @back="draftBackPage" />
        </el-tab-pane>
        <el-tab-pane label="已审核" name="examined">
          <ExaminedTable :data="examinedData" :loading="loading" @filter="handelFilterStatus" />
        </el-tab-pane>
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
      </el-tabs>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-image :src="imageUrl" fit="fit">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { getExamineList } from '@/api/bill'
import ExamineTable from './component/ExamineTable/index'
import ExaminedTable from './component/ExaminedTable/index'

export default {
  components: {
    ExaminedTable,
    ExamineTable
  },
  data() {
    return {
      loading: false,
      tabPosition: '1',
      tableData: [],
      total: 0,
      page: 1,
      size: 20,
      value1: '',
      searchForm: {},
      examineData: [],
      examinedData: [],
      dialogVisible: false,
      imageUrl: '',
      activeName: 'examine',
      status: 1
    }
  },
  created() {
    const draftQuery = {
      page: this.page,
      size: this.size,
      status: this.status
    }
    this.getExamineData(draftQuery)
  },
  methods: {
    handleSizeChange(size) {
      this.size = size
      const draftQuery = {
        page: 1,
        size: this.size,
        status: this.status,
        ...this.searchForm
      }
      if (this.status === 1) {
        this.getExamineData(draftQuery)
      }
      if (this.status === 2) {
        this.getExaminedData(draftQuery)
      }
    },
    handleCurrentChange(page) {
      this.page = page
      const draftQuery = {
        page: this.page,
        size: this.size,
        status: this.status,
        ...this.searchForm
      }
      if (this.status === 1) {
        this.getExamineData(draftQuery)
      }
      if (this.status === 2) {
        this.getExaminedData(draftQuery)
      }
    },
    handelFilterStatus(status) {
      if (status === 'all') {
        this.searchForm = {
          ...this.searchForm,
          confirm: null,
          page: 1,
          size: this.size,
          status: this.status
        }
      } else if (status === 'unpass') {
        this.searchForm = {
          ...this.searchForm,
          confirm: false,
          page: 1,
          size: this.size,
          status: this.status
        }
      } else {
        this.searchForm = {
          ...this.searchForm,
          confirm: true,
          page: 1,
          size: this.size,
          status: this.status
        }
      }
      this.getExaminedData(this.searchForm)
    },
    getExamineData(draftQuery) {
      this.loading = true
      getExamineList(draftQuery).then((res) => {
        if (res.content) {
          this.examineData = res.content.list
          this.total = res.content.count
        } else {
          this.examineData = []
          this.total = 0
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
    changeStatus() {
      this.searchForm = {}
      if (this.activeName === 'examine') {
        this.status = 1
        const draftQuery = {
          page: 1,
          size: this.size,
          status: this.status
        }
        this.getExamineData(draftQuery)
      } else {
        this.status = 2
        const draftQuery = {
          page: 1,
          size: this.size,
          status: this.status
        }
        this.getExaminedData(draftQuery)
      }
    },
    draftFrontPage(row) {
      axios.post('http://182.148.53.142:19837/partner/obtain_url', qs.stringify({ ossKey: row.draftUrl1 })).then((res) => {
        if (res.data.code === 0) {
          this.dialogVisible = true
          this.imageUrl = res.data.data
        } else {
          this.$message(res.data.message)
        }
      }).catch(() => {
        this.$message('图片获取失败')
      })
    },
    draftBackPage(row) {
      axios.post('http://182.148.53.142:19837/partner/obtain_url', qs.stringify({ ossKey: row.draftUrl2 })).then((res) => {
        if (res.data.code === 0) {
          this.dialogVisible = true
          this.imageUrl = res.data.data
        } else {
          this.$message(res.data.message)
        }
      }).catch(() => {
        this.$message('图片获取失败')
      })
    },
    searchExamineList() {
      this.getExamineData()
    },
    getExaminedData(draftQuery) {
      this.loading = true
      getExamineList(draftQuery).then((res) => {
        if (res.content) {
          this.examinedData = res.content.list
          this.total = res.content.count
        } else {
          this.examinedData = []
          this.total = 0
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
    resetList() {
      this.changeStatus()
    },
    searchList() {
      if (this.activeName === 'examine') {
        if (this.searchForm) {
          const { contractName, drawerName, reviewId, time, minAmount, maxAmount } = this.searchForm
          const draftQuery = {
            contractName,
            drawerName,
            reviewId,
            page: 1,
            size: this.size,
            status: this.status,
            minAmount,
            maxAmount
          }
          if (this.searchForm.time) {
            draftQuery.startDate = time[0]
            draftQuery.endDate = time[1]
          }
          this.getExamineData(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: this.size,
            status: this.status
          }
          this.getExamineData(draftQuery)
        }
      } else {
        if (this.searchForm) {
          const { contractName, drawerName, reviewId, time, minAmount, maxAmount } = this.searchForm
          const draftQuery = {
            contractName,
            drawerName,
            reviewId,
            page: 1,
            size: this.size,
            status: this.status,
            minAmount,
            maxAmount
          }
          if (this.searchForm.time) {
            draftQuery.startDate = time[0]
            draftQuery.endDate = time[1]
          }
          this.getExaminedData(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: this.size,
            status: this.status
          }
          this.getExaminedData(draftQuery)
        }
      }
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
