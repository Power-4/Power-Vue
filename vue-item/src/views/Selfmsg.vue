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
    <el-form label-position="labelPosition" label-width="80px">
      <el-form-item label="年龄:">
        <el-input v-model="user.name" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="电话:">
        <el-input v-model="user.age" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="user.userEmail" @change="saveC = true"></el-input>
      </el-form-item>
      <el-button class="butt" @click="cancel">取消</el-button>
      <el-button class="butt a" @click="saveBtn">保存修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    // 取消修改
    cancel() {
      this.user.name = this.userClone.name;
      this.user.age = this.userClone.age;
      this.user.userEmail = this.userClone.userEmail;
      this.user.role = this.userClone.role;
      this.user.userId = this.userClone.userId;
      this.user.goDate = this.userClone.goDate;
      this.user.runDate = this.userClone.runDate;

      if (this.saveC) {
        this.saveC = false;
        this.ok("取消成功");
      }
    },
    // 弹出成功提示
    ok(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success"
      });
    },
    // 完成提示
    saveBtn() {
      if (this.saveC) {
        // 存储修改状态
        this.saveC = false;
        this.userClone.name = this.user.name;
        this.userClone.age = this.user.age;
        this.userClone.userEmail = this.user.userEmail;
        this.userClone.role = this.user.role;
        this.userClone.userId = this.user.userId;
        this.userClone.goDate = this.user.goDate;
        this.userClone.runDate = this.user.runDate;
        // 传值修改的地方
        // ···

        this.ok("修改成功");
      }
    }
  },
  data() {
    return {
      // 用户信息
      user: {
        name: "王波",
        age: 100,
        userEmail: "wangbo@163.com",
        role: "管理员",
        userId: "132456",
        goDate: "20191127",
        runDate: ""
      },
      // 复制的用户信息
      userClone: {
        name: "王波",
        age: 100,
        userEmail: "wangbo@163.com",
        role: "管理员",
        userId: "132456",
        goDate: "20191127",
        runDate: ""
      },
      // 是否修改的状态存储 false 为未修改，true为修改
      saveC: false
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
.a {
  background-color: #5ee4e4;
}
</style>