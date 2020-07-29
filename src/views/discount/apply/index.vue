<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20" class="m-b-20 m-t-20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-115">申请编号</span>
          <el-input v-model="searchForm.discountId" placeholder="请输入" style="width:250px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-115">贴现申请人名称</span>
          <el-input v-model="searchForm.discountApplicantName" placeholder="请输入" style="width:250px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-115">申请贴现的tokenID</span>
          <el-input v-model="searchForm.tokenId" placeholder="请输入" style="width:250px" size="small" class="m-l-10" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-115">申请时间</span>
          <el-date-picker
            v-model="searchForm.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            size="small"
            style="width: 250px"
            class="m-l-10"
          />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-115">搜索承兑金额</span>
          <el-input v-model="searchForm.minAmount" placeholder="最小" style="width:100px" size="small" class="m-l-10" />
          <el-input v-model="searchForm.maxAmount" placeholder="最大" style="width:100px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7" class="flex-start">
          <el-button class="m-b-20" type="primary" size="small" @click="searchList">搜索</el-button>
          <el-button class="m-b-20 m-l-10" type="primary" size="small" @click="resetList">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-card">
      <el-tabs v-model="activeName" @tab-click="changeStatus">
        <el-tab-pane label="待审核" name="examine">
          <ExamineTable :data="examineData" />
        </el-tab-pane>
        <el-tab-pane label="待贴现" name="discount">
          <DiscountTable :data="discountData" />
        </el-tab-pane>
        <el-tab-pane label="已审核" name="examined">
          <ExaminedTable :data="examinedData" />
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

  </div>
</template>

<script>
import { getDiscountList } from '@/api/discount'
import ExaminedTable from './component/ExaminedTable/index'
import ExamineTable from './component/ExamineTable/index'
import DiscountTable from './component/DiscountTable/index'

export default {
  components: {
    ExaminedTable,
    ExamineTable,
    DiscountTable
  },
  data() {
    return {
      activeName: 'examine',
      tableData: [],
      total: 0,
      page: 1,
      size: 20,
      examineData: [],
      examinedData: [],
      discountData: [],
      searchForm: {}
    }
  },
  created() {
    const discountQuery = {
      page: 1,
      size: 20,
      status: 1
    }
    this.getExamineData(discountQuery)
  },
  methods: {
    handleSizeChange(size) {
      this.size = size
    },
    handleCurrentChange(page) {
      this.page = page
    },
    getDiscountData(discountQuery) {
      getDiscountList(discountQuery).then((res) => {
        if (res.content) {
          this.discountData = res.content.list
          this.total = res.content.count
        } else {
          this.discountData = []
          this.total = 0
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    getExamineData(discountQuery) {
      getDiscountList(discountQuery).then((res) => {
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
    getExaminedData(discountQuery) {
      getDiscountList(discountQuery).then((res) => {
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
    changeStatus() {
      this.searchForm = {}
      if (this.activeName === 'discount') {
        const discountQuery = {
          page: 1,
          size: 20,
          status: 2
        }
        this.getDiscountData(discountQuery)
      }
      if (this.activeName === 'examine') {
        const discountQuery = {
          page: 1,
          size: 20,
          status: 1
        }
        this.getExamineData(discountQuery)
      }
      if (this.activeName === 'examined') {
        const discountQuery = {
          page: 1,
          size: 20,
          status: 3
        }
        this.getExaminedData(discountQuery)
      }
    },
    resetList() {
      this.changeStatus()
    },
    searchList() {
      if (this.activeName === 'discount') {
        if (this.searchForm) {
          const { discountApplicantName, tokenId, discountId, time, minAmount, maxAmount } = this.searchForm
          const discountQuery = {
            discountApplicantName,
            tokenId,
            discountId,
            page: this.page,
            size: this.size,
            status: 2,
            minAmount,
            maxAmount
          }
          if (this.searchForm.time) {
            discountQuery.startDate = time[0]
            discountQuery.endDate = time[1]
          }
          this.getDiscountData(discountQuery)
        } else {
          const discountQuery = {
            page: 1,
            size: 20,
            status: 2
          }
          this.getDiscountData(discountQuery)
        }
      } else if (this.activeName === 'examine') {
        if (this.searchForm) {
          const { discountApplicantName, tokenId, discountId, time, minAmount, maxAmount } = this.searchForm
          const discountQuery = {
            discountApplicantName,
            tokenId,
            discountId,
            page: this.page,
            size: this.size,
            status: 1,
            minAmount,
            maxAmount
          }
          if (this.searchForm.time) {
            discountQuery.startDate = time[0]
            discountQuery.endDate = time[1]
          }
          this.getExamineData(discountQuery)
        } else {
          const discountQuery = {
            page: 1,
            size: 20,
            status: 1
          }
          this.getExamineData(discountQuery)
        }
      } else {
        if (this.searchForm) {
          const { discountApplicantName, tokenId, discountId, time, minAmount, maxAmount } = this.searchForm
          const discountQuery = {
            discountApplicantName,
            tokenId,
            discountId,
            page: this.page,
            size: this.size,
            status: 3,
            minAmount,
            maxAmount
          }
          if (this.searchForm.time) {
            discountQuery.startDate = time[0]
            discountQuery.endDate = time[1]
          }
          this.getExaminedData(discountQuery)
        } else {
          const discountQuery = {
            page: 1,
            size: 20,
            status: 3
          }
          this.getExaminedData(discountQuery)
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
