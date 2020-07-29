<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20" class="m-b-20 m-t-20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b">申请编号：</span>
          <el-input v-model="searchForm.reviewId" placeholder="请输入" style="width:270px" size="small" class="m-l-10 tetx-left" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b text-right">受信企业名称：</span>
          <el-input v-model="searchForm.drawerName" placeholder="请输入" style="width:270px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b">合同名称：</span>
          <el-input v-model="searchForm.contractName" placeholder="请输入" style="width:270px" size="small" class="m-l-10" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b">申请时间：</span>
          <el-date-picker
            v-model="searchForm.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            style="width: 270px"
            class="m-l-10 tetx-left"
            value-format="timestamp"
          />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b text-right">承兑金额：</span>
          <el-input v-model.number="searchForm.minAmount" placeholder="最小" style="width:100px" size="small" class="m-l-10" />
          ～
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
          <ExamineTable :data="examineData" @front="draftFrontPage" @back="draftBackPage" />
        </el-tab-pane>
        <el-tab-pane label="已审核" name="examined">
          <ExaminedTable :data="examinedData" @filter="handelFilterStatus" />
        </el-tab-pane>
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
      </el-tabs>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-image :src="imageUrl" fit="fit" />
    </el-dialog>
  </div>
</template>

<script>
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
      activeName: 'examine'
    }
  },
  created() {
    const draftQuery = {
      page: this.page,
      size: this.size,
      status: 1
    }
    this.getExamineData(draftQuery)
  },
  methods: {
    handleSizeChange(size) {
      this.size = size
    },
    handleCurrentChange(page) {
      this.page = page
    },
    handelFilterStatus(status) {
      console.log(status)
      if (status === 'all') {
        this.searchForm = {
          ...this.searchForm,
          confirm: null,
          page: 1,
          size: 20,
          status: 2
        }
      } else if (status === 'unpass') {
        this.searchForm = {
          ...this.searchForm,
          confirm: false,
          page: 1,
          size: 20,
          status: 2
        }
      } else {
        this.searchForm = {
          ...this.searchForm,
          confirm: true,
          page: 1,
          size: 20,
          status: 2
        }
      }
      this.getExaminedData(this.searchForm)
    },
    getExamineData(draftQuery) {
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
      })
    },
    changeStatus() {
      this.searchForm = {}
      if (this.activeName === 'examine') {
        const draftQuery = {
          page: 1,
          size: 20,
          status: 1
        }
        this.getExamineData(draftQuery)
      } else {
        const draftQuery = {
          page: 1,
          size: 20,
          status: 2
        }
        this.getExaminedData(draftQuery)
      }
    },
    draftFrontPage(row) {
      this.dialogVisible = true
      this.imageUrl = row.draftUrl1
    },
    draftBackPage(row) {
      this.dialogVisible = true
      this.imageUrl = row.draftUrl2
    },
    searchExamineList() {
      this.getExamineData()
    },
    getExaminedData(draftQuery) {
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
            page: this.page,
            size: this.size,
            status: 1,
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
            size: 20,
            status: 1
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
            page: this.page,
            size: this.size,
            status: 2,
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
            size: 20,
            status: 2
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
