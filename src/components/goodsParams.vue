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
    <el-tabs type="border-card" @tab-click="getDyparms()" v-model="actice">
      <!-- 设置动态参数 -->
      <el-tab-pane name="1" label="动态参数">
        <el-button disabled>设置动态参数</el-button>
        <el-table height="450px" border stripe :data="arrDy" style="width: 100%">
          <!-- 设置可展开列及动态编辑标签 -->
          <el-table-column type="expand" width="140px">
            <template slot-scope="scope">
              <el-tag
                :key="i"
                v-for="(item,i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,item)"
              >{{item}}</el-tag>
              <el-input
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <!-- 设置不可展开列 -->
          <el-table-column label="#" prop="id" type="index"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="2" label="静态参数">
        <el-button disabled>设置静态参数</el-button>
        <el-table :data="arrStatic" height="400" border style="width: 100%">
          <el-table-column type="index" label="#" width="180"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="320"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="320"></el-table-column>
          <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
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
      arrStatic: [],
      props: {
        value: "cat_id",
        label: "cat_name"
      },
      form: {},
      // tag属性
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    async handleChange() {
      // if (this.selectedOptions.length === 3) {
      //   const res = await this.$http.get(
      //     `categories/${this.selectedOptions[2]}/attributes?sel=many`
      //   );
      //   const {
      //     data,
      //     meta: { msg, status }
      //   } = res.data;
      //   this.arrDy = data;
      //   this.arrDy.forEach(item => {
      //     item.attr_vals =
      //       item.attr_vals.trim().length === 0
      //         ? []
      //         : item.attr_vals.trim().split(",");
      //   });
      //   console.log(data);
      // }
      this.getDyparms()
    },
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
      // 获取静态数据
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
    },
    async handleClose(obj, item) {
      obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
      const res = await this.$http.put(
        `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          // 以,分割的属性值列表 [].join(",")
          attr_vals: obj.attr_vals.join(",")
        }
      );
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(obj) {
      let inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals.push(inputValue);
        const res = await this.$http.put(
          `categories/${this.selectedOptions[2]}/attributes/${obj.attr_id}
        `,
          {
            attr_name: obj.attr_name,
            attr_sel: obj.attr_sel,
            attr_vals: obj.attr_vals.join(",")
          }
        );
      }
      this.inputVisible = false;
      this.inputValue = "";
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
