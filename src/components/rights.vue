<template>
  <el-card style="height:100%" shadow="always">
    <package-bread level1="权限管理" level2="权限列表"></package-bread>
    <el-table :data="list" height="400">
      <el-table-column label="#" width="150" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column prop="path" label="路径" width="200"></el-table-column>
      <el-table-column label="路径" width="200">
        <template slot-scope="scope">
            <span v-if="scope.row.level===`0`">一级</span>
            <span v-if="scope.row.level===`1`">二级</span>
            <span v-if="scope.row.level===`2`">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    async gitRightsList() {
      const res = await this.$http.get(`rights/list`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.list = data;
        // console.log(this.list)
      }
    }
  },
  beforeMount() {
    this.gitRightsList();
  }
};
</script>

<style>
</style>
