<template>
  <div v-loading="loading">
    <el-card class="my-card">
      <h3>处理进度</h3>
      <el-steps :active="active" align-center>
        <el-step title="提交贴现申请" description="" icon="el-icon-success" />
        <el-step title="审核贴现信息" description="" icon="el-icon-success" />
        <el-step title="贴现转账确认" description="" icon="el-icon-success" />
        <el-step title="完成" class="step_finish">
          <template slot="icon">
            <i class="end_success_icon" />
          </template>
        </el-step>
      </el-steps>
    </el-card>
    <el-card v-if="unpass" class="flex-column-center my-card text-center" body-style="width: 100%">
      <div class="m-b-20">
        <i class="el-icon-error ft-size-56 font-weight color-error" />
      </div>
      <div class="ft-size-18 font-weight m-b-20">
        审核失败
      </div>
      <div class="ft-size-12 m-b-20">
        审核备注：{{ noPassComment }}
      </div>
    </el-card>
    <!-- <el-card v-if="active===4" class="flex-column-center my-card text-center" body-style="width: 100%">
      <div class="m-b-20">
        <i class="el-icon-success ft-size-56 font-weight color-primary" />
      </div>
      <div class="ft-size-18 font-weight m-b-20">
        我方已确认转账，申请人未确认收款
      </div>
    </el-card> -->
    <div v-if="active===4" class="flex-center my-card p-y-40" body-style="width: 100%">
      <div class="m-r-60">
        <img src="../../../assets/images/draft_success_img.png" alt="">
      </div>
      <div>
        <div class="flex-start m-b-10 ft-size-12 color-gray">
          <img v-if="processStep > 1" src="@/assets/images/draft_success.png" alt="">
          <img v-if="processStep === 1" class="step_icon_loading" src="@/assets/images/draft_pending.png" alt="">
          <div class="m-l-10" :class="{'color-blue':processStep > 1}">{{ processinfo.step1 }}</div>
        </div>
        <div class="flex-start m-b-10 m-t-10 ft-size-12 color-gray">
          <img v-if="processStep > 2" src="@/assets/images/draft_success.png" alt="">
          <img v-if="processStep === 2" class="step_icon_loading" src="@/assets/images/draft_pending.png" alt="">
          <img v-if="processStep < 2" src="@/assets/images/draft_loading.png" alt="">
          <div class="m-l-10" :class="{'color-blue':processStep > 2}">{{ processinfo.step2 }}</div>
        </div>
        <div class="flex-start m-t-10 ft-size-12 color-gray">
          <img v-if="processStep > 3" src="@/assets/images/draft_success.png" alt="">
          <img v-if="processStep === 3" class="step_icon_loading" src="@/assets/images/draft_pending.png" alt="">
          <img v-if="processStep < 3" src="@/assets/images/draft_loading.png" alt="">
          <div class="m-l-10" :class="{'color-blue':processStep > 3}">{{ processinfo.step3 }}</div>
        </div>
      </div>
    </div>
    <HasTransfer v-if="active >= 4" :detail="discountDetailInfo" />
    <Application :detail="discountDetailInfo" />
    <Transfer v-if="active === 3" :detail="discountDetailInfo" @remitter="handelChangeTransferInfo" @upload="handelUploadImage" />
    <Invoice :detail="discountDetailInfo" />

    <div class="draft-detail-bottom-button">
      <el-button v-if="!unpass&&active<=3" type="danger" plain @click="handelClickUnPass">不通过</el-button>

      <el-button v-if="!unpass&&active===2" slot="reference" type="primary" class="m-l-10" @click="handelConfirmPass">通过申请</el-button>

      <el-button v-if="!unpass&&active===3" slot="reference" type="primary" class="m-l-10" @click="handelConfirmTransfer">确认已转账</el-button>

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
import { discountDetail, discountAppliesFailed, passDiscountApply, confirmTransferAcount, discountNextDetail } from '@/api/discount'

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
      transferForm: {},
      loading: false,
      processStep: 4,
      processinfo: {
        step1: '打款信息已登记',
        step2: '已贴现通证回收完成',
        step3: '已贴现通证销毁完成'
      }
    }
  },
  watch: {
    $route: 'getDiscountDetail'
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
      this.loading = true
      if (id.query) id = this.$route.query.id
      discountDetail(id).then((res) => {
        if (res.content) {
          this.discountDetailInfo = res.content
          if (res.content.discountInfoVO.status === 1 && !res.content.discountInfoVO.checked) {
            this.processStep = 1
            this.processinfo = {
              step1: '打款信息登记中...',
              step2: '等待系统回收贴现通证',
              step3: '等待区块链销毁已贴现通证'
            }
            this.active = 2
          } else if (res.content.discountInfoVO.status === 2 && res.content.discountInfoVO.checked && !res.content.discountInfoVO.confirm) {
            this.processStep = 1
            this.processinfo = {
              step1: '打款信息登记中...',
              step2: '等待系统回收贴现通证',
              step3: '等待区块链销毁已贴现通证'
            }
            this.active = 3
          } else if (res.content.discountInfoVO.status === 3 && res.content.discountInfoVO.confirm) {
            this.processStep = 4
            this.processinfo = {
              step1: '打款信息已登记',
              step2: '已贴现通证回收完成',
              step3: '已贴现通证销毁完成'
            }
            this.active = 4
          }
          if (res.content.discountInfoVO.noPassComment) {
            this.unpass = true
            this.noPassComment = res.content.discountInfoVO.noPassComment
          }
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    handelClickUnPass() {
      this.receiveDialog = true
    },
    confirmUnPass() {
      const id = this.discountDetailInfo.id
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
      discountNextDetail(this.discountDetailInfo.id).then((res) => {
        if (res.content) {
          this.$router.replace({ path: '/discount/apply/detail', query: { id: res.content.id }})
        } else {
          this.$message.warning('暂无下一条')
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handelConfirmPass() {
      this.$confirm('是否已确认申请信息准确无误？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = this.discountDetailInfo.id
        passDiscountApply(id).then((res) => {
          this.$message.success('贴现申请审核通过')
        }).then(() => {
          const id = this.discountDetailInfo.id
          this.getDiscountDetail(id)
        }).then(() => {
          this.active += 1
        })
          .catch(() => {
            this.$message.error('贴现申请审核失败，请检查网络或刷新页面')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handelUploadImage(url) {
      this.discountDetailInfo.remitterVO.certUrl = url
    },
    handelStartAnimate() {
      setInterval(() => {
        if (this.processStep < 4) {
          if (this.processStep === 1) {
            this.processinfo = {
              step1: '打款信息已登记',
              step2: '系统正在回收贴现通证...',
              step3: '等待区块链销毁已贴现通证'
            }
          }
          if (this.processStep === 2) {
            this.processinfo = {
              step1: '打款信息已登记',
              step2: '已贴现通证回收完成',
              step3: '区块链正在对贴现通证进行销毁...'
            }
          }
          this.processStep += 1
        }
        if (this.processStep === 3) {
          this.processinfo = {
            step1: '打款信息已登记',
            step2: '已贴现通证回收完成',
            step3: '区块链正在对贴现通证进行销毁'
          }
        }
      }, 2000)
    },
    handelConfirmTransfer() {
      this.$confirm('确定提交贴现转账信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirmTransferAcount(this.transferForm).then((res) => {
          // this.$message.success('转账信息提交成功')
          this.handelStartAnimate()
          this.active += 1
        }).catch(() => {
          this.$message.error('转账信息提交失败，请检查网络或刷新页面')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
.step_finish{
  .el-step__head.is-finish {
    border-color: #FFFFFF !important;
  }
  .el-step__head.is-process {
    .end_success_icon {
      background: #303133;
    }
  }
  .el-step__head.is-wait {
  .end_success_icon {
    background: #C0C4CC;
  }

  }
}
.end_success_icon {
    width: 12px;
    height: 12px;
    background: #0072FF;
    // border: 8px solid #EFF1F7;
    box-shadow: 0px 7px 10px 0px rgba(93, 123, 160, 0.4);
    border-radius: 50%;
}
/*无限旋转动画*/

@keyframes changDeg{

0%{

transform: rotate(0deg);

}

100%{

transform: rotate(360deg);

}

}
.step_icon_loading {
  animation: changDeg 2s linear 0.2s infinite;
}
.color-blue{
  color: #0072FF
}
</style>
