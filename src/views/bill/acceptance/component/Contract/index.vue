<template>
  <div>
    <el-card v-if="detail.contractInfoVO" class="my-card">
      <div slot="header" class="clearfix">
        <span>合同信息</span>
      </div>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">合同名称：</span>
          <span class="ft-size-12">{{ detail.contractInfoVO.contractName }}</span>
          <span class="ft-size-12 primary-color m-l-10 cursor-pointer" @click="previewImage(detail.contractInfoVO.contractUrl)">采购方合同</span>
          <span class="ft-size-12 primary-color m-l-10 cursor-pointer" @click="previewImage(detail.contractInfoVO.supplierContractUrl)">供应商合同</span>
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
    <el-card v-if="detail.draftInfoVO" class="m-t-10 my-card">
      <div slot="header" class="clearfix">
        <span>商票信息（商票编号：{{ detail.draftInfoVO.no }}）</span>
      </div>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">出票日期：</span>
          <span class="ft-size-12">{{ detail.draftInfoVO.startDate }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇票到期日：</span>
          <span class="ft-size-12">{{ detail.draftInfoVO.expireDate }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">交易合同号：</span>
          <span class="ft-size-12">{{ detail.draftInfoVO.draftContractNo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">出票金额：</span>
          <span class="ft-size-12">{{ detail.draftInfoVO.total }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-t-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">付款人账户名：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.payAccountName }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">付款人银行账号：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.payAccountNo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">付款人开户行：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.payAccountBank }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-t-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">收款人账户名：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.receiveAccountName }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">收款人银行账号：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.receiveAccountNo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">收款人开户行：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.receiveAccountBank }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-t-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">出票保证人：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.guarantorNo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">出票保证人信息：</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.guarantorInfo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">出票保证日期</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.guarantorDate }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-t-20 m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票正面扫描件：</span>
          <span class="ft-size-14 primary-color" @click="previewImage(detail.draftInfoVO.draftUrl1)">查看</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票背面扫描件：</span>
          <span class="ft-size-14 primary-color" @click="previewImage(detail.draftInfoVO.draftUrl2)">查看</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">快递单信息</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.draftExpress }}{{ detail.draftInfoVO.draftExpressNo }}</span>
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
  </div>
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
