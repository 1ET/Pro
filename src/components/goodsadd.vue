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
            <i>{{selectedOptions}}</i>
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              :props="props"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="商品参数">
        <el-form label-position="top" label-width="80px">
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrDy" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox :label="item1" v-for="(item1,i) in item.attr_vals" :key="i" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
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
      checkList: ["aa"],
      arrDy: [],
      props: {
        value: "cat_id",
        label: "cat_name"
      },
      selectedOptions: [1, 3, 6],
      //   goods_name	商品名称	不能为空
      //   goods_cat	以为','分割的分类列表	不能为空
      //   goods_price	价格	不能为空
      //   goods_number	数量	不能为空
      //   goods_weight	重量	不能为空
      //   goods_introduce	介绍	可以为空
      //   pics	上传的图片临时路径（对象）	可以为空
      //   attrs	商品的参数（数组）	可以为空
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [{}],
        attrs: []
      }
    };
  },
  methods: {
    async handleClick() {
      console.log(this.activeName, this.selectedOptions.length);
      if (this.activeName === "1" || this.activeName === "2") {
        if (this.selectedOptions.length !== 3) {
          this.$message.error("请先选择三级菜单");
          return;
        }
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
          console.log(this.arrDy)
          this.arrDy.forEach(item => {
            item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(",");
          });
        }
      }
    },
    handleChange() {},
    async getGoods() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data,
        meta: { status, msg }
      } = res.data;
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
