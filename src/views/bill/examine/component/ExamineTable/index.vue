<template>
  <div>
    <el-table key="examine" v-loading="loading" :data="data" style="width: 100%" :header-cell-style="headClass">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.applicationCreateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="contractHash" width="150px" label="合同上链哈希" align="center" class-name="draft_list_bg">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handelClickDraftButton({type: 'hash',token: scope.row.id})"
          >{{ scope.row.contractHash }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="contractName" label="合同名称" align="center" />
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="rptotal" label="票据面额" align="center" />
      <el-table-column prop="acceptDate" label="汇票到期日" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.acceptDate) }}
        </template>
      </el-table-column>
      <el-table-column label="商票扫描件" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            class="m-r-10"
            @click="draftFrontPage(scope.$index, scope.row)"
          >正面</el-button>
          <el-button
            type="text"
            size="small"
            @click="draftBackPage(scope.$index, scope.row)"
          >背面</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >去审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" custom-class="draft-dialog-token">
      <div class="draft-dialog-close cursor-pointer" @click="dialogVisible=false" />
      <div class="flex-center-col">
        <div class="flex-center-col" style="width:420px">
          <div class="flex-between ft-size-14 m-y-15">
            <div>上链时间</div>
            <div>{{ getDate(tokenInfo.gmtCreate) }}</div>
          </div>
          <div class="flex-between ft-size-14 m-y-15">
            <div>登记地址</div>
            <div>{{ randomString() }}</div>
          </div>
          <div class="flex-between ft-size-14 m-y-15">
            <div>登记哈希</div>
            <div>{{ tokenInfo.contractHash }}</div>
          </div>
          <div class="flex-between ft-size-14 m-y-15">
            <div>登记区块</div>
            <div>{{ tokenInfo.blockZone }}</div>
          </div>
        </div>
        <div class="draft-dialog-bottom flex-start-center ft-size-12">
          登记声明：<br>
          登记在区块链上的文件为加密文件，具有隐私性；<br>
          您可通过文件上传者的私钥授权进行验证；<br>
          文件加密算法与区块链登记路径由链博科技提供技术支持；<br>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { examineGetHash } from '@/api/bill'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      type: 'hash',
      tokenInfo: {}
    }
  },
  methods: {
    examineGetToken(token) {
      examineGetHash(token).then((res) => {
        this.tokenInfo = res.content
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    randomString() {
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      const maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < 16; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    handelClickDraftButton(info) {
      this.type = info.type
      this.examineGetToken(info.token)
      this.dialogVisible = true
    },
    headClass() {
      return 'background: #F9FAFC;'
    },
    getDate(time) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/bill/examine/detail', query: { id: row.id }})
    },
    draftBackPage(index, row) {
      this.$emit('back', row)
    },
    draftFrontPage(index, row) {
      this.$emit('front', row)
    }

  }
}
</script>

<style lang="scss" scoped>
.draft-dialog-token{
  width: 600px;
  height: 410px;
  background: url('../../../../../assets/images/modal_bg.png') no-repeat;
  border-radius: 15px;
  .draft-dialog-close{
    width: 551px;
    height: 24px;
    background: url('../../../../../assets/images/modal_close.png') no-repeat;
    background-position-x: 100%;
    margin-bottom: 30px;
  }
  .el-dialog__header{
    display: none;
  }
  .draft-dialog-bottom {
    width: 420px;
    height: 116px;
    background: #F9FAFC;
    border-radius: 6px;
    padding-top: 19px;
    color: #7B7F8A;
    padding-left: 19px;
    font-size: 12px;
    line-height: 21px;
  }
}
</style>
