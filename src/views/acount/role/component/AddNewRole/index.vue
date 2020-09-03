<template>
  <el-dialog :visible.sync="roledialogVisible" :before-close="handelClose" title="权限配置">
    <el-radio-group v-model="active" class="m-b-5" @change="handelRoleChange">
      <el-radio-button v-for="(item, index) in roles" :key="index" class="m-l-10" :label="item.role" />
    </el-radio-group>
    <el-input v-if="edit" v-model="newRole" class="m-l-10" style="width:100px" />
    <el-button icon="el0icon-plus" class="m-l-10" @click="handelClickEdit">添加</el-button>
    <div class="roleListBox m-b-20">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(role,index) in roleList" :key="index" :label="role.id">{{ role.label }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="text-align:right;">
      <el-button @click="handelClose">取消</el-button>
      <el-button type="primary" class="m-l-10" @click="confirmRole">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

const roleList = [{
  label: '首页',
  id: 1,
  code: 'index'
}, {
  label: '消息',
  id: 2,
  code: 'notice'
}, {
  label: '票据审核页面访问权限',
  id: 3,
  code: 'draft'
}, {
  label: '票据审核权限（合同确认权限)',
  id: 4,
  code: 'draftContract'
}, {
  label: '票据审核（商票确认及审核权限)',
  id: 5,
  code: 'draftInfo'
}, {
  label: '票据审核（开票权限）',
  id: 6,
  code: 'draftAccept'
}, {
  label: '承兑页面访问权限',
  id: 7,
  code: 'acceptance'
}, {
  label: '承兑催办权限',
  id: 8,
  code: 'acceptanceNotice'
}, {
  label: '已承兑确认权限',
  id: 9,
  code: 'acceptanceConfirm'
}, {
  label: '贴现申请页面访问权限',
  id: 10,
  code: 'discount'
}, {
  label: '贴现申请审核权限',
  id: 11,
  code: 'discountPass'
}, {
  label: '贴现转账信息的登记提交权限',
  id: 12,
  code: 'discountCofirm'
}, {
  label: '员工管理权限',
  id: 13,
  code: 'employee'
}, {
  label: '收款账户变更权限',
  id: 14,
  code: 'bank'
}, {
  label: '企业额度管理',
  id: 15,
  code: 'limit'
}, {
  label: '贴现记录页面访问权限',
  id: 16,
  code: 'discountRecord'
}]

export default {
  props: {
    roledialogVisible: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      roleList: roleList,
      checkAll: false,
      checkedRoles: [],
      isIndeterminate: true,
      edit: false,
      active: '',
      newRole: ''
    }
  },
  created() {
  },
  methods: {
    handelClose() {
      this.$emit('close')
    },
    confirmRole() {
      console.log(this.active)
      if (this.active !== '') {
        const roleParam = {
          role: this.active,
          permission: this.checkedRoles
        }
        this.$emit('editRole', roleParam)
      } else {
        const roleParam = {
          role: this.newRole,
          permission: this.checkedRoles
        }
        this.$emit('addNewRole', roleParam)
      }
    },
    handelRoleChange(role) {
      const active = this.roles.filter(val => val.role === role)
      console.log(active[0])
      this.checkedRoles = active[0].permissionId
    },
    handleCheckAllChange(val) {
      this.checkedRoles = val ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.roles.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
    },
    handelClickEdit() {
      this.checkedRoles = []
      this.active = ''
      this.edit = true
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
.role-list-ul li:first-child button{
  margin-left: 0 !important;
}

</style>
