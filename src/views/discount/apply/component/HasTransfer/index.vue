<template>
  <el-card v-if="detail.remitterVO" class="my-card">
    <div class="draft-detail-title">贴现转账信息</div>
    <div class="draft-detail-line" />
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">我方贴现金额：</span>
        <span class="ft-size-14">{{ detail.remitterVO.total }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">我方转账日期：</span>
        <span class="ft-size-14">{{ getDate(detail.remitterVO.transDate) }}</span>
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
        <span class="ft-size-12 cursor-pointer primary-color" @click="previewImage(detail.remitterVO.certUrl)">点击查看</span>
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
  created() {
    console.log(this.detail.remitterVO)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
