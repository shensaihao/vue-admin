<template>
  <el-card v-if="detail.discountInfoVO" class="my-card">
    <h3>贴现申请信息（编号:1234561123)</h3>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请贴现的tokenID：</span>
        <span class="ft-size-14">0.015%</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请贴现的token价值：</span>
        <span class="ft-size-14">13656587450</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">提前贴现日利率：</span>
        <span class="ft-size-12">13656587450</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请人账户名：</span>
        <span class="ft-size-14">0.015%</span>
        <i class="el-icon-document-copy m-l-10 cursor-pointer" @click="copyAcount" />
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请人银行账号：</span>
        <span class="ft-size-14">13656587450</span>
        <i class="el-icon-document-copy m-l-10 cursor-pointer" @click="copyBankAcount" />
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请人开户行：</span>
        <span class="ft-size-12">13656587450</span>
        <i class="el-icon-document-copy m-l-10 cursor-pointer" @click="copyBank" />
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
