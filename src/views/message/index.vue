<template>
  <div>
    <div class="flex-start message-title-box">
      <el-checkbox @change="filterUnNotice">只看未读</el-checkbox>
      <el-divider direction="vertical" />
      <el-button type="text" class="message-title-right ft-size-14" @click="setMessageReaded">
        全部标记为已读
      </el-button>
      <el-divider direction="vertical" />
      <el-button type="text" class="message-title-right ft-size-14" @click="handelClickNotRead">
        批量编辑
      </el-button>
    </div>
    <div class="message-list-wraper">
      <ul
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        class="message-list-ul"
      >
        <li v-for="(item, index) in message" :key="index" class="message-list-item">
          <div class="flex-between">
            <el-badge class="message-item-image">
              <el-image style="width: 40px; height: 40px; border-radius: 20px" fit="cover" />
            </el-badge>
            <el-link :underline="false">
              {{ item.content }}
            </el-link>
            <div class="font-gray-color ft-size-14">
              {{ item.date }}
            </div>
          </div>
          <el-divider />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { setMessageReaded, deleteMessage, getMessageList } from '@/api/message'

export default {
  props: {
    message: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: [],
      messageList: [],
      total: 0,
      page: 1,
      size: 20,
      status: 1
    }
  },
  created() {
    const noticeQuery = {
      page: 1,
      size: 30,
      status: this.status
    }
    this.getMessageList(noticeQuery)
  },
  methods: {
    load() {
      const noticeQuery = {
        page: this.page + 1,
        size: 30,
        status: this.status
      }
      this.getMessageList(noticeQuery)
    },
    getMessageList(noticeQuery) {
      getMessageList(noticeQuery).then((res) => {
        this.messageList = res.content
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    filterUnNotice() {
      this.status = 2
      const noticeQuery = {
        page: 1,
        size: 30,
        status: this.status
      }
      this.getMessageList(noticeQuery)
    },
    setMessageReaded() {
      setMessageReaded().then((res) => {
        this.getMessageList()
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    deleteMessage() {
      deleteMessage().then((res) => {
        this.getMessageList()
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    handelChangeAll(type) {
      if (type) {
        // 全部已读
      } else {
        // else
      }
    },
    handelClickNotRead() {
      // 只看未读
      // this.messageList.filter
    },
    handleSizeChange(size) {
      this.size = size
    },
    handleCurrentChange(page) {
      this.page = page
    },
    handelDelateClick(row) {
      console.log(row)
    },
    handelClickMore() {
      console.log('more')
    },
    clickDetail() {
      this.$router.push('/')
    }
  }
}
</script>
