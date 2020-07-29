<template>
  <div>
    <el-card class="my-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>票据金额</div>
            <div>980000.00（玖拾捌万)</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>票据到期日</div>
            <div>2020.10.31</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>距离到期日期还剩</div>
            <div>35天</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex-center-col bill-card">
            <div>出票企业：xxxxx</div>
            <div>出票企业联系方式：166666666666</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <Remittance :detail="examineDetailInfo" />
    <Invoice :detail="examineDetailInfo" />
    <Application :detail="examineDetailInfo" />
    <Contract :detail="examineDetailInfo" />
    <div class="draft-detail-bottom-button">
      <el-button v-if="active===1" type="primary" class="m-l-10" @click="handelClickNoticeBtn">催一下</el-button>
      <el-button v-if="active===2" type="primary" class="m-l-10" @click="handelNoticed">已催</el-button>
      <el-popconfirm
        v-if="active===3"
        title="是否已确认申请信息准确无误？"
        @onConfirm="handelClickInvoice"
      >
        <el-button v-if="active===3" slot="reference" type="primary" class="m-l-10">确认收到汇款</el-button>
      </el-popconfirm>
      <el-button plain class="m-l-10 m-r-10" @click="handelClickNextOne">下一条</el-button>
    </div>
    <el-dialog :visible.sync="urgingDialog" width="30%" :show-close="false">
      <p class="m-b-20 font-gray-color">距离到期日期还剩   35天</p>
      <p class="font-weight ft-size-18 m-b-20 m-t-20">确认进行催办吗？业务平台会收到您的催办信息.<br>若事情较为紧急，建议进行电话联系</p>
      <div class="flex-start-col-width">
        <el-button type="primary" class="m-b-20 m-t-20 width-100" @click="confirmEditUrging">确认催办</el-button>
        <el-button class="width-100" @click="urgingDialog=false">我再想想</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Application from './component/Application/index'
import Contract from './component/Contract/index'
import Invoice from './component/Invoice/index'
import Remittance from './component/Remittance/index'
import { urgeOneAcceptance, acceptanceDetailInfo, confirmTransfer } from '@/api/bill'

export default {
  components: {
    Application,
    Contract,
    Invoice,
    Remittance
  },
  data() {
    return {
      urgingDialog: false,
      examineDetailInfo: {},
      active: 1
    }
  },
  created() {
    const id = this.$route.query.id
    this.getExamineDetailInfo(id)
  },
  methods: {
    getExamineDetailInfo(id) {
      acceptanceDetailInfo(id).then((res) => {
        if (res.content) {
          this.examineDetailInfo = res.content
          if (res.content.status === 1) {
            this.active = 1
          } else if (res.content.status === 2) {
            this.active = 3
          } else if (res.content.status === 3) {
            this.active = 4
          }
          console.log(this.active)
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    back() {
      this.$router.go(-1)
    },
    handelClickNoticeBtn() {
      this.urgingDialog = true
    },
    confirmEditUrging() {
      const id = this.$route.query.id
      urgeOneAcceptance(id).then((res) => {
        this.$message.success('催办成功')
        this.getExamineDetailInfo(id)
      }).catch(() => {
        this.$message.error('催办失败，请刷新页面或再次催办')
      }).finally(() => {
        this.urgingDialog = false
      })
    },
    handelClickInvoice() {
      const id = this.$route.query.id
      confirmTransfer(id).then((res) => {
        this.$message.success('确认成功')
        this.getExamineDetailInfo(id)
      }).catch(() => {
        this.$message.error('确认失败，请刷新页面')
      })
    },
    handelClickNextOne() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
