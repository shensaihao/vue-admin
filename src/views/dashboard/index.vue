<template>
  <div v-loading="loading" class="home_container">
    <!-- <div class="home_top_logo m-b-20">
      <img src="../../assets/images/home_top_logo.png" alt="">
    </div> -->
    <div class="flex-between">
      <div class="home_top_left">
        <div class="flex-center m-b-30">
          <img src="../../assets/images/new_logo1.png" alt="">
        </div>
        <div class="flex-start-center ft-size-14 home_top_left_desc">
          成都任我行软件股份有限公司是中国中小企业管理软件行业的创始者和领导者，旗下拥有“管家婆”、“任我行”、
          “千方百剂”等知名品牌，产品涵盖进销存、财务、ERP、 CRM、OA、电子商务和移动商务等领域。
          目前，任我行软件产品已经成功地应用于国内及海外的上百万家中小企业。 十多年来，在竞争激烈的软件市场上，
          管家婆软件凭借“实用、易用、贴近中小企业管理现状”的特点受到中小企业的广泛欢迎和信赖，市场占有率持续多年稳居行业榜首，
          “管家婆”也由此成为中小企业管理软件的代名词。
        </div>
        <br>
        <div class="flex-start-center ft-size-14 home_top_left_desc">
          成都起业科技有限公司是任我行大股东投资成立的，提供中小微企业大数据征信服务的金融科技企业。起业科技通过区块链供应链的大数据征信，
          引金融活水为实体小微企业赋能，是起业科技的使命责任和必由之路。
        </div>
        <br>
        <div class="flex-start-center ft-size-14 home_top_left_desc">
          管家婆起业科技区块链供应链金融以核心企业为依托，以真实贸易背景为前提，通过将商贸流通供应链业务场景嵌入区块链网络，
          在实现订单+支付+物流信息整合上链确权的基础上，对供应链上下游企业提供数据征信，使之成为是各金融机构授信的重要参考依据，
          实现对上下游企业有效的资金供给和数据资产授信。推动普惠金融赋能供应链，助力产融结合。
        </div>
      </div>
      <div class="home_top_right flex-center-col">
        <div class="flex-between m-b-30">
          <div class="flex-start">
            <div class="home_top_right_line_1 m-r-20" />
            <div class="ft-size-14 font-gray-color">待审核票据</div>
          </div>
          <div class="ft-size-14"><span class="ft-size-20 font-weight">15</span>条</div>
        </div>
        <div class="flex-between m-b-30">
          <div class="flex-start">
            <div class="home_top_right_line_2 m-r-20" />
            <div class="ft-size-14 font-gray-color">待确认承兑</div>
          </div>
          <div class="ft-size-14"><span class="ft-size-20 font-weight">10</span>条</div>
        </div>
        <div class="flex-between">
          <div class="flex-start">
            <div class="home_top_right_line_3 m-r-20" />
            <div class="ft-size-14 font-gray-color">待审核贴现记录</div>
          </div>
          <div class="ft-size-14"><span class="ft-size-20 font-weight">16</span>条</div>
        </div>
      </div>
    </div>
    <el-card class="my-card home_contract">
      <div class="draft-detail-title">合同/商票登记上链流程</div>
      <div class="draft-detail-line" />
      <div class="flex-around">
        <img src="../../assets/images/contract_1.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/contract_2.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/contract_3.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/contract_4.png" alt="">
      </div>
      <div class="flex-around mt-14">
        <div style="width: 85px;margin-left: -6px;" class="text-center ft-size-14">文件安全提交</div>
        <div style="width:30px" />
        <div style="width: 85px;" class="text-center ft-size-14">文件隐私加密</div>
        <div style="width:30px" />
        <div style="width:134px; margin-left: 11px;" class="text-center ft-size-14">电子身份签名文件<br>信息登记上链</div>
        <div style="width:40px" />
        <div style="width:134px" class="text-center ft-size-14">随时可验证<br>内容不可篡改<br>身份不可伪造</div>
      </div>
    </el-card>
    <el-card class="my-card home_contract">
      <div class="draft-detail-title">商票转让流程</div>
      <div class="draft-detail-line" />
      <div class="flex-around">
        <img src="../../assets/images/draft_1.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/draft_2.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/draft_3.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/draft_4.png" alt="">
      </div>
      <div class="flex-around mt-14">
        <div style="width: 131px;margin-left: -28px;" class="text-center ft-size-14">
          业务平台提交申请<br>
          商票持有者转让商票
        </div>
        <div style="width:30px" />
        <div style="width: 116px;margin-left: -39px;" class="text-center ft-size-14">保理机构接收商票</div>
        <div style="width:30px" />
        <div style="width: 140px;margin-left: -13px;" class="text-center ft-size-14">商票转让信息登记上链</div>
        <div style="width:40px" />
        <div style="width:134px" class="text-center ft-size-14">保理机构在区块链上<br>发行可贴现通证</div>
      </div>
    </el-card>
    <el-card class="my-card home_contract">
      <div class="draft-detail-title">商票贴现流程</div>
      <div class="draft-detail-line" />
      <div class="flex-around">
        <img src="../../assets/images/discount_1.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/discount_2.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/discount_3.png" alt="">
        <img src="../../assets/images/home_arrow.png" alt="">
        <img src="../../assets/images/discount_4.png" alt="">
      </div>
      <div class="flex-around mt-14">
        <div style="width: 129px;margin-left: -28px;" class="text-center ft-size-14">
          业务平台提交申请<br>
          通证持有者申请贴现</div>
        <div style="width:30px" />
        <div style="width: 85px;margin-left: 9px;" class="text-center ft-size-14">保理机构接收有价值的通证</div>
        <div style="width:30px" />
        <div style="width: 121px;margin-left: 8px;" class="text-center ft-size-14">保理机构进行贴现</div>
        <div style="width:40px" />
        <div style="width:134px" class="text-center ft-size-14">区块链对已使用的<br>通证进行销毁</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home_container{
  padding: 20px 30px 65px 30px;
  .home_top_left{
    width: 79%;
    height: 350px;
    background: #FFFFFF;
    box-shadow: 1px 10px 35px 0px rgba(214, 220, 245, 0.3);
    border-radius: 16px;
    padding: 30px 40px;
    overflow: auto;
    .home_top_left_desc {
      line-height: 25px;
    }
  }
  .home_top_right {
    width: 20%;
    height: 350px;
    background: #FFFFFF;
    box-shadow: 1px 10px 35px 0px rgba(214, 220, 245, 0.3);
    border-radius: 16px;
    padding: 30px;
    .home_top_right_line_1{
      width: 4px;
      height: 34px;
      background: #3389F3;
      border-radius: 2px;
    }
    .home_top_right_line_2{
      width: 4px;
      height: 34px;
      background: #F28B38;
      border-radius: 2px;
    }
    .home_top_right_line_3{
      width: 4px;
      height: 34px;
      background: #4EBDE1;
      border-radius: 2px;
    }
  }
}
</style>
