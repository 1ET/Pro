<template>
  <el-card style="height:100%" shadow="always">
    <package-bread level1="商品管理" level2="商品列表"></package-bread>
    <el-alert title="添加商品信息" type="info" center show-icon class="title"></el-alert>
    <el-steps :active="activeName*1" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs
      class="tabs"
      tab-position="left"
      style="height: 200px;"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        activeName:'2'
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.tabs{
    min-height: 300px;
    overflow: auto;
}
</style>
