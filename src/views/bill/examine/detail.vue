<template>
  <div>

    <!-- <div>
      <el-button type="text" icon="el-icon-arrow-left" @click="back">返回上一页</el-button>
    </div> -->
    <el-card class="my-card">
      <el-steps :active="active">
        <el-step title="提交开票申请" description="核心企业名称2020.06.2012:32" />
        <el-step title="确认合同信息" description="迎曦2020.06.2012:32" />
        <el-step title="确认商票信息" description="小龙女" />
        <el-step title="审核开票" description="" />
        <el-step title="完成" description="" />
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
    <Invoice v-if="active===5" :detail="examineDetailInfo" />
    <Application :detail="examineDetailInfo" />
    <Contract :detail="examineDetailInfo" />
    <div style="margin-left: 10px">
      <el-button v-if="!hasDraftInfoCollspan" plain :style="!hasDraftInfoCollspan?{margin: '0 0 70px 0'}:{margin: '0'}" @click="hadelDraftInfoCollspan">展示商票信息</el-button>
      <el-button v-if="hasDraftInfoCollspan" plain :style="!hasDraftInfoCollspan?{margin: '0 0 70px 0'}:{margin: '0'}" @click="hadelDraftInfoCollspan">折叠商票信息</el-button>
    </div>
    <Draft v-if="hasDraftInfoCollspan" :detail="examineDetailInfo" />
    <div class="draft-detail-bottom-button">
      <el-button v-if="!unpass&&examineDetailInfo.status!==2&&active!==5" type="danger" plain @click="handelClickUnPass">不通过</el-button>
      <el-button v-if="active===2&&!unpass" type="primary" class="m-l-10" @click="handelClickConfrimBtn">合同信息确认</el-button>
      <el-button v-if="active===3&&!unpass" type="primary" class="m-l-10" @click="handelClickExamine">商票信息确认</el-button>
      <el-button v-if="active===4&&!unpass" type="primary" class="m-l-10" @click="handelClickInvoice">审核开票</el-button>
      <el-button plain class="m-l-10 m-r-10" @click="handelClickNextOne">下一条</el-button>
    </div>
    <el-dialog :visible.sync="contractDialog" width="30%">
      <el-checkbox-group v-model="contractList" class="m-b-20">
        <el-checkbox label="contractTime" class="m-b-20">已核实开票承兑时间与合同内容一致？</el-checkbox>
        <el-checkbox label="contractDeposit">已核实已支付定金与合同内容一致？</el-checkbox>
      </el-checkbox-group>
      <div class="flex-start-col-width">
        <el-button
          type="primary"
          class="m-b-20 width-100"
          :disabled="contractList.length !== 2"
          @click="confirmEditContract"
        >合同信息核实无误</el-button>
        <el-button class="width-100" @click="contractDialog=false">我再核实一下</el-button>
      </div>
    </el-dialog>
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
    <el-dialog :visible.sync="examineDialog" width="30%">
      <el-checkbox-group v-model="examineList" class="m-b-20">
        <el-checkbox label="examineAmount" class="m-b-20">已核实收到的商票信息上的金额填写无误?</el-checkbox>
        <el-checkbox label="examineInfo" class="m-b-20">已核实收到的商票与扫描信息一致？</el-checkbox>
        <el-checkbox label="examineSame" class="m-b-20">已核实收到的商票和系统登记的商票信息一致？</el-checkbox>
        <el-checkbox label="contractExamine" class="m-b-20">已核实商票信息与合同信息一致？</el-checkbox>
        <el-checkbox label="examineCompony">已核实商票转让信息与本公司信息一致？</el-checkbox>
      </el-checkbox-group>
      <div class="flex-start-col-width">
        <el-button
          type="primary"
          class="m-b-20 width-100"
          :disabled="examineList.length!==5"
          @click="confirmEditExamine"
        >商票信息核实无误</el-button>
        <el-button class="width-100" @click="examineDialog=false">我再核实一下</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="invoiceDialog" width="30%">
      <el-checkbox-group v-model="invoiceList" class="m-b-20">
        <el-checkbox label="invoiceQuota" class="m-b-20">已确认核心企业额度足够？</el-checkbox>
        <el-checkbox label="invoiceRate" class="m-b-20">已确认贴现日利率无误？</el-checkbox>
        <el-checkbox label="invoiceTruth" class="m-b-20">已与核心企业和供应商联系人确认开票申请真实存在？</el-checkbox>
        <el-checkbox label="invoiceAcount">收款账户确认无误？</el-checkbox>
      </el-checkbox-group>
      <div class="flex-start-col-width">
        <el-button
          type="primary"
          class="m-b-20 width-100"
          :disabled="invoiceList.length!==4"
          @click="confirmEditInvoice"
        >确认开票</el-button>
        <el-button class="width-100" @click="invoiceDialog=false">我再核实一下</el-button>
      </div>
    </el-dialog>
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
import Application from './component/Application/index'
import Contract from './component/Contract/index'
import Invoice from './component/Invoice/index'
import Draft from './component/Draft/index'
import { examineDetailInfo, draftExamineFailed, draftExamineContract,
  draftExamineDraftDraftInfo, draftExamineDraftAcceptt } from '@/api/bill'

