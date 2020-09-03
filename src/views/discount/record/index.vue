<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8" class="flex-start">
          <span class="ft-size-14 display-inline-b width-130">搜索申请编号</span>
          <el-input v-model="searchForm.discountId" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="8">
          <span class="ft-size-14 display-inline-b width-130">搜索贴现申请人名称</span>
          <el-input v-model="searchForm.discountApplicantName" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="8">
          <span class="ft-size-14 display-inline-b width-130">搜索贴现tokenID</span>
          <el-input v-model="searchForm.tokenId" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span class="ft-size-14 display-inline-b width-130">搜索初始tokenID</span>
          <el-input v-model="searchForm.initialToken" placeholder="请输入" style="width:200px" size="small" class="m-l-10" />
        </el-col>
        <el-col :span="8" class="flex-start">
          <el-button class="m-b-20" size="small" type="primary" @click="searchList">搜索</el-button>
          <el-button class="m-l-10 m-b-20" size="small" @click="resetList">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-loading="loading" class="my-card">
      <el-table :data="recordList" style="width: 100%">
        <el-table-column prop="id" label="申请编号" align="center" />
        <el-table-column prop="gmtCreate" label="申请时间" align="center">
          <template slot-scope="scope">
            {{ getDate(scope.row.gmtCreate) }}
          </template>
        </el-table-column>
        <el-table-column prop="confirmTime" label="转账登记时间" align="center">
          <template slot-scope="scope">
            {{ getDate(scope.row.confirmTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="tokenId" label="贴现tokenid" align="center" />
        <el-table-column prop="motherToken" label="母tokenid" align="center" />
        <el-table-column prop="initialToken" label="商票初始tokenid" align="center" />
        <el-table-column prop="tokenAmountDiscount" label="申请贴现金额" align="center" />
        <el-table-column prop="actualPayAmount" label="转账金额" align="center" />
        <el-table-column prop="interestRate" label="日利率" align="center" />
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
    </el-card>
  </div>
</template>

<script>
import { getDiscountList } from '@/api/discount'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      total: 0,
      page: 1,
      size: 20,
      tableData: [],
      recordList: [],
      searchForm: {},
      loading: false
    }
  },
  created() {
    if (this.$route.query.tokenId) {
      const discountQuery = {
        page: 1,
        size: 20,
        status: 3,
        tokenId: this.$route.query.tokenId
      }
      this.getDiscountList(discountQuery)
    } else {
      const discountQuery = {
        page: 1,
        size: 20,
        status: 3
      }
      this.getDiscountList(discountQuery)
    }
  },
  methods: {
    getDate(time) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    getDiscountList(discountQuery) {
      this.loading = true
      getDiscountList(discountQuery).then((res) => {
        if (res.content) {
          this.recordList = res.content.list
          this.total = res.content.count
        } else {
          this.recordList = []
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
    handleSizeChange(size) {
      this.size = size
      const { discountApplicantName, discountId, initialToken, tokenId } = this.searchForm
      const discountQuery = {
        discountApplicantName,
        discountId,
        initialToken,
        page: 1,
        size: this.size,
        status: 3,
        tokenId
      }
      this.getDiscountList(discountQuery)
    },
    handleCurrentChange(page) {
      this.page = page
      const { discountApplicantName, discountId, initialToken, tokenId } = this.searchForm
      const discountQuery = {
        discountApplicantName,
        discountId,
        initialToken,
        page: this.page,
        size: this.size,
        status: 3,
        tokenId
      }
      this.getDiscountList(discountQuery)
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/discount/record/detail', query: { id: row.id }})
    },
    searchList() {
      if (this.searchForm) {
        const { discountApplicantName, discountId, initialToken, tokenId } = this.searchForm
        const discountQuery = {
          discountApplicantName,
          discountId,
          initialToken,
          page: 1,
          size: this.size,
          status: 3,
          tokenId
        }
        this.getDiscountList(discountQuery)
      }
    },
    resetList() {
      this.searchForm = {}
      const discountQuery = {
        page: 1,
        size: this.size,
        status: 3
      }
      this.getDiscountList(discountQuery)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
