<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="10" class="m-b-20 m-t-20">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-110">申请编号：</span>
          <el-input v-model="searchForm.reviewId" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
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
      <el-row :gutter="10">
        <el-col :span="7" class="flex-start">
          <span class="ft-size-14 display-inline-b width-110">申请时间：</span>
          <el-date-picker
            v-model="searchForm.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            size="small"
            style="width: 200px"
            class="m-l-10"
          />
        </el-col>
        <el-col :span="7">
          <span class="ft-size-14 display-inline-b width-110">承兑金额：</span>
          <el-input v-model.number="searchForm.minAmount" placeholder="最小" style="width:95px" size="small" class="m-l-10" />
          <el-input v-model.number="searchForm.maxAmount" placeholder="最大" style="width:95px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="7">
          <el-button type="primary" size="small" style="width: 30%" @click="searchList">搜索</el-button>
          <el-button size="small" class="m-l-10" style="width: 30%" @click="resetList">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="my-card">
      <el-tabs v-model="activeName" @tab-click="changeStatus">
        <el-tab-pane label="待承兑" name="acceptance">
          <AccptanceTable :data="toAcceptanceData" :loading="loading" @filter="handelFilter" />
        </el-tab-pane>
        <el-tab-pane label="待确认承兑" name="confirm">
          <ConfirmTable :data="confirmData" :loading="loading" @filter="handelFilter" />
        </el-tab-pane>
        <el-tab-pane label="已承兑" name="acceptanced">
          <AccptancedTable :data="acceptancedData" :loading="loading" />
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
      status: 1,
      loading: false
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
      const draftQuery = {
        page: 1,
        size: this.size,
        status: this.status,
        ...this.searchForm
      }
      if (this.status === 1) {
        this.getAcceptanceBillList(draftQuery)
      }
      if (this.status === 2) {
        this.getConfirmBillList(draftQuery)
      }
      if (this.status === 3) {
        this.getAcceptancedBillList(draftQuery)
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
        this.getAcceptanceBillList(draftQuery)
      }
      if (this.status === 2) {
        this.getConfirmBillList(draftQuery)
      }
      if (this.status === 3) {
        this.getAcceptancedBillList(draftQuery)
      }
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
        if (this.status === 3) {
          this.getAcceptancedBillList(this.searchForm)
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
        if (this.status === 3) {
          this.getAcceptancedBillList(this.searchForm)
        }
      }
    },
    getConfirmBillList(draftQuery) {
      this.loading = true
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
      }).finally(() => {
        this.loading = false
      })
    },
    getAcceptanceBillList(draftQuery) {
      this.loading = true
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
      }).finally(() => {
        this.loading = false
      })
    },
    getAcceptancedBillList(draftQuery) {
      this.loading = true
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
      }).finally(() => {
        this.loading = false
      })
    },
    resetList() {
      this.changeStatus()
    },
    searchList() {
      if (this.status === 1) {
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
          this.getAcceptanceBillList(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: this.size,
            status: this.status
          }
          this.getAcceptanceBillList(draftQuery)
        }
      } else if (this.status === 2) {
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
          this.getConfirmBillList(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: this.size,
            status: this.status
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
          this.getAcceptancedBillList(draftQuery)
        } else {
          const draftQuery = {
            page: 1,
            size: this.size,
            status: this.status
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
          size: this.size,
          status: 2
        }
        this.getConfirmBillList(draftQuery)
      } else if (this.activeName === 'acceptance') {
        this.status = 1
        const draftQuery = {
          page: 1,
          size: this.size,
          status: 1
        }
        this.getAcceptanceBillList(draftQuery)
      } else {
        this.status = 3
        const draftQuery = {
          page: 1,
          size: this.size,
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
