<template>
  <el-card class="box">
    <package-bread level1="商品管理" level2="分类参数"></package-bread>
    <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning" show-icon></el-alert>
    <el-form label-position="left" label-width="120px" :model="form" class="fom">
      <el-form-item label="请选择商品分类">
        <i>{{selectedOptions}}</i>
        <el-cascader
          clearable
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          :props="props"
          :show-all-levels="false"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs type="border-card" @tab-click="changeTab()" v-model="actice">
      <!-- 设置动态参数 -->
      <el-tab-pane name="1" label="动态参数">
        <el-button disabled>设置动态参数</el-button>
        <el-table height="450px" border stripe :data="arrDy" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props"></template>
          </el-table-column>

          <el-table-column label="#" prop="id"></el-table-column>
          <el-table-column label="属性名称" prop="name"></el-table-column>
          <el-table-column label="操作" prop="desc"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" label="静态参数">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      actice: "1",
      options: [],
      selectedOptions: [],
      arrDy: [],
      props: {
        value: "cat_id",
        label: "cat_name"
      },
      form: {}
    };
  },
  methods: {
    handleChange() {},
    async getGoods() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    },
    async getDyparms() {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning("请选择三级分类!!");
        if (this.actice === "1") {
          this.arrDy = [];
        }
        if (this.actice === "2") {
          this.arrStatic = [];
        }
        return;
      }
      // 获取动态数组
      if (this.actice === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
          this.arrDy.forEach(item => {
            item.attr_vals =
              item.attr_vals.trim().length === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
          console.log("动态参数数组--");
          console.log(this.arrDy);
        }
      }

      if (this.actice === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        const {
          meta: { msg, status },
          data
        } = res.data;
        if (status === 200) {
          this.arrStatic = data;
          console.log("静态参数数组--");
          console.log(this.arrStatic);
        }
      }
    }
  },
  created() {
    this.getGoods();
  }
};
</script>

<style>
.box {
  height: 100%;
}
.fom,
.alert {
  margin-top: 20px;
}
</style>
