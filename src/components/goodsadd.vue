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
      <el-tab-pane label="基本信息">
        <el-form label-position="top" label-width="80px" :model="form">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions2"
              @change="handleChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  created() {
    this.getGoods();
  },
  data() {
    return {
      activeName: "0",
      formLabelAlign: {},
      options: [],
      props: {
        value: "cat_id",
        label: "cat_name"
      },
      selectedOptions2: [],
      form: {}
    };
  },
  methods: {
    handleClick() {},
    handleChange() {},
    async getGoods() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data,
        meta: { status, msg }
      } = res.data;
    //   console.log(res);
      if (status === 200) {
        this.options = data;
      }
    }
  }
};
</script>

<style>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.tabs {
  margin-top: 20px;
  min-height: 300px;
  overflow: auto;
}
</style>
