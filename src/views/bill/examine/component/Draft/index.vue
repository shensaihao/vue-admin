<template>
  <el-card v-if="detail.draftInfoVO" class="my-card" :body-style="{padding: '0 20px 20px 20px'}" style="margin-bottom: 70px">
    <h3>商票信息（商票编号：{{ detail.draftInfoVO.no }}）</h3>
    <el-card class="m-t-10">
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
          <span class="ft-size-14 primary-color cursor-pointer" @click="previewImage(detail.draftInfoVO.draftUrl1)">查看</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票背面扫描件：</span>
          <span class="ft-size-14 primary-color cursor-pointer" @click="previewImage(detail.draftInfoVO.draftUrl1)">查看</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">快递单信息</span>
          <span class="ft-size-14">{{ detail.draftInfoVO.draftExpress }}{{ detail.draftInfoVO.draftExpressNo }}</span>
        </el-col>
      </el-row>
      <!-- <div class="divider-line" />
      <el-row v-if="hasReciveExamine" :gutter="20" class="m-t-20 m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">纸质商票接收人：</span>
          <span class="ft-size-14">张彬彬</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">审核时间：</span>
          <span class="ft-size-14">2020.06.20 19:21:21</span>
        </el-col>
      </el-row>
      <el-row v-else :gutter="20" class="m-t-20">
        <el-col :span="5">
          <el-button type="primary" size="small" class="width-100" @click="handelClickRecive">转让的商票已收到</el-button>
        </el-col>
      </el-row>
      <div v-if="hasReciveExamine" class="divider-line" />
      <el-row v-if="hasConfirmExamine" :gutter="20" class="m-t-20 m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">商票审核人：</span>
          <span class="ft-size-14">张彬彬</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">审核时间：</span>
          <span class="ft-size-14">2020.06.20 19:21:21</span>
        </el-col>
      </el-row>
      <el-row v-if="hasReciveExamine&&!hasConfirmExamine" :gutter="20" class="m-t-20">
        <el-col :span="5">
          <el-button type="primary" size="small" class="width-100" @click="handelClickExamine">商票信息核实无误</el-button>
        </el-col>
      </el-row>
      <div v-if="hasConfirmExamine&&!hasConfirmInvoice" class="divider-line" />
      <el-row v-if="hasConfirmExamine&&!hasConfirmInvoice" :gutter="20" class="m-t-20">
        <el-col :span="5">
          <el-button type="primary" size="small" class="width-100" @click="handelClickInvoice">所有信息审核完成，确认开票</el-button>
        </el-col>
      </el-row> -->
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
