<template>
  <div class="selfMsg">
    <el-form class="abc" label-position="labelPosition" label-width="120px">
      <el-form-item label="用户ID：" disabled>
        <el-input v-model="user.userId" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="user.userName" @change="saveC = true" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="user.phone" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-input v-model="user.joinDate" @change="saveC = true" disabled></el-input>
      </el-form-item>
    </el-form>
    <el-form class="abc" label-position="labelPosition" label-width="120px">
      <el-form-item label="用户年龄">
        <el-input v-model="user.age" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="用户性别：">
        <el-input v-model="user.sex" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" @change="saveC = true"></el-input>
      </el-form-item>
      <el-form-item label="离职时间">
        <el-input v-model="user.leavingDate" @change="saveC = true" disabled></el-input>
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
      this.user.age = this.userClone.age;
      this.user.email = this.userClone.email;
      this.user.joinDate = this.userClone.joinDate;
      this.user.leavingDate = this.userClone.leavingDate;
      this.user.phone = this.userClone.phone;
      this.user.role = this.userClone.role;
      this.user.sex = this.userClone.sex;
      this.user.systemPropertiesValue = this.userClone.systemPropertiesValue;
      this.user.userId = this.userClone.userId;
      this.user.userName = this.userClone.userName;
      this.user.roleName = this.userClone.role.roleName;

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
        this.userClone.age = this.user.age;
        this.userClone.email = this.user.email;
        this.userClone.joinDate = this.user.joinDate;
        this.userClone.leavingDate = this.user.leavingDate;
        this.userClone.phone = this.user.phone;
        this.userClone.role = this.user.role;
        this.userClone.sex = this.user.sex;
        this.userClone.systemPropertiesValue =
          this.user.systemPropertiesValue;
        this.userClone.userId = this.user.userId;
        this.userClone.userName = this.user.userName;
        this.userClone.role.roleName = this.user.role.roleName;
        // 传值修改的地方
        // ···
        this.updateUserMsg();

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
          window.console.log(res.data.data.user);
          this.user.age = res.data.data.user.age;
          this.user.email = res.data.data.user.email;
          this.user.joinDate = res.data.data.user.joinDate;
          this.user.leavingDate = res.data.data.user.leavingDate;
          this.user.phone = res.data.data.user.phone;
          this.user.role = res.data.data.user.role;
          this.user.sex = res.data.data.user.sex;
          this.user.systemPropertiesValue =
            res.data.data.user.systemPropertiesValue;
          this.user.userId = res.data.data.user.userId;
          this.user.userName = res.data.data.user.userName;
          this.user.roleName = res.data.data.user.role.roleName;

          this.userClone.age = res.data.data.user.age;
          this.userClone.email = res.data.data.user.email;
          this.userClone.joinDate = res.data.data.user.joinDate;
          this.userClone.leavingDate = res.data.data.user.leavingDate;
          this.userClone.phone = res.data.data.user.phone;
          this.userClone.role = res.data.data.user.role;
          this.userClone.sex = res.data.data.user.sex;
          this.userClone.systemPropertiesValue =
            res.data.data.user.systemPropertiesValue;
          this.userClone.userId = res.data.data.user.userId;
          this.userClone.userName = res.data.data.user.userName;
          this.userClone.role.roleName = res.data.data.user.role.roleName;
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
          userName: this.user.userName,
          sex: this.user.sex,
          age: this.user.age,
          joinDate: this.user.joinDate,
          leavingDate: this.user.leavingDate,
          phone: this.user.phone,
          email: this.user.email
        })
        .then(res => {
          window.console.log(res);
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
        age: 0,
        email: "",
        joinDate: "",
        leavingDate: "",
        phone: "",
        role: "",
        sex: "",
        systemPropertiesValue: "",
        userId: 0,
        userName: "",
        userPwd: "",
        name: ""
      },
      // 复制的用户信息
      userClone: {
        age: "",
        email: "",
        joinDate: "",
        leavingDate: "",
        phone: "",
        role: "",
        sex: "",
        systemPropertiesValue: "",
        userId: "",
        userName: "",
        userPwd: "",
        name: ""
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