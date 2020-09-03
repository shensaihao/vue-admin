<template>
  <div>
    <div class="flex-start message-title-box">
      <el-checkbox @change="filterUnNotice">只看未读</el-checkbox>
      <el-divider direction="vertical" />
      <el-button v-if="!edit" type="text" class="message-title-right ft-size-14" @click="setAllMessageReaded">
        全部标记为已读
      </el-button>
      <el-divider v-if="!edit" direction="vertical" />
      <el-button v-if="!edit" type="text" class="message-title-right ft-size-14" @click="handelClickEdit">
        批量编辑
      </el-button>
      <el-button v-if="edit" type="primary" class="message-title-right ft-size-14" @click="handelNoticeItem">
        标记为已读
      </el-button>
      <el-divider v-if="edit" direction="vertical" />
      <el-button v-if="edit" class="message-title-right ft-size-14" @click="handelCancelEdit">
        退出编辑
      </el-button>
    </div>
    <div class="message-list-wraper">
      <el-table ref="multipleTable" :data="message" :show-header="edit" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          label="全选"
        />
        <el-table-column
          label=""
        >
          <template slot-scope="scope">
            <el-badge :hidden="scope.row.status===2" is-dot class="item">
              <el-avatar :size="40" src="https://empty">
                <img :src="scope.row.url?scope.row.url:'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'">
              </el-avatar>
            </el-badge>
          </template>
        </el-table-column>
        <el-table-column
          prop="info"
          label=""
        />
        <el-table-column
          prop="date"
          label=""
        >
          <template slot-scope="scope">
            {{ scope.row.date || '2010-07-07 10:10:10' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="delete-button flex-end">
      <el-button v-if="edit" class="message-title-right ft-size-14 m-l-10 m-t-10" @click="handelCancelDelete">
        取消
      </el-button>
      <el-button v-if="edit" class="message-title-right ft-size-14 m-l-10 m-t-10" @click="handelClickDelete">
        删除
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    message: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      edit: false,
      multipleSelection: []
    }
  },
  created() {
  },
  methods: {
    load() {
      this.$emit('load')
    },
    filterUnNotice(status) {
      if (status === true) {
        this.$emit('unNnotice')
      } else {
        this.$emit('all')
      }
    },
    handelClickEdit() {
      this.edit = true
    },
    handelCancelEdit() {
      this.edit = false
    },
    setAllMessageReaded() {
      this.$emit('setall')
    },
    setMessageReaded() {
      this.$emit('setreaded', this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handelClickDelete() {
      this.$emit('delete', this.multipleSelection)
    },
    handelCancelDelete() {
      this.edit = false
      this.multipleSelection = []
    },
    handelNoticeItem() {
      this.$emit('notice', this.multipleSelection)
    }
  }
}
</script>
<style lang="scss">
.el-badge__content.is-fixed{
  top: 3px;
}
.delete-button{
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
