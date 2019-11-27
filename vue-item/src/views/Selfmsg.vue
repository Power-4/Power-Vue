<template>
  <div class="selfMsg">
    <p>
      <span>工作岗位:</span>
      {{ user.role }}
    </p>
    <p>
      <span>工作编号:</span>
      {{ user.userId }}
    </p>
    <p>
      <span>入职日期:</span>
      {{ user.goDate }}
    </p>
    <p>
      <span>离职日期:</span>
      {{ user.runDate }}
    </p>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="年龄:">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="user.age"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="user.userEmail"></el-input>
      </el-form-item>
      <el-button class="butt" @click="resetForm('ruleForm')">取消</el-button>
      <el-button class="butt" type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "王波",
        age: 100,
        userEmail: "wangbo@163.com",
        role: "管理员",
        userId: "132456",
        goDate: "20191127",
        runDate: ""
      }
    };
  }
};
</script>

<style lang="less" scoped>
.selfMsg {
  width: 750px;
  margin: 0 auto;
}
.butt {
  float: right;
  margin-right: 20px;
}
</style>