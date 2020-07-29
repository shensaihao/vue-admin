<template>
  <el-card v-if="detail.contractInfoVO" class="my-card" :body-style="{padding: '0 20px 20px 20px'}">
    <h3>合同信息</h3>
    <el-card>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">合同名称：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.contractName }}</span>
          <span class="ft-size-12 primary-color m-l-10 cursor-pointer" @click="previewImage('image')">采购方合同</span>
          <span class="ft-size-12 primary-color m-l-10 cursor-pointer" @click="previewImage('image')">供应商合同</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">采购商品类型：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.goods }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">合同签订时间戳：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.contractSignDate }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">已支付定金：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.orderTotal }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">剩余应付款项：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.rptotal }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">应付款项时限：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.expireDate }}</span>
        </el-col>
      </el-row>
    </el-card>

  </el-card>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
