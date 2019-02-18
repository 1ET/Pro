<template>
  <el-card style="height:100%" shadow="always">
    <package-bread level1="权限管理" level2="角色列表"></package-bread>
    <el-button type="success" class="btn">添加角色</el-button>
    <el-table :data="list" style="height: 300px width:100%">
      <el-table-column width="80" type="expand" class="el-icon-arrow-right">
        <template slot-scope="props">{{props.row.username}}
            <el-row>
                <el-col :span="4">1231</el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="4">1</el-col>
                        <el-col :span="20">123</el-col>
                    </el-row>
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
</style>
