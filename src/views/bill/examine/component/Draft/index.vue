<template>
  <el-card v-if="detail.draftInfoVO" class="m-t-10 my-card">
    <div slot="header" class="clearfix">
      <span>商票信息（商票编号：{{ detail.draftInfoVO.no }}）</span>
    </div>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">出票日期：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.draftStartDate }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">汇票到期时间：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.acceptDate }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 color-error">交易合同号：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.draftContractNo }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-b-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 color-error">出票金额：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.rptotal }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">出票保证日期：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.guarantorDate }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票扫描件：</span>
        <span class="ft-size-14 primary-color cursor-pointer" @click="previewImage(detail.draftInfoVO.draftUrl1)">正面</span>
        <span class="ft-size-14 primary-color cursor-pointer m-l-10" @click="previewImage(detail.draftInfoVO.draftUrl2)">背面</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-t-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">付款人开户行：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.payAccountBank }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">付款人账户名：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.payAccountName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">付款人银行账号：</span>
        <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
          <span class="payAccountNo cursor-pointer" @click="copy('.payAccountNo')">{{ detail.draftInfoVO.payAccountNo }}</span>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-t-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">收款人开户行：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.receiveAccountBank }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">收款人账户名：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.receiveAccountName }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">收款人银行账号：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.receiveAccountNo }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-t-20">
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">出票保证人：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.guarantorNo }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">保证人联系方式：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.guarantorInfo }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">保证人地址：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.guarantorNo }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="m-t-20 m-b-20">

      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票邮寄快递：</span>
        <span class="ft-size-14">{{ detail.draftInfoVO.draftExpress }}</span>
      </el-col>
      <el-col :span="8">
        <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票邮寄快递单号：</span>
        <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
          <span class="draftExpressNo cursor-pointer" @click="copy('.draftExpressNo')">{{ detail.draftInfoVO.draftExpressNo }}</span>
        </el-tooltip>
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
import Clipboard from 'clipboard'
import axios from 'axios'
import qs from 'qs'

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
    copy(url) {
      const clipboard = new Clipboard(url)
      clipboard.on('success', e => {
        this.$message.success('复制成功')// 这里你如果引入了elementui的提示就可以用，没有就注释即可
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.warning('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
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
