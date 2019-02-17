<template>
  <el-card style="height:100%" shadow="always">
    <package-bread level1="权限管理" level2="权限列表"></package-bread>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        list:[]
    };
  },
  methods: {
    async gitRightsList() {
      const res = await this.$http.get(`rights/list`);
      const {data,meta:{msg,status}} = res.data
      if(status===200){
          this.list = data
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
