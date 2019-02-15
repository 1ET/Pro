<template>

  <el-form :label-position="labelPosition" label-width="80px" :model="formdata">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password"></el-input>
    </el-form-item>
    <el-button type="success" class="login-btn">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style>
</style>
