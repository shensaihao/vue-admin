<template>
  <div class="app-container">
    <el-card class="my-card">
      <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
      <el-form :inline="true" :model="roleQuery" class="qupta-form-inline" size="small">
        <el-form-item label="登录账号">
          <el-input v-model="roleQuery.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="roleQuery.realName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="权限身份：">
          <el-select v-model="roleQuery.roleId" placeholder="请选择">
            <el-option v-for="(item, index) in roles" :key="index" :label="item.role" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
          <el-button size="small" class="m-l-10" @click="handelReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" class="my-card">
      <el-button type="primary" @click="handleAdduser">新增员工</el-button>
      <el-button type="primary" class="m-l-10" @click="handelAddRole">权限配置</el-button>
      <el-table :data="rolesList" style="width: 100%;margin-top:30px;">
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column label="员工登录账号" width="220" prop="username">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" width="220" prop="realName">
          <template slot-scope="scope">
            {{ scope.row.realName }}
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="220" prop="phone">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.phone" class="edit-input" size="small" />
            </template>
            <span v-else>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码" width="220" prop="password">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.password" class="edit-input" size="small" />
            </template>
            <span v-else>{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限身份" width="220" prop="role">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.role" placeholder="请选择" size="small">
                <el-option v-for="(item, index) in roles" :key="index" :label="item.role" :value="item.roleId" />
              </el-select>
            </template>
            <span v-else>{{ scope.row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="text" size="small" @click="confirmEdit(scope.row)">
              保存
            </el-button>
            <el-button v-else type="text" size="small" @click="handelEditRole(scope.row)">编辑</el-button>
            <el-button type="text" size="small" class="m-l-10" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[20, 50, 100, 150]"
        :page-size="size"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="align-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <AddNewUser :roles="roles" :dialog-visible="dialogVisible" @close="handelCloseAddUser" @addNewUser="handelConfirmAddNewUser" />
    <AddNewRole
      :roles="roles"
      :roledialog-visible="roledialogVisible"
      @close="handelCloseAddRole"
      @addNewRole="handelConfirmAddNewRole"
      @editRole="handelConfirmEditRole"
    />
  </div>
</template>

<script>
import { getRoleList, deleteRole, editRole, addNewRole, addNewUser, employeeManageList, editUser } from '@/api/acount'
import AddNewUser from './component/AddNewUser/index'
import AddNewRole from './component/AddNewRole/index'

export default {
  components: {
    AddNewUser,
    AddNewRole
  },
  data() {
    return {
      roles: [],
      routes: [],
      page: 1,
      size: 20,
      total: 0,
      loading: false,
      rolesList: [],
      roleQuery: {
        roleId: ''
      },
      dialogVisible: false,
      roledialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    const roleQuery = {
      page: this.page,
      size: this.size
    }
    this.getRoleList(roleQuery)
    this.getRole()
  },
  methods: {
    onSubmit() {
      const roleQuery = {
        page: 1,
        size: 20,
        ...this.roleQuery
      }
      console.log(this.roleQuery)
      this.getRoleList(roleQuery)
    },
    handelEditRole(row) {
      row.edit = true
    },
    confirmEdit(row) {
      row.edit = false
      let role = ''
      this.roles.map((item) => {
        if (item.role === row.role) {
          role = item.id
        }
      })
      const { password, id, phone, realName, username } = row
      const rolequery = {
        role,
        password,
        id,
        phone,
        realName,
        username
      }
      editUser(rolequery).then((res) => {
        const roleQuery = {
          page: 1,
          size: 20
        }
        this.getRoleList(roleQuery)
        this.$message.success('修改成功')
      }).catch(() => {
        this.$message.error('修改失败')
      })
    },
    handelReset() {
      this.roleQuery = {}
      const roleQuery = {
        page: 1,
        size: 20,
        ...this.roleQuery
      }
      this.getRoleList(roleQuery)
    },
    getRole() {
      employeeManageList().then((res) => {
        this.roles = res.content
      })
    },
    getRoleList(roleQuery) {
      this.loading = true
      getRoleList(roleQuery).then((res) => {
        const list = res.content.list
        this.rolesList = list.map(v => {
          this.$set(v, 'edit', false)
          return v
        })
        this.total = res.content.count
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    handleSizeChange(size) {
      this.size = size
      const roleQuery = {
        page: 1,
        size: this.size,
        ...this.roleQuery
      }
      this.getRoleList(roleQuery)
    },
    handleCurrentChange(page) {
      this.page = page
      const roleQuery = {
        page: this.page,
        size: this.size,
        ...this.roleQuery
      }
      this.getRoleList(roleQuery)
    },
    deleteRole(row) {
      const { id } = row
      deleteRole(id).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    editRole() {
      editRole().then((res) => {
        const roleQuery = {
          page: 1,
          size: 20
        }
        this.getRoleList(roleQuery)
      }).then(() => {
        this.$message({
          type: 'success',
          message: '编辑成功!'
        })
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    addNewRole() {
      addNewRole().then((res) => {
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handleAdduser() {
      this.dialogVisible = true
    },
    handelAddRole() {
      this.roledialogVisible = true
    },
    handelCloseAddUser() {
      this.dialogVisible = false
    },
    handelCloseAddRole() {
      this.roledialogVisible = false
    },
    handelConfirmAddNewUser(users) {
      console.log(users)
      addNewUser(users).then((res) => {
        this.$message.success('员工新增成功')
        this.dialogVisible = false
        const roleQuery = {
          page: 1,
          size: 20
        }
        this.getRoleList(roleQuery)
      }).catch(() => {
        this.$message.error('员工新增失败，请重新添加')
      })
    },
    handelConfirmAddNewRole(roles) {
      addNewRole(roles).then((res) => {
        this.$message.success('权限新增成功')
        this.roledialogVisible = false
      }).catch(() => {
        this.$message.error('权限新增失败，请重新添加')
      })
    },
    handelConfirmEditRole(roles) {
      editRole(roles).then((res) => {
        this.$message.success('权限修改成功')
        this.roledialogVisible = false
      }).catch(() => {
        this.$message.error('权限修改失败，请重试')
        this.roledialogVisible = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteRole(row)
          this.rolesList.splice($index, 1)
        })
        .catch(() => {
          this.$message.error('删除失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
