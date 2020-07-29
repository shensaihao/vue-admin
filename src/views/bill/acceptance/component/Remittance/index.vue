<template>
  <el-card v-if="detail.remitterVO" class="my-card">
    <h3>汇款信息</h3>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇款人账户名称：</span>
        <span class="ft-size-12">{{ detail.remitterVO.accountName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇款账号：</span>
        <span class="ft-size-12">{{ detail.remitterVO.accountNo }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇款人开户行：</span>
        <span class="ft-size-12">{{ detail.remitterVO.accountBank }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇款金额：</span>
        <span class="ft-size-12">{{ detail.remitterVO.total }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇款订单号：</span>
        <span class="ft-size-12">{{ detail.remitterVO.no }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇款证明：</span>
        <span class="ft-size-12 primary-color cursor-pointer" @click="previewImage(detail.remitterVO.certUrl)">查看汇款证明</span>
      </el-col>
    </el-row>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-image :src="dialogImageUrl">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hasRemittance: false,
      remittanceDialog: false,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    previewImage(image) {
      this.dialogVisible = true
      this.dialogImageUrl = image
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
