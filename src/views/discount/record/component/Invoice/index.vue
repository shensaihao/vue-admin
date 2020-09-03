<template>
  <div>
    <el-card v-if="detail.remitterVO" class="my-card">
      <h3>贴现转账信息</h3>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方贴现金额</span>
          <span class="ft-size-12">{{ detail.remitterVO.total }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方转账日期：</span>
          <span class="ft-size-12">{{ getDate(detail.remitterVO.transDate) }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方转账账户名称：</span>
          <span class="ft-size-12">{{ detail.remitterVO.accountName }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方转账账号</span>
          <span class="ft-size-12">{{ detail.remitterVO.accountNo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方汇款订单号：</span>
          <span class="ft-size-12">{{ detail.remitterVO.no }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">我方汇款证明：</span>
          <span class="ft-size-12 primary-color cursor-pointer" @click="previewImage(detail.remitterVO.certUrl)">查看汇款证明</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="detail.discountInfoVO" class="my-card">
      <h3>贴现申请信息（编号:{{ detail.discountInfoVO.id }})</h3>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请贴现的tokenID：</span>
          <span class="ft-size-14">{{ detail.discountInfoVO.tokenId }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请贴现的token价值：</span>
          <span class="ft-size-14">{{ detail.discountInfoVO.amount }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请贴现日利率：</span>
          <span class="ft-size-12">{{ detail.discountInfoVO.interestRate }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请人账户名：</span>
          <span class="ft-size-14">{{ detail.discountInfoVO.accountName }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">申请人银行账号：</span>
          <span class="ft-size-14">{{ detail.discountInfoVO.accountNo }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">申请人开户行：</span>
          <span class="ft-size-12">{{ detail.discountInfoVO.accountBank }}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="detail.tokenInfoVO" class="my-card">
      <h3>Token流转记录（商票登记哈希：{{ detail.draftReviewVO.draftHash }}）</h3>
      <el-row :gutter="20" class="m-b-20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">初始tokenID：</span>
          <span class="ft-size-14">{{ detail.tokenInfoVO.initialToken }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">初始token价值：</span>
          <span class="ft-size-14">{{ detail.tokenInfoVO.initialToken }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">已贴现价值：</span>
          <span class="ft-size-12">{{ detail.tokenInfoVO.amountUsed }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">本次销毁tokenID:</span>
          <span class="ft-size-14">{{ detail.tokenInfoVO.estroyTokenId }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-14 font-gray-color">token销毁哈希：</span>
          <span class="ft-size-14">{{ detail.tokenInfoVO.ddestroyTokenHash }}</span>
        </el-col>
        <el-col :span="8">
          <span class="display-inline-b width-150 ft-size-12 font-gray-color">母tokenID：</span>
          <span class="ft-size-12">{{ detail.tokenInfoVO.motherToken }}</span>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="detail.draftReviewVO" class="my-card">
      <h3 class="display-inline-b">开票信息（登记哈希：{{ detail.draftReviewVO.contractHash }}）</h3>
      <span class="ft-size-12 primary-color cursor-pointer display-inline-b" @click="previewComplate(detail.draftReviewVO.draftId)">查看完整信息</span>
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
  </div>
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
    },
    gotoRecord(url) {
      this.$router.push(`/discount/record?tokenId=${url}`)
    },
    previewComplate(id) {
      this.$router.push(`/bill/examine/detail?id=${id}`)
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
