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
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchVal()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3" style="margin-left:6px">
        <el-button type="success">添加用户</el-button>
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
        <el-row>
          <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain circle></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain circle></el-button>
        </el-row>
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
      total: -1
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
    }
  }
};
</script>

<style>
.cardShow {
  height: 100%;
}
</style>
