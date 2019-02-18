<template>
  <el-card style="height:100%" shadow="always">
    <package-bread level1="权限管理" level2="权限列表"></package-bread>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="authName" label="权限管理" width="180"></el-table-column>
      <el-table-column prop="path" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="level" label="权限等级"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
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
        console.log(this.list)
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
