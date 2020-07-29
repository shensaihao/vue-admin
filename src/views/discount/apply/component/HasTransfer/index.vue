<template>
  <el-card v-if="detail.remitterVO" class="my-card">
    <h3>贴现转账信息</h3>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">我方贴现金额：</span>
        <span class="ft-size-14">{{ detail.remitterVO.total }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">我方转账日期：</span>
        <span class="ft-size-14">{{ detail.remitterVO.total }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方转账账户名称：</span>
        <span class="ft-size-12">{{ detail.remitterVO.accountName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">我方转账账号：</span>
        <span class="ft-size-14">{{ detail.remitterVO.accountNo }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">我方汇款订单号：</span>
        <span class="ft-size-14">{{ detail.remitterVO.no }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方汇款证明：</span>
        <span class="ft-size-12" @click="previewImage(detail.remitterVO.certUrl)">点击查看</span>
      </el-col>
    </el-row>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
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
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  created() {
    console.log(this.detail.remitterVO)
  },
  methods: {
    previewImage(image) {
      this.dialogVisible = true
      this.dialogImageUrl = image
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
