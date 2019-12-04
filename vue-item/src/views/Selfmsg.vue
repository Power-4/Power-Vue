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
      <el-button class="butt" @click="openPwd">修改密码</el-button>
    </el-form>

    <el-dialog :visible.sync="pwdDialog" title="修改面膜">
      <!-- 密码模态框 -->
      <el-form :model="pass" :rules="passRules" ref="ruleForm">
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
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    },
    // ==================修改密码===============================
    // 打开密码
    openPwd() {
      this.pwdDialog = true;
    },
    // 发送请求
    sendPwd() {
      var token = window.sessionStorage.getItem("token");
      var params =
        "srcUserPwd=" +
        this.pass.oldPass +
        "&newUserPwd=" +
        this.pass.pass +
        "&token=" +
        token;
      window.console.log(params);
      this.axios({
        url: "http://192.168.6.184:8080/user/modifyPassword",
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: params
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
    // 取消发送
    canselPwd() {
      this.pwdDialog = false;
      this.pass = "";
      this.newPass = "";
      this.oldPass = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          window.console.log("发送修改密码");
          this.sendPwd();
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
      }
    };
  }
};
</script>

<style lang="less" scoped>
.pwdBTN {
  height: 50px;
}
.pwdBTN > div {
  float: right;
}
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