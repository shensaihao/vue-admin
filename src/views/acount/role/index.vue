<template>
  <div class="app-container">
    <el-card class="my-card">
      <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
      <el-form :inline="true" :model="roleQuery" class="qupta-form-inline" size="small">
        <el-form-item label="登录账号">
          <el-input v-model="roleQuery.acount" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="roleQuery.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="权限身份：">
          <el-select v-model="roleQuery.role" placeholder="请选择">
            <el-option label="超级管理员" value="superadmin" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item class="text-right">
          <el-button type="primary" size="small" @click="onSubmit">搜索</el-button>
          <el-button size="small" class="m-l-10" @click="handelReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="handleAdduser">新增员工</el-button>
      <el-button type="primary" class="m-l-10" @click="handelAddRole">权限配置</el-button>
      <el-table :data="rolesList" style="width: 100%;margin-top:30px;">
        <el-table-column
          label="序号"
          type="index"
          width="50"
        />
        <el-table-column label="员工登录账号" width="220" prop="accountNumber">
          <template slot-scope="scope">
            {{ scope.row.accountNumber }}
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
              <el-input v-model="scope.row.role" class="edit-input" size="small" />
            </template>
            <span v-else>{{ scope.row.role }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmEdit(scope.row)">
              保存
            </el-button>
            <el-button v-else type="primary" size="small" @click="handelEditRole(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" class="m-l-10" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-sizes="[20, 50, 100, 150]"
        :page-size="20"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="align-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <AddNewUser :dialog-visible="dialogVisible" @close="handelCloseAddUser" @addNewUser="handelConfirmAddNewUser" />
    <AddNewRole :roledialog-visible="roledialogVisible" @close="handelCloseAddRole" @addNewRole="handelConfirmAddNewRole" />
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoleList, deleteRole, editRole, addNewRole, addNewUser } from '@/api/acount'
import AddNewUser from './component/AddNewUser/index'
import AddNewRole from './component/AddNewRole/index'

const defaultRole = {
  accountNumber: '',
  realName: '',
  role: ''
}

export default {
  components: {
    AddNewUser,
    AddNewRole
  },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      page: 1,
      size: 20,
      total: 0,
      rolesList: [],
      roleQuery: {},
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
    this.getRoleList()
  },
  methods: {
    onSubmit() {
      console.log(123)
    },
    handelEditRole(row) {
      row.edit = true
    },
    confirmEdit(row) {
      row.edit = false
    },
    handelReset() {
      this.roleQuery = {}
    },
    getRoleList() {
      const param = {
        page: this.page,
        size: this.size
      }
      getRoleList(param).then((res) => {
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
      })
    },
    handleSizeChange(size) {
      this.size = size
    },
    handleCurrentChange(page) {
      this.page = page
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
    // async getRoles() {
    //   // const res = await getRoles()
    //   this.rolesList = res.data
    // },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
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
      addNewUser().then((res) => {
        this.$message.success('员工新增成功')
      }).catch(() => {
        this.$message.error('员工新增失败，请重新添加')
      })
    },
    handelConfirmAddNewRole(roles) {
      addNewRole().then((res) => {
        this.$message.success('权限新增成功')
      }).catch(() => {
        this.$message.error('员工新增失败，请重新添加')
      })
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
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
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      // const checkedKeys = this.$refs.tree.getCheckedKeys()
      //   this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        editRole(this.role).then((res) => {
          this.getRoleList()
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].acount === this.role.acount) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const employee = JSON.stringify(this.role)
        addNewRole(employee).then((res) => {
          this.rolesList.push(this.role)
        }).catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      }

      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '编辑成功成功!'
      })
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
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
