<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20" class="m-b-20 m-t-20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-115">申请编号</span>
          <el-input v-model="searchForm.reviewId" placeholder="请输入" style="width:300px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-115">受信企业名称</span>
          <el-input v-model="searchForm.drawerName" placeholder="请输入" style="width:300px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-115">合同名称</span>
          <el-input v-model="searchForm.contractName" placeholder="请输入" style="width:300px" size="small" class="m-l-10" />
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
            style="width: 300px"
            class="m-l-10"
          />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-115">承兑金额</span>
          <el-input v-model="searchForm.minAmount" placeholder="最小" style="width:100px" size="small" class="m-l-10" />
          <el-input v-model="searchForm.maxAmount" placeholder="最大" style="width:100px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <el-button type="primary" size="small" @click="searchList">搜索</el-button>
          <el-button size="small" class="m-l-10" @click="resetList">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-card">
      <el-tabs v-model="activeName" @tab-click="changeStatus">
        <el-tab-pane label="待承兑" name="acceptance">
          <AccptanceTable :data="toAcceptanceData" @filter="handelFilter" />
        </el-tab-pane>
        <el-tab-pane label="待确认承兑" name="confirm">
          <ConfirmTable :data="confirmData" @filter="handelFilter" />
        </el-tab-pane>
        <el-tab-pane label="已承兑" name="acceptanced">
          <AccptancedTable :data="acceptancedData" />
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
import { acceptanceList } from '@/api/bill'
import ConfirmTable from './component/ConfirmTable/index'
import AccptancedTable from './component/AccptancedTable/index'
import AccptanceTable from './component/AccptanceTable/index'
export default {
  components: {
    ConfirmTable,
    AccptancedTable,
    AccptanceTable
  },
  data() {
    return {
      activeName: 'acceptance',
      impending: false,
      searchForm: {},
      confirmData: [],
      toAcceptanceData: [],
      acceptancedData: [],
      acceptanceStatusCheckList: [],
      tableData: [],
      visible: false,
      total: 0,
      page: 1,
      size: 20,
      status: 1
    }
  },
  created() {
    const draftQuery = {
      page: 1,
      size: 20,
      status: 1
    }
    this.getAcceptanceBillList(draftQuery)
  },
  methods: {
    handleSizeChange(size) {
      this.size = size
    },
    handleCurrentChange(page) {
      this.page = page
    },
    handelFilter(status) {
      if (status.length) {
        if (status.indexOf('all') !== -1) {
          this.searchForm = {
            ...this.searchForm,
            page: 1,
            size: 20,
            status: this.status,
            acceptanceStatus: null
          }
        } else {
          this.searchForm = {
            ...this.searchForm,
            page: 1,
            size: 20,
            status: this.status,
            acceptanceStatus: status
          }
        }
        if (this.status === 1) {
          this.getAcceptanceBillList(this.searchForm)
        }
        if (this.status === 2) {
          this.getConfirmBillList(this.searchForm)
        }
      } else {
        console.log(status.length)
        this.searchForm = {
          ...this.searchForm,
          page: 1,
          size: 20,
          status: this.status,
          acceptanceStatus: null
        }
        if (this.status === 1) {
          this.getAcceptanceBillList(this.searchForm)
        }
        if (this.status === 2) {
          this.getConfirmBillList(this.searchForm)
        }
      }
    },
    getConfirmBillList(draftQuery) {
      acceptanceList(draftQuery).then((res) => {
        if (res.content) {
          this.confirmData = res.content.list
          this.total = res.content.count
        } else {
          this.confirmData = []
          this.total = 0
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    getAcceptanceBillList(draftQuery) {
      acceptanceList(draftQuery).then((res) => {
        if (res.content) {
          this.toAcceptanceData = res.content.list
          this.total = res.content.count
        } else {
          this.toAcceptanceData = []
          this.total = 0
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    getAcceptancedBillList(draftQuery) {
      acceptanceList(draftQuery).then((res) => {
        if (res.content) {
          this.acceptancedData = res.content.list
          this.total = res.content.count
        } else {
          this.acceptancedData = []
          this.total = 0
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    resetList() {
      this.changeStatus()
    },
    searchList() {
      if (this.activeName === 'acceptance') {
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
          this.getAcceptanceBillList(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: 20,
            status: 1
          }
          this.getAcceptanceBillList(draftQuery)
        }
      } else if (this.activeName === 'confirm') {
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
          this.getConfirmBillList(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: 20,
            status: 2
          }
          this.getConfirmBillList(draftQuery)
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
            status: 3,
            minAmount,
            maxAmount
          }
          if (this.searchForm.time) {
            draftQuery.startDate = time[0]
            draftQuery.endDate = time[1]
          }
          this.getAcceptancedBillList(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: 20,
            status: 2
          }
          this.getAcceptancedBillList(draftQuery)
        }
      }
    },
    urgeProvisionalBills() {

    },
    handelFilterAcceptanceStatus() {

    },
    changeStatus() {
      this.searchForm = {}
      if (this.activeName === 'confirm') {
        this.status = 2
        const draftQuery = {
          page: 1,
          size: 20,
          status: 2
        }
        this.getConfirmBillList(draftQuery)
      } else if (this.activeName === 'acceptance') {
        this.status = 1
        const draftQuery = {
          page: 1,
          size: 20,
          status: 1
        }
        this.getAcceptanceBillList(draftQuery)
      } else {
        this.status = 3
        const draftQuery = {
          page: 1,
          size: 20,
          status: 3
        }
        this.getAcceptancedBillList(draftQuery)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
