<template>
  <div>
    <el-card v-if="detail.draftReviewVO" class="my-card">
      <div class="draft-detail-title">开票信息（登记哈希：{{ detail.draftReviewVO.draftHash }}）</div>
      <div class="draft-detail-line" />
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请通过时间：</span>
          <span class="ft-size-12">{{ getDate(detail.draftReviewVO.draftAcceptTime) }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">汇票到期时间：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.acceptDate }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">审核保贴日利率：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.rate }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">可贴现TOKEN合约：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.tokenContractUrl }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">合同登记哈希：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.contractHash }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">商票登记哈希：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.draftHash }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">可贴现TOKEN初始ID：</span>
          <span class="ft-size-14">{{ detail.draftReviewVO.initialToken }}</span>
          <span class="ft-size-14 primary-color m-l-10 cursor-pointer" @click="gotoRecord(detail.draftReviewVO.initialToken)">查看贴现记录</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">保理机构业务员：</span>
          <span class="ft-size-14">{{ detail.draftReviewVO.manager }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">保理机构联系方式：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.companyPhone }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">保理机构:</span>
          <span class="ft-size-14">{{ detail.draftReviewVO.name }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">保理机构账号：</span>
          <span class="ft-size-14">{{ detail.draftReviewVO.accountNumber }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">保理机构开户行：</span>
          <span class="ft-size-12">{{ detail.draftReviewVO.bankAddress }}</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
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
    gotoRecord(url) {
      this.$router.push(`/discount/record?tokenId=${url}`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
