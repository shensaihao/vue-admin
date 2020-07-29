<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div style="float: right;font-size:13px;color: #ccc">momo.xyz</div>
      <el-dropdown class="avatar-container" trigger="click" style="float: right;margin-right:10px">
        <div class="avatar-wrapper">
          <el-image :src="avatar" class="user-avatar" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="float: right;margin-right:10px" class="cursor-pointer" @click="openMessage">
        <i class="el-icon-bell" />
      </div>
    </div>
    <el-drawer
      title="我的消息!"
      :visible.sync="isOpenMessage"
      direction="rtl"
      size="70%"
    >
      <message :message="messageList" />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Message from '@/views/message/index'
import { getMessageList } from '@/api/message'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Message
  },
  data() {
    return {
      isOpenMessage: false,
      messageList: [],
      page: 1,
      size: 20
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.getMessageList()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    openMessage() {
      this.isOpenMessage = true
    },
    getMessageList() {
      const noticeQuery = {
        page: this.page,
        size: this.size,
        status: 1 // 1已读 2 未读
      }
      getMessageList(noticeQuery).then((res) => {
        this.messageList = res.content.list
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        position: relative;
        top: 25px;
        margin-top: -15px;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
