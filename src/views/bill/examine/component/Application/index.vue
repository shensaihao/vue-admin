<template>
  <el-card v-if="detail.applyInfoVO" class="my-card">
    <div class="draft-detail-title">申请信息（编号:{{ detail.applyInfoVO.id }}）</div>
    <div class="draft-detail-line" />
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请开票额度：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.total }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">授信/承兑企业：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.drawerName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">供应商：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.draweeName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">汇票到期日：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.acceptDate }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">受信企业联系人：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.drawerManagerName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">供应商企业联系人：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.draweeManagerName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 color-error">保贴日利率：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.rate }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">受信企业联系方式：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.drawerManagerPhone }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">供应商企业联系方式：</span>
        <span class="ft-size-14">{{ detail.applyInfoVO.draweeManagerPhone }}</span>
      </el-col>
    </el-row>
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
