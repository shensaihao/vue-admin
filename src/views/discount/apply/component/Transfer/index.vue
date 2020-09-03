<template>
  <el-card v-if="detail.remitterVO" class="my-card">
    <el-form label-width="130px" label-position="left" :model="transferForm">
      <el-form-item label="我方贴现金额：">
        <el-input v-if="hasEditAmount" v-model="transferForm.total" style="width:300px" @change="handelChangeForm" />
        <span v-if="!hasEditAmount">{{ transferForm.total }}</span>
        <el-button v-if="!hasEditAmount" type="text" class="m-l-10" @click="handelEditAmount">修改</el-button>
        <el-button v-if="hasEditAmount" type="text" class="m-l-10" @click="confirmEditAmount">确定</el-button>
        <el-button v-if="hasEditAmount" type="text" class="m-l-10" @click="cancelEditAmount">取消</el-button>
      </el-form-item>
      <el-form-item label="我方转账日期：">
        <el-date-picker
          v-model="transferForm.transDate"
          type="datetime"
          placeholder="选择日期时间"
          align="right"
          @change="handelChangeForm"
        />
      </el-form-item>
      <el-form-item label="我方转账账户名称">
        <el-input v-model="transferForm.accountName" style="width:300px" @change="handelChangeForm" />
      </el-form-item>
      <el-form-item label="我方转账账号：">
        <el-input v-model="transferForm.accountNo" style="width:300px" @change="handelChangeForm" />
      </el-form-item>
      <el-form-item label="我方汇款订单号：">
        <el-input v-model="transferForm.no" placeholder="我方汇款订单号：" style="width:300px" @change="handelChangeForm" />
      </el-form-item>
      <el-form-item v-model="transferForm.certUrl" label="我方汇款证明：" style="width: 400px">
        <el-upload
          drag
          action="/discount/applies/upload"
          :before-upload="beforeUpload"
          :show-file-list="true"
        >
          <i v-if="transferForm.certUrl===null" class="el-icon-upload" />
          <div v-if="transferForm.certUrl===null" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div v-if="transferForm.certUrl===null" class="el-upload__text">支持扩展名：.pdf .jpg .png</div>
          <el-image v-if="transferForm.certUrl!==null" :src="transferForm.certUrl">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { discountAppliesUpload } from '@/api/discount'
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      hasEditAmount: false
    }
  },
  computed: {
    transferForm: {
      get() {
        return this.detail.remitterVO
      },
      set(value) {
        return this.$emit('remitter', value)
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const formDate = new FormData()
      formDate.append('discountId', this.$route.query.id)
      formDate.append('file', file)
      discountAppliesUpload(formDate).then((res) => {
        this.$emit('upload', res.content[0])
        this.$message.success('上传成功')
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    handelEditAmount() {
      this.hasEditAmount = true
    },
    confirmEditAmount() {
      this.hasEditAmount = false
    },
    cancelEditAmount() {
      this.hasEditAmount = false
    },
    handelChangeForm() {
      this.$emit('remitter', this.transferForm)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
