<template>
  <div>
    <el-table key="examined" v-loading="loading" :data="data" style="width: 100%" :header-cell-style="headClass">
      <el-table-column prop="id" label="申请编号" align="center" />
      <el-table-column prop="applicationCreateTime" label="申请时间" align="center">
        <template slot-scope="scope">
          {{ getDate(scope.row.applicationCreateTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="draftAcceptTime" label="区块链token编号" align="center" class-name="draft_list_bg">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handelClickDraftButton('token')"
          >{{ scope.row.draftAcceptTime }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="draftAcceptTime" label="合同上链哈希" align="center" class-name="draft_list_bg">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handelClickDraftButton('hash')"
          >{{ scope.row.draftAcceptTime }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="draftAcceptTime" label="通过时间" align="center" />
      <el-table-column prop="draftAcceptTime" label="签发企业承兑时间戳" align="center">
        <template slot-scope="scope">
          {{ getTimeTemple(scope.row.draftAcceptTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="contractName" label="合同名称" align="center" />
      <el-table-column prop="drawerName" label="商票签发企业" align="center" />
      <el-table-column prop="draweeName" label="商票转让企业" align="center" />
      <el-table-column prop="rptotal" label="票据面额" align="center" />
      <el-table-column prop="acceptanceStatus" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag
            v-if="!scope.row.confirm"
            type="warning"
            size="small"
          >不通过</el-tag>
          <el-tag
            v-else
            type="paimary"
            size="small"
          >通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="gotoDetail(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :show-close="false" custom-class="draft-dialog-token">
      <div class="draft-dialog-close" />
      <div v-if="type==='token'" class="flex-center">
        <div class="flex-center-col">
          <div class="flex-between ft-size-14">
            <div>通证发行时间</div>
            <div>2020.08.27 23:28:50</div>
          </div>
          <div class="flex-between ft-size-14">
            <div>发行地址</div>
            <div>cbshuifdheiudheuidheiu</div>
          </div>
          <div class="flex-between ft-size-14">
            <div>发行哈希</div>
            <div>0x156156156156156</div>
          </div>
          <div class="flex-between ft-size-14">
            <div>发行块高</div>
            <div>23220</div>
          </div>
        </div>
        <div class="draft-dialog-bottom flex-start-center ft-size-12">
          通证声明：<br>
          当前通证为非同质化代币，在被使用前具有唯一性；<br>
          通证的价值由发行通证的地址编写记录在区块链上，不可篡改，可查询；<br>
          通证在进行有效使用后，将被区块链销毁<br>
          区块链底层合约与算法由链博科技提供技术支持 <br>
        </div>
      </div>
      <div v-else>
        <div class="flex-center-col">
          <div class="flex-between ft-size-14">
            <div>上链时间</div>
            <div>2020.08.27 23:28:50</div>
          </div>
          <div class="flex-between ft-size-14">
            <div>登记地址</div>
            <div>cbshuifdheiudheuidheiu</div>
          </div>
          <div class="flex-between ft-size-14">
            <div>登记哈希</div>
            <div>0x156156156156156</div>
          </div>
          <div class="flex-between ft-size-14">
            <div>登记区块</div>
            <div>23220</div>
          </div>
        </div>
        <div class="draft-dialog-bottom flex-start-center ft-size-12">
          登记声明：
          登记在区块链上的文件为加密文件，具有隐私性；
          您可通过文件上传者的私钥授权进行验证；
          文件加密算法与区块链登记路径由链博科技提供技术支持；
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      visible: true,
      pass: 'all',
      dialogVisible: false,
      type: 'token'
    }
  },
  methods: {
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
    getTimeTemple(time) {
      if (time) {
        return dayjs(time).valueOf()
      } else {
        return ''
      }
    },
    handelChange(sta) {
      this.$emit('filter', this.pass)
    },
    handelClose() {
      this.visible = false
    },
    gotoDetail(index, row) {
      this.$router.push({ path: '/bill/examine/detail', query: { id: row.id }})
    },
    handelClickDraftButton(type) {
      this.type = type
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.draft-dialog-token{
  width: 600px;
  height: 410px;
  background: url('../../../../../assets/images/modal_bg.png') no-repeat center center;
  .el-dialog__header{
    display: none;
  }
  .draft-dialog-bottom {
    width: 420px;
    height: 136px;
    background: #F9FAFC;
    border-radius: 6px;
  }
}
</style>
