<template>
  <div>
    <el-card class="flex-column-center my-card text-center" body-style="width: 100%">
      <div class="m-b-20">
        <i class="el-icon-success ft-size-56 font-weight color-success" />
      </div>
      <div class="ft-size-18 font-weight m-b-20">
        开票成功
      </div>
      <div class="ft-size-12 m-b-20">
        企业的开票申请已经通过，耗时3天10小时20分
      </div>
    </el-card>
    <el-card v-if="detail.DraftReviewVO" class="my-card" :body-style="{padding: '0 20px 20px 20px'}">
      <h3>开票信息（登记哈希：{{ detail.DraftReviewVO.draftHash }}）</h3>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请通过时间：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.draftAcceptTime }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇票到期时间：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.expireDate }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">审核保贴日利率：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.rate }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">可贴现TOKEN合约：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.tokenContractUrl }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">合同登记哈希：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.contractHash }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">商票登记哈希：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.draftHash }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">可贴现TOKEN初始ID：</span>
          <span class="ft-size-14">{{ detail.DraftReviewVO.initialToken }}</span>
          <span class="ft-size-14 primary-color m-l-10 cursor-pointer">查看贴现记录</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">保理机构业务员：</span>
          <span class="ft-size-14">{{ detail.DraftReviewVO.manager }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">保理机构联系方式：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.managerPhone }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">保理机构:</span>
          <span class="ft-size-14">{{ detail.DraftReviewVO.name }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">保理机构账号：</span>
          <span class="ft-size-14">{{ detail.DraftReviewVO.accountNumber }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">保理机构开户行：</span>
          <span class="ft-size-12">{{ detail.DraftReviewVO.bankAddress }}</span>
        </el-col>
      </el-row>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
