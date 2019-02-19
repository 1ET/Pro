<template>
  <el-card style="height:450px" shadow="always">
    <package-bread level1="权限管理" level2="角色列表"></package-bread>
    <el-button type="success" class="btn">添加角色</el-button>
    <el-table :data="list" style="width:100%" max-height="400">
      <el-table-column width="80" type="expand" class="el-icon-arrow-right">
        <template slot-scope="scope">
          <el-row v-for="(item,i) in scope.row.children" :key="item.id" class="rowF1">
            <el-col :span="4">
              <el-tag @close="deleRights(scope.row,item)" closable type="success">{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item1,i) in item.children" :key="item1.id" class="rowF2">
                <el-col :span="4">
                  <el-tag
                    type="warning"
                    @close="deleRights(scope.row,item1)"
                    closable
                  >{{item1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleRights(scope.row,item2)"
                    type="info"
                    closable
                    v-for="(item2,i) in item1.children"
                    :key="item2.id"
                    class="rowF3"
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <el-col>
              <span>未分配权限</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" width="180" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="240"></el-table-column>

      <!-- 不从prop里获取数据 -->
      <el-table-column prop="name" label="操作" width="200">
        <template slot-scope="scope">
          <el-row>
            <el-button
              @click="editUserShow(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              plain
              circle
            ></el-button>
            <el-button
              @click="deleteUser(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              circle
            ></el-button>
            <el-button
              @click="setRole(scope.row.id)"
              type="success"
              icon="el-icon-check"
              size="mini"
              plain
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    // 获取角色权限
    async getUserRights() {
      const res = await this.$http.get(`roles`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.list = data;
        console.log(this.list);
      }
    },
    // 取消角色权限
    async deleRights(user, roles) {
      // console.log(user,roles)
      const res = await this.$http.delete(
        `roles/${user.id}/rights/${roles.id}`
      );
      const {
        meta: { msg, status },
        data
      } = res.data;
      if(status===200){
        this.$message.success('取消权限成功')
        user.children = data
      }
    }
  },
  created() {
    this.getUserRights();
  }
};
</script>

<style>
.btn {
  margin-top: 20px;
}
/* .rowF1 {
  margin-bottom: 20px;
} */
.rowF3,
.rowF2 {
  margin-bottom: 10px;
}
</style>
