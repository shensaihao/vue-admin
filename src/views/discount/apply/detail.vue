<template>
  <div v-loading="loading">
    <el-card class="my-card">
      <h3>处理进度</h3>
      <el-steps :active="active">
        <el-step title="提交贴现申请" description="" />
        <el-step title="审核贴现信息" description="" />
        <el-step title="贴现转账确认" description="" />
        <el-step title="完成" />
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
    <el-card v-if="active===4" class="flex-column-center my-card text-center" body-style="width: 100%">
      <div class="m-b-20">
        <i class="el-icon-success ft-size-56 font-weight color-primary" />
      </div>
      <div class="ft-size-18 font-weight m-b-20">
        申请人已确认收款，流程完结
      </div>
    </el-card>
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
      loading: false
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
            this.active = 2
          } else if (res.content.discountInfoVO.status === 2 && res.content.discountInfoVO.checked && !res.content.discountInfoVO.confirm) {
            this.active = 3
          } else if (res.content.discountInfoVO.status === 3 && res.content.discountInfoVO.confirm) {
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
    handelConfirmTransfer() {
      this.$confirm('确定提交贴现转账信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirmTransferAcount(this.transferForm).then((res) => {
          this.$message.success('转账信息提交成功')
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

<style lang="scss" scoped>
</style>
