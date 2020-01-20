<template>
  <!-- 新增用户对话框 -->
  <el-dialog title="新增用户" :visible.sync="addDialogFormVisible">
    <el-form :model="addForm" :label-width="'120px'">
      <el-form-item label="用户名">
        <el-input v-model="addForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="addForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="addForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
</script>

<style>
</style>
