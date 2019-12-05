<template>
  <div class="selfMsg">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>个人资料修改</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户框 -->
    <el-form
      class="abc"
      label-position="labelPosition"
      label-width="120px"
      :model="user"
      :rules="msgRules"
      ref="msgForm"
    >
      <div class="form-left">
        <el-form-item label="用户ID：" disabled prop="userId">
          <el-input v-model="user.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="user.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="joinDate">
          <el-input v-model="user.joinDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" disabled></el-input>
        </el-form-item>
      </div>
      <div class="form-right" prop="age">
        <el-form-item label="用户年龄">
          <el-input v-model.number="user.age"></el-input>
        </el-form-item>
        <el-form-item label="用户性别：" prop="sex">
          <el-input v-model="user.sex"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="离职时间" prop="leavingDate">
          <el-input v-model="user.leavingDate" disabled></el-input>
        </el-form-item>
        <el-button class="butt" @click="resetForm('msgForm')">取消</el-button>
        <el-button class="butt a" @click="submitForm('msgForm')">保存修改</el-button>
        <el-button class="butt" @click="openPwd">修改密码</el-button>
      </div>
    </el-form>
    <!-- 密码模态框 -->
    <el-dialog :visible.sync="pwdDialog" title="修改面膜">
      <!-- 密码模态框 -->
      <el-form :model="pass" :rules="passRules" ref="pwdForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="pass.oldPass" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="pass.pass" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPass">
          <el-input v-model="pass.newPass" show-password></el-input>
        </el-form-item>
        <div class="pwdBTN">
          <div>
            <el-button type="primary" @click="submitForm('pwdForm')">确认修改</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
            <el-button @click="canselPwd">取消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
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
        this.userClone.systemPropertiesValue = this.user.systemPropertiesValue;
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
        // http://192.168.6.184:8080
        var words = `/user/showUser?userId=${userId}`;
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

          // this.userClone.age = res.data.data.user.age;
          // this.userClone.email = res.data.data.user.email;
          // this.userClone.joinDate = res.data.data.user.joinDate;
          // this.userClone.leavingDate = res.data.data.user.leavingDate;
          // this.userClone.phone = res.data.data.user.phone;
          // this.userClone.role = res.data.data.user.role;
          // this.userClone.sex = res.data.data.user.sex;
          // this.userClone.systemPropertiesValue =
          //   res.data.data.user.systemPropertiesValue;
          // this.userClone.userId = res.data.data.user.userId;
          // this.userClone.userName = res.data.data.user.userName;
          // this.userClone.role.roleName = res.data.data.user.role.roleName;
          return;
        });
      } else {
        // 未登录
        window.console.log("未登录");
      }
    },
    // ===============================修改个人资料==========================
    updateUserMsg() {
      // http://192.168.6.184:8080
      var words = `/user/modifyUser`;
      this.axios
        .get(words, {
          params: {
            userId: this.user.userId,
            userName: this.user.userName,
            sex: this.user.sex,
            age: this.user.age,
            joinDate: this.user.joinDate,
            leavingDate: this.user.leavingDate,
            phone: this.user.phone,
            email: this.user.email
          }
        })
        .then(res => {
          window.console.log(res);
          this.ok("修改成功");
          return;
        });
    },
    // ==================修改密码===============================
    // 打开密码
    openPwd() {
      this.pwdDialog = true;
    },
    canselPwd() {
      this.pass.pass = "";
      this.pass.newPass = "";
      this.pass.oldPass = "";
      this.pwdDialog = false;
    },
    // 发送修改密码请求
    sendPwd() {
      // var token = window.sessionStorage.getItem("token");
      // var params = "oldPwd=" + this.pass.oldPass + "&newPwd=" + this.pass.pass;

      // window.console.log(params);
      // 可以拿到 token
      window.console.log(window.sessionStorage.getItem("token"));
      this.axios({
        // http://192.168.6.184:8080
        url: "/user/modifyPassword",
        method: "POST",
        // 415
        // headers: { "content-type": "application/x-www-form-urlencoded" },
        // 400
        // headers: { "content-type": "application/json" },
        // 415
        data: {
          params: {
            oldPwd: this.pass.oldPass,
            newPwd: this.pass.pass
          }
        }
      })
        .then(res => {
          window.console.log(res.data.data);
          this.$message({
            showClose: true,
            message: "修改信息发送成功",
            type: "success"
          });
        })
        .catch(err => {
          window.console.log(err);
        });
      this.pwdDialog = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "pwdForm") {
            window.console.log("发送修改密码");
            this.sendPwd();
          }
          if (formName == "msgForm") {
            window.console.log("发送修改信息");
            this.updateUserMsg();
          }
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      if (formName == "msgForm") {
        window.console.log("恢复设置");
        this.loadUserMsg();
      }
    }
  },
  created() {
    this.loadUserMsg();
  },
  data() {
    return {
      // 是否修改的状态存储 false 为未修改，true为修改
      saveC: false,
      // =======================修改密码===============================
      // 打开密码模态框
      pwdDialog: false,
      // 修改密码两次一致
      pass: {
        oldPass: "",
        pass: "",
        newPass: ""
      },
      // 密码是否一致
      // 输入验证
      passRules: {
        oldPass: [
          { required: true, message: "请输入现在的密码", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9]{6,22}$/,
            message: "请输入新密码，6-22由数字或字母组成的字符",
            trigger: "blur"
          }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      // =======================修改个人信息===============================
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
      msgRules: {
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur"
          },
          { type: "number", message: "年龄必须为数字值" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号码", trigger: "blur" },

          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        role: [
          { required: true, message: "请输入现在的密码", trigger: "blur" }
        ],
        sex: [
          {
            required: true,
            pattern: /^(男|女)$/,
            message: "请输入性别男或女",
            trigger: "blur"
          }
        ],
        systemPropertiesValue: [
          { required: true, message: "请输入现在的密码", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "请输入现在的密码", trigger: "blur" }
        ],
        userPwd: [
          { required: true, message: "请输入现在的密码", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入现在的密码", trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang="less" scoped>
.lu {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(218, 218, 218);
  span:nth-of-type(1) {
    margin-left: 20px;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    padding-top: 1px;
  }
}
.form-left {
  width: 50%;
  float: left;
}
.form-right {
  width: 50%;
  float: right;
}
.pwdBTN {
  height: 50px;
}
.pwdBTN > div {
  float: right;
}
.abc {
  margin-top: 30px;
  float: left;
  width: 800px;
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