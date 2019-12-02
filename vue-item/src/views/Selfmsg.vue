<template>
  <div class="selfMsg">
    <el-form class="abc" label-position="labelPosition" label-width="120px">
      <el-form-item label="用户ID：">
        <el-input v-model="user.role" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="user.userId" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="user.userId" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-input v-model="user.age" @change="saveC = true"></el-input>
      </el-form-item>
    </el-form>
    <el-form class="abc" label-position="labelPosition" label-width="120px">
      <el-form-item label="用户年龄">
        <el-input v-model="user.name" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="用户性别：">
        <el-input v-model="user.goDate" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.goDate" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="离职时间">
        <el-input v-model="user.role" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-button class="butt" @click="cancel">取消</el-button>
      <el-button class="butt a" @click="saveBtn">保存修改</el-button>
      <el-button class="butt" @click="changePwd">修改密码</el-button>
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
    // 修改密码
    changePwd() {},
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
    },
    // 加载用户信息
    loadUserMsg() {
      //
      var userId = sessionStorage.getItem("userId");
      if (userId) {
        var words = `http://192.168.6.184:8080/user/showUser?userId=${userId}`;
        this.axios.get(words).then(res => {
          this.a = res;
          return;
        });
      } else {
        // 未登录
        window.console.log("未登录");
      }
    },
    updateUserMsg() {
      var words = `http://192.168.6.184:8080/user/modifyUser`;
      this.axios
        .post(words, {
          userId: this.user.userId,
          userName: this.user.name,
          sex: this.user.sex,
          age: this.user.age,
          joinDate: this.user.goDate,
          leavingDate: this.user.runDate,
          phone: this.data.phone,
          email: this.data.userEmail
        })
        .then(res => {
          this.a = res;
          return;
        });
    }
  },
  created() {
    this.loadUserMsg();
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
.abc {
  margin-top: 30px;
  float: left;
  width: 400px;
  margin-left: 50px;
}
.selfMsg {
  width: 900px;
}
.butt {
  float: right;
  margin-right: 20px;
}
.a {
  background-color: #5ee4e4;
}
</style>