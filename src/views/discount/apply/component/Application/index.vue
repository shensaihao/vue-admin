<template>
  <el-card v-if="detail.discountInfoVO" class="my-card">
    <div class="draft-detail-title">贴现申请信息（编号:{{ detail.discountInfoVO.id }}）</div>
    <div class="draft-detail-line" />
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请贴现的tokenID：</span>
        <span class="ft-size-14">{{ detail.discountInfoVO.tokenId }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请贴现的token价值：</span>
        <span class="ft-size-14">{{ detail.discountInfoVO.amount }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请贴现日利率：</span>
        <span class="ft-size-12">{{ detail.discountInfoVO.interestRate }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请人账户名：</span>
        <span class="ft-size-14">{{ detail.discountInfoVO.accountName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请人银行账号：</span>
        <span class="ft-size-14">{{ detail.discountInfoVO.accountNo }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请人开户行：</span>
        <span class="ft-size-12">{{ detail.discountInfoVO.accountBank }}</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { discountDetail } from '@/api/discount'

export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hasPassApply: false,
      passDialog: false,
      hasTransfer: false,
      transferDialog: false
    }
  },
  methods: {
    created() {
      this.getDiscountDetail()
    },
    getDiscountDetail() {
      discountDetail().then((res) => {
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handelClickPass() {
      this.passDialog = true
    },
    handelClickTransfer() {
      this.transferDialog = true
    },
    copyAcount() {

    },
    copyBankAcount() {

    },
    copyBank() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
