<template>
  <div>
    <el-card class="my-card">
      <h3>处理进度</h3>
      <el-steps :active="active">
        <el-step title="提交贴现申请" description="核心企业名称2020.06.2012:32" />
        <el-step title="审核贴现信息" description="小龙女2020.06.2012:32" />
        <el-step title="贴现转账确认" description="小龙女" />
        <el-step title="申请人确认转账" description="待确认" />
        <el-step title="完成" />
      </el-steps>
    </el-card>
    <el-card v-if="active===3" class="flex-column-center my-card text-center" body-style="width: 100%">
      <div class="m-b-20">
        <i class="el-icon-success ft-size-56 font-weight color-success" />
      </div>
      <div class="ft-size-18 font-weight m-b-20">
        我方已确认转账，申请人未确认收款
      </div>
    </el-card>
    <el-card v-if="active===4" class="flex-column-center my-card text-center" body-style="width: 100%">
      <div class="m-b-20">
        <i class="el-icon-success ft-size-56 font-weight color-primary" />
      </div>
      <div class="ft-size-18 font-weight m-b-20">
        申请人已确认收款，流程完结
      </div>
    </el-card>
    <HasTransfer v-if="active >= 3" :detail="discountDetailInfo" />
    <Application :detail="discountDetailInfo" />
    <Transfer v-if="active = 2" :detail="discountDetailInfo" @remitter="handelChangeTransferInfo" @upload="handelUploadImage" />
    <Invoice :detail="discountDetailInfo" />

    <div class="draft-detail-bottom-button">
      <el-button v-if="!unpass" type="danger" plain @click="handelClickUnPass">不通过</el-button>
      <el-popconfirm
        title="是否已确认申请信息准确无误？"
        @onConfirm="handelConfirmPass"
      >
        <el-button v-if="active===1" slot="reference" type="primary" class="m-l-10">通过申请</el-button>
      </el-popconfirm>
      <el-popconfirm
        title="确定提交贴现转账信息? "
        @onConfirm="handelConfirmTransfer"
      >
        <el-button v-if="active===2" slot="reference" type="primary" class="m-l-10">确认已转账</el-button>
      </el-popconfirm>
      <el-button plain class="m-l-10 m-r-10" @click="handelClickNextOne">下一条</el-button>
    </div>
    <el-dialog :visible.sync="receiveDialog" width="30%" title="不通过">
      <div class="m-b-20 flex-start">
        <span style="width:100px">审核备注：</span>
        <el-input v-model="noPassComment" type="textarea" />
      </div>
      <div class="text-right">
        <el-button @click="receiveDialog=false">取消</el-button>
        <el-button class="m-l-10" @click="confirmUnPass">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Application from './component/Application/index'
import Invoice from './component/Invoice/index'
import Transfer from './component/Transfer/index'
import HasTransfer from './component/HasTransfer/index'
import { discountDetail, discountAppliesFailed, passDiscountApply, confirmTransferAcount } from '@/api/discount'

export default {
  components: {
    Application,
    Invoice,
    Transfer,
    HasTransfer
  },
  data() {
    return {
      active: 1,
      discountDetailInfo: {},
      unpass: false,
      receiveDialog: false,
      noPassComment: '',
      transferForm: {}
    }
  },
  created() {
    const id = this.$route.query.id
    this.getDiscountDetail(id)
  },
  methods: {
    handelChangeTransferInfo(form) {
      this.transferForm = form
    },
    getDiscountDetail(id) {
      discountDetail(id).then((res) => {
        if (res.content) {
          this.discountDetailInfo = res.content
          if (res.content.discountInfoVO.status === 1) {
            this.active = 2
          } else if (res.content.discountInfoVO.status === 2) {
            this.active = 3
          } else if (res.content.discountInfoVO.status === 3) {
            this.active = 4
          }
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handelClickUnPass() {
      this.receiveDialog = true
    },
    confirmUnPass() {
      const id = this.$route.query.id
      const query = {
        id: id,
        noPassComment: this.noPassComment
      }
      discountAppliesFailed(query).then((res) => {
        this.receiveDialog = false
        this.unpass = true
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    handelClickNextOne() {

    },
    handelConfirmPass() {
      const id = this.$route.query.id
      passDiscountApply(id).then((res) => {
        this.$message.success('贴现申请审核通过')
      }).then(() => {
        const id = this.$route.query.id
        this.getDiscountDetail(id)
      }).then(() => {
        this.active += 1
      })
        .catch(() => {
          this.$message.error('贴现申请审核失败，请检查网络或刷新页面')
        })
    },
    handelUploadImage(url) {
      this.discountDetailInfo.remitterVO.certUrl = url
    },
    handelConfirmTransfer() {
      confirmTransferAcount(this.transferForm).then((res) => {
        this.$message.success('转账信息提交成功')
        this.active += 1
      }).catch(() => {
        this.$message.error('转账信息提交失败，请检查网络或刷新页面')
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
