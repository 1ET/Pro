<template>
  <el-container class="container">
    <el-header class="header">
      <el-row :gutter="20">
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">中</div>
        </el-col>
        <el-col :span="4">
          <a href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">aside</el-aside>
      <el-main class="main">main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
</style>
