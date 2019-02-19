<template>
  <el-card style="height:450px" shadow="always">
    <package-bread level1="权限管理" level2="角色列表"></package-bread>
    <el-button type="success" class="btn">添加角色</el-button>
    <el-table :data="roles" style="width:100%" max-height="400">
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
      <el-table-column label="操作" width="200">
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
              @click="setRole(scope.row)"
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
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <el-tree
        ref="treeDom"
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultChecked"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      dialogFormVisible: false,
      currId : -1,
      treeList: [],
      defaultChecked: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
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
        this.roles = data;
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
      if (status === 200) {
        this.$message.success("取消权限成功");
        user.children = data;
      }
    },
    // 显示树形结构
    async setRole(user) {
      this.currId = user.id;

      const res = await this.$http.get(`rights/tree `);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.treeList = data;

        const temp1 = [];
        user.children.forEach(item => {
          item.children.forEach(item1 => {
            item1.children.forEach(item2 => {
              temp1.push(item2.id);
            });
          });
        });
        this.defaultChecked = temp1;
      }
      this.dialogFormVisible = true;
      console.log(user, this.roles);
    },
    // 树形结构修改权限
    async setRights() {
      // 获取选择状态下的tree节点
      const arr1 = this.$refs.treeDom.getCheckedKeys();
      const arr2 = this.$refs.treeDom.getHalfCheckedNodes();
      const arr = [...arr1, ...arr2];
      const res = await this.$http.post(`roles/${this.currId}/rights`, {
        rids: arr.join(",")
      });
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.dialogFormVisible = false;
        this.getUserRights()
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
