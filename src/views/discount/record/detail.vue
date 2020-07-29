<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>贴现tokenid</div>
            <div>123456</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>实际贴现金额</div>
            <div>965300.00（玖拾陆万伍千叄佰万）</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>日利率，提前贴现时长</div>
            <div>0.015%/35天</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>出票企业：xxxxx</div>
            <div>出票企业联系方式：166666666666</div>
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
      discountDetailInfo: {}
    }
  },
  created() {
    const id = this.$route.query.id
    this.getDiscountDetail(id)
  },
  methods: {
    getDiscountDetail(id) {
      discountDetail(id).then((res) => {
        if (res.content) {
          this.discountDetailInfo = res.content
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
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
