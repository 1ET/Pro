<template>
  <el-container class="container">
    <el-header class="header">
      <el-row :gutter="20">
        <el-col :span="3">
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple">电商后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <a href="#" class="exitUser" @click.prevent="handleLoginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu unique-opened :router="true" default-active="2" class="el-menu-vertical-demo">
          <!-- 模块1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="list" class="el-icon-menu">用户列表</el-menu-item>
          </el-submenu>

          <!-- 模块2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles" class="el-icon-menu">角色列表</el-menu-item>
            <el-menu-item index="rightsList" class="el-icon-menu">权限列表</el-menu-item>
          </el-submenu>

          <!-- 模块3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1" class="el-icon-menu">商品列表</el-menu-item>
            <el-menu-item index="1-1" class="el-icon-menu">分类参数</el-menu-item>
            <el-menu-item index="1-1" class="el-icon-menu">商品分类</el-menu-item>
          </el-submenu>

          <!-- 模块4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1" class="el-icon-menu">订单列表</el-menu-item>
          </el-submenu>

          <!-- 模块5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1" class="el-icon-menu">数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeMount () {
    if (!localStorage.getItem('token')) {
      this.$router.push({
        name: 'login'
      })
      this.$message.error('请先登录')
    }
  },
  methods: {
    handleLoginout () {
      this.$router.push({
        name: 'login'
      })
      this.$message.success('退出成功')
      localStorage.clear()
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  background: red;
}
.aside {
  background: yellow;
}
.main {
  background: green;
}
.grid-content {
  line-height: 60px;
  text-align: center;
  font-size: 20px;
}
.exitUser {
  line-height: 60px;
  text-decoration: none;
  text-align: center;
}
</style>
