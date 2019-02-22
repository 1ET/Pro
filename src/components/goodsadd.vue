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
    <el-form label-position="top" label-width="80px" :model="form">
      <el-tabs
        class="tabs"
        tab-position="left"
        style="height: 200px;"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <i>{{selectedOptions}}</i>
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="props"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="商品参数">
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrDy" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox :label="item1" v-for="(item1,i) in item.attr_vals" :key="i" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item,i) in arrStatic" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="商品图片">
          <el-upload
            :headers="header"
            action="http://localhost:8888/api/private/v1/upload"
            list-type="picture"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>

        <el-tab-pane label="商品内容">
          <el-form-item>
            <el-button @click="addGoods()">添加商品</el-button>
            <quill-editor class="quill" v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  created() {
    this.getGoods();
  },
  data() {
    return {
      activeName: "0",
      formLabelAlign: {},
      options: [],
      checkList: [],
      arrStatic: [],
      arrDy: [],
      header: {},
      props: {
        value: "cat_id",
        label: "cat_name"
      },
      selectedOptions: [1, 3, 6],
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
      if (this.activeName === "1" || this.activeName === "2") {
        if (this.selectedOptions.length !== 3) {
          if(this.activeName==="1"){
            this.arrDy = []
          }else{
            this.arrStatic = []
          }
          this.$message.error("请先选择三级菜单");
          return;
        }
        if (this.activeName === "1") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=many`
          );
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.arrDy = data;
            this.arrDy.forEach(item => {
              item.attr_vals =
                item.attr_vals.trim().length === 0
                  ? []
                  : item.attr_vals.trim().split(",");
            });
          }
        } else if (this.activeName === "2") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.arrStatic = data;
          }
        }
      }
    },
    async getGoods() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data,
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.options = data;
        this.header.Authorization = localStorage.getItem("token");
      }
    },
    async addGoods() {
      // 处理goods_cat属性
      this.form.goods_cat = this.selectedOptions.join(",");
      // goods_name 商品名称 不能为空
      // goods_cat 以为','分割的分类列表 不能为空
      // goods_price 价格 不能为空
      // goods_number 数量 不能为空
      // goods_weight 重量 不能为空
      // goods_introduce 介绍 可以为空
      // pics 上传的图片临时路径（对象） 可以为空
      // attrs 商品的参数（数组） 可以为空

      // 处理attrs属性
      const arr1 = this.arrDy.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      const arr2 = this.arrStatic.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      this.form.attrs = [...arr1, ...arr2];
      // 发送添加请求
      const res = await this.$http.post(`goods`, this.form);
      const {
        meta: { msg, status },
        data
      } = res.data;
      console.log(res)
      if (status === 201) {
        // 提示
        this.$message.success(msg);
        // 回到列表
        this.$router.push({
          name: "goods"
        });
      } else {
        console.log(msg);
      }
    },
    handleRemove(file, fileList) {
      console.log("---->handleRemove");
      console.log(file, fileList);
    },
    handleSuccess(response, file, fileList) {
      console.log("--->handleSuccess");
      this.form.pics.push({pic:response.data.tmp_path});
      console.log(response);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
