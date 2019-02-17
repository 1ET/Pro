<template>
  <el-card shadow="always" class="cardShow">
    <!-- 头部 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row style="margin-top: 15px">
      <el-col :span="10">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          clearable
          @clear="getTableData"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchVal()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3" style="margin-left:6px">
        <el-button type="success" @click="addUsersShow()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 列表区域 -->
    <el-table :data="list" style="height: 300px width:100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>

      <!-- 不从prop里获取数据 -->
      <el-table-column label="创建日期" width="140">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
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

    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 3, 4]"
      :current-page="pagenum"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUsers()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 更改信息 对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formdata.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUsers()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 设置角色 对话框 -->
    <el-dialog title="用户名" :visible.sync="dialogFormVisibleRole" label-width="80px">
      <el-form :model="formdata">
        <el-form-item label="用户名">
          <span>{{formdata.username}}</span>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectRole" placeholder="请选择角色">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option 
            v-for='(item) in roles'
            :key = 'item.id'
            :label="item.roleName" 
            :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      formLabelWidth: "80px",
      selectRole : -1,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      roles:[]
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 每页数量改变
    handleSizeChange(val) {
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableData();
    },
    // 发请求获取数据
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.total = data.total;
        this.list = data.users;
      }
    },
    // 搜索功能
    searchVal() {
      this.getTableData();
    },
    // 添加对话框
    addUsersShow() {
      this.formdata = {};
      this.dialogFormVisibleAdd = true;
    },
    // 添加用户
    async addUsers() {
      const res = await this.$http.post(`users`, this.formdata);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.getTableData();
      } else {
        this.$message.error(msg);
      }
    },
    // 删除用户
    deleteUser(user) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${user}`);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.getTableData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑用户
    editUserShow(data) {
      this.formdata = data;
      this.dialogFormVisibleEdit = true;
    },
    async editUsers() {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      const {
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.getTableData();
        this.dialogFormVisibleEdit = false;
      }
    },
    // 角色管理 对话框
    async setRole(user) {
      // 获取角色列表
      const list = await this.$http.get('roles')
      this.roles = list.data.data
      console.log(this.roles)
      // 获取角色名
      this.dialogFormVisibleRole = true
      const res = await this.$http.get(`users/${user}`)
      const {data,data:{rid},meta:{status}} = res.data
      if(status===200){
        this.formdata = data
        this.selectRole = rid
      }
    },
    // 修改权限
    async editRole(){
      this.dialogFormVisibleRole = false
      // console.log(this.formdata.id,this.selectRole)
      const res = await this.$http.put(`users/${this.formdata.id}/role`,{rid:this.selectRole})
      console.log(res)
    }
  }
};
</script>

<style>
.cardShow {
  height: 100%;
}
</style>
