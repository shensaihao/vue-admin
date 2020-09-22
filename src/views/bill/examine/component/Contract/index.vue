<template>
  <el-card v-if="detail.contractInfoVO" class="my-card">
    <div class="draft-detail-title">合同信息</div>
    <div class="draft-detail-line" />
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">合同名称：</span>
        <span class="ft-size-14">{{ detail.contractInfoVO.contractName }}</span>
        <span class="ft-size-14 primary-color m-l-10 cursor-pointer" @click="previewImage('image')">采购方合同</span>
        <span class="ft-size-14 primary-color m-l-10 cursor-pointer" @click="previewImage('image')">供应商合同</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">采购商品类型：</span>
        <span class="ft-size-14">{{ detail.contractInfoVO.goods }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">合同签订日期：</span>
        <span class="ft-size-14">{{ getDate(detail.contractInfoVO.signDate) }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 color-error">已支付定金：</span>
        <span class="ft-size-14">{{ detail.contractInfoVO.orderTotal }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 color-error">剩余应付款项：</span>
        <span class="ft-size-14">{{ detail.contractInfoVO.rptotal }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">应付款项时限：</span>
        <span class="ft-size-14">{{ detail.contractInfoVO.acceptDate }}</span>
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
import axios from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'

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
  methods: {
    getDate(time) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    previewImage(image) {
      axios.post('http://182.148.53.142:19837/partner/obtain_url', qs.stringify({ ossKey: image })).then((res) => {
        if (res.data.code === 0) {
          this.dialogVisible = true
          this.dialogImageUrl = res.data.data
        } else {
          this.$message(res.data.message)
        }
      }).catch(() => {
        this.$message('图片获取失败')
      })
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
