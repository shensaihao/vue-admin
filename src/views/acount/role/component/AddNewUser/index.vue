<template>
  <el-dialog :visible.sync="dialogVisible" title="新增员工">
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;margin-bottom: 30px">
      <el-table-column label="员工登录账号" width="130" prop="accountNumber">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.accountNumber" class="edit-input" size="small" />
          </template>
          <span v-else>{{ scope.row.accountNumber }}</span>
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
          <el-button v-else type="danger" size="small" class="m-l-10" @click="handleDelete(scope)">删除</el-button>
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
    }
  },
  data() {
    return {
      rolesList: []
    }
  },
  methods: {
    handelClose() {
      this.$emit('close')
    },
    confirmRole() {
      this.$emit('addNewUser', this.rolesList)
    },
    confirmEdit(row) {
      row.edit = false
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
