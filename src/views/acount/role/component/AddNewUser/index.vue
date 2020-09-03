<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="handelClose" title="新增员工">
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;margin-bottom: 30px">
      <el-table-column label="员工登录账号" width="130" prop="username">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.username" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" width="130" prop="realName">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.realName" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.realName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="130" prop="phone">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.phone" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="130" prop="password">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.password" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限身份" width="130" prop="role">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select v-model="scope.row.role" placeholder="请选择" size="small">
              <el-option v-for="(item, index) in roles" :key="index" :label="item.role" :value="item.role" />
            </el-select>
          </template>
          <span v-else>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="primary" size="small" @click="confirmEdit(scope.row)">
            保存
          </el-button>
          <el-button v-else type="danger" size="small" class="m-l-10" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-user-btn cursor-pointer" @click="handelAddNewUser"><i class="el-icon-plus m-r-10" />添加</div>
    <div style="text-align:right;">
      <el-button @click="handelClose">取消</el-button>
      <el-button type="primary" class="m-l-10" @click="confirmRole">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
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
      rolesList: [],
      newList: [],
      roleId: ''
    }
  },
  methods: {
    handelClose() {
      this.$emit('close')
    },
    confirmRole() {
      this.$emit('addNewUser', this.newList)
    },
    confirmEdit(row) {
      if (row.username && row.realName && row.phone && row.password && row.role) {
        const role = this.roles.filter(item => item.role === row.role)
        const { roleId } = role[0]
        console.log(row)
        const { username, realName, phone, password } = row
        this.newList.push({
          username,
          realName,
          phone,
          password,
          role: roleId
        })
        row.edit = false
      } else {
        this.$message.error('请先完整填写账号信息')
      }
    },
    handleDelete(index) {
      this.newList.splice(index, 1)
      this.rolesList.splice(index, 1)
    },
    handelAddNewUser() {
      this.rolesList.push({
        edit: true
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.add-user-btn{
    border: 1px dashed #cccccc;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    margin-bottom: 20px;
}
</style>
