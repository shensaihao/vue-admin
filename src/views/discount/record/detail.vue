<template>
  <div v-loading="loading">
    <el-card class="my-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>贴现tokenid</div>
            <div>{{ discountDetailInfo.discountInfoVO.tokenId }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>实际贴现金额</div>
            <div>{{ discountDetailInfo.remitterVO.total }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>日利率</div>
            <div>{{ discountDetailInfo.draftReviewVO.total }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>出票企业：{{ discountDetailInfo.discountInfoVO.accountName }}</div>
            <div>出票企业联系方式：{{ discountDetailInfo.discountInfoVO.accountNo }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <Invoice :detail="discountDetailInfo" />

  </div>
</template>

<script>
import Invoice from './component/Invoice/index'
import { discountDetail } from '@/api/discount'

export default {
  components: {
    Invoice
  },
  data() {
    return {
      urgingDialog: false,
      discountDetailInfo: {},
      loading: false
    }
  },
  created() {
    const id = this.$route.query.id
    this.getDiscountDetail(id)
  },
  methods: {
    getDiscountDetail(id) {
      this.loading = true
      discountDetail(id).then((res) => {
        if (res.content) {
          this.discountDetailInfo = res.content
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
    back() {
      this.$router.go(-1)
    },
    handelClickUrging() {
      this.urgingDialog = true
    },
    confirmEditUrging() {
      this.urgingDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