export default {
  components: {
    Application,
    Contract,
    Invoice,
    Draft
  },
  data() {
    return {
      active: 2,
      examineDetailInfo: {},
      hasConfirmContract: false,
      hasReciveExamine: false,
      hasConfirmExamine: false,
      hasConfirmInvoice: false,
      contractDialog: false,
      receiveDialog: false,
      examineDialog: false,
      invoiceDialog: false,
      contractList: [],
      receiveList: [],
      examineList: [],
      invoiceList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      disabled: true,
      hasDraftInfoCollspan: false,
      noPassComment: '',
      unpass: false
    }
  },
  created() {
    const id = this.$route.query.id
    this.getExamineDetailInfo(id)
  },
  methods: {
    getExamineDetailInfo(id) {
      examineDetailInfo(id).then((res) => {
        if (res.content) {
          this.examineDetailInfo = res.content
          if (res.content.contract) {
            this.active = 3
          }
          if (res.content.draftInfo) {
            this.active = 4
          }
          if (res.content.draftAccept) {
            this.active = 5
          }
          if (res.content.noPassComment) {
            this.noPassComment = res.content.noPassComment
          }
          if (res.content.noPassComment && res.content.status === 2) {
            this.unpass = true
          }
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    hadelDraftInfoCollspan() {
      this.hasDraftInfoCollspan = !this.hasDraftInfoCollspan
    },
    // back() {
    //   this.$router.go(-1)
    // }
    previewImage(image) {
      this.dialogVisible = true
      this.dialogImageUrl = image
    },
    handleClose() {
      this.dialogVisible = false
    },
    handelClickConfrimBtn() {
      this.contractDialog = true
    },
    confirmEditContract() {
      this.hasConfirmContract = true
      this.contractDialog = false
      const ConfirmParam = {
        id: this.$route.query.id,
        contract: true
      }
      draftExamineContract(ConfirmParam).then((res) => {
        this.active += 1
        this.$message.success('合同信息确认成功')
      })
        .catch(() => {
          this.$message.error('合同信息确认失败，请检查网络或刷新页面')
        })
    },
    handelClickExamine() {
      this.examineDialog = true
    },
    confirmEditExamine() {
      this.hasConfirmExamine = true
      this.examineDialog = false
      const ConfirmParam = {
        id: this.$route.query.id,
        draftInfo: true
      }
      draftExamineDraftDraftInfo(ConfirmParam).then((res) => {
        this.active += 1
        this.$message.success('商票信息确认成功')
      })
        .catch(() => {
          this.$message.error('商票信息确认失败，请检查网络或刷新页面')
        })
    },
    handelClickInvoice() {
      this.invoiceDialog = true
    },
    confirmEditInvoice() {
      this.invoiceDialog = false
      this.hasConfirmInvoice = true
      const ConfirmParam = {
        id: this.$route.query.id,
        draftAccept: true
      }
      draftExamineDraftAcceptt(ConfirmParam).then((res) => {
        this.active += 1
        this.$message.success('开票成功')
      })
        .catch(() => {
          this.$message.error('审核开票失败，请检查网络或刷新页面')
        })
    },
    handelClickNextOne() {
      console.log('next one')
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
      draftExamineFailed(query).then((res) => {
        this.receiveDialog = false
        this.unpass = true
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    changeStatus(type) {
      if (type === 'contract') {
        if (this.contractList === ['contractTime', 'contractDeposit']) {
          this.disabled = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
