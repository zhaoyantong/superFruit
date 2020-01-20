<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App'
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0 !important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }
  .el-table td, .el-table th{
    text-align: center;
  }
  .el-pagination{
    margin-top: 66px;
    margin-bottom: 30px;
  }
  input::placeholder {
    color: #bbb;
  }
  :focus {
    outline: -webkit-focus-ring-color auto 0px;
  }
  .el-form-item__content {
    position: relative;
  }
  /* 商品上传 */
  .el-tabs__content {
    position: inherit;
  }
  .login-container .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
    padding-top: 8px;
  }
  /* 文本框的值输入有误的提示语 */
  .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
</style>
