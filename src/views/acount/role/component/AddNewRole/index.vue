<template>
  <el-dialog :visible.sync="roledialogVisible" title="权限配置">
    <ul class="flex-start">
      <li v-for="(item, index) in roleList" :key="index">
        <el-button class="m-l-10">{{ item.name }}</el-button>
      </li>
      <el-button icon="el0icon-plus" class="m-l-10">添加</el-button>
    </ul>
    <div class="roleListBox m-b-20">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in roles" :key="city" :label="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="text-align:right;">
      <el-button @click="handelClose">取消</el-button>
      <el-button type="primary" class="m-l-10" @click="confirmRole">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils'

const { constantRoutes } = require('@/router/index')

const roles = ['首页', '消息', '票据审核页面访问权限', '票据审核权限（合同确认权限）',
  '票据审核（商票确认及审核权限）', '票据审核（开票权限）', '承兑页面访问权限', '承兑催办权限']

export default {
  props: {
    roledialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleList: [{
        id: 1,
        name: '超级管理员',
        list: []
      },
      {
        id: 2,
        name: '管理员',
        list: []
      }],
      permisionList: [],
      checkAll: false,
      checkedRoles: [],
      roles: roles,
      isIndeterminate: true
    }
  },
  created() {
    this.getRoutes()
  },
  methods: {
    handelClose() {
      this.$emit('close')
    },
    confirmRole() {
      this.$emit('addNewRole', this.roleList)
    },
    getRoutes() {
      const routes = deepClone([...constantRoutes])
      this.serviceRoutes = routes
      this.routes = this.generateRoutes(routes)
    },
    handleCheckAllChange(val) {
      this.checkedRoles = val ? roles : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roles.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
    }
  }

}
</script>

<style lang="scss" scoped>
.roleListBox{
  border: 1px solid #cccccc;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
}

</style>
