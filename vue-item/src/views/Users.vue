<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-button @click="seeLog" type="text" size="small" class="log">用户日志</el-button>
    </el-breadcrumb>
    <div class="topRole">
      <el-form>
        <el-form-item label="用户名称：">
          <el-input class="inputs" v-model="search" placeholder="请输入用户名称"></el-input>
          <el-select class="select-css" v-model="searchSelect">
            <el-option v-for="item in selects" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-button class="btn-sea" @click="sendSearch">搜索</el-button>
          <el-button @click="loadData">全部</el-button>
          <el-button class="addusers" @click="openAddUserBTN">
            <i class="el-icon-circle-plus-outline"></i>新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table stripe style="width: 100%" border :data="tableData">
      <!-- age: null -->
      <!-- email: "Orchid_phy@outlook.com" -->
      <!-- isCheck: "启用" -->
      <!-- joinDate: null -->
      <!-- leavingDate: null -->
      <!-- phone: null -->
      <!-- role: Object -->
      <!-- sex: null -->
      <!-- systemPropertiesValue: null -->
      <!-- userId: 10000001 -->
      <!-- userName: "Orchid" -->
      <!-- userPwd: null -->
      <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>
      <el-table-column prop="userName" label="用户账号" width="110"></el-table-column>
      <el-table-column prop="roleName" label="用户角色" width="100"></el-table-column>
      <el-table-column prop="lastLoginTime" label="最后登录时间" width="180"></el-table-column>
      <el-table-column prop="phone" label="电话" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="isCheck" label="状态" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="joinDate" label="入职日期"></el-table-column>
      <el-table-column prop="leavingDate" label="离职日期"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button class="cli" @click="updata(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="pages"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        class="pages"
      ></el-pagination>
    </div>

    <el-dialog title="修改用户信息" :visible.sync="updataTab">
      <!-- 插入类型 -->
      <el-form class="form-box" label-position="labelPosition" label-width="120px">
        <el-form-item label="用户编号">
          <el-input class="inpu" v-model="obj.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input class="inpu" v-model="obj.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleName">
          <el-select v-model="obj.roleName" placeholder="请选择角色">
            <el-option
              v-for="item in powerSelect"
              :label="item"
              :key="item"
              :value="item"
              style="width: 100%;"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加入日期">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="obj.joinDate"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="离职日期">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="obj.leavingDate"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <div class="box">
          <div>
            <el-button class="coloraaa" @click="sendUpdata">确认</el-button>
            <el-button @click="updataTab = false">取消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="查看用户日志" :visible.sync="seeLogTab" width="800px">
      <span>选择时间</span>

      <el-date-picker
        v-model="logData"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
      ></el-date-picker>
      <el-button @click="sendLogData">查询</el-button>
      <el-button @click="sendGetlogMsg">全部</el-button>
      <div class="blockbox"></div>
      <el-table stripe style="width: 100%" border :data="logTableData">
        <!-- // userLogId: 1;
      // userLogOperationDate: "2019-11-29";
        // userLogOperationInformation;-->
        <el-table-column prop="userLogId" label="编号"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="userLogOperationDate" label="时间"></el-table-column>
        <el-table-column prop="userLogOperationInformation" label="日志信息" width="400px"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="logPages"
          @size-change="logHandleSizeChange"
          @current-change="logHandleCurrentChange"
          :page-size="logPagesize"
          class="pages"
        ></el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="添加用户" :visible.sync="addUserDialog">
      <el-form
        :model="userSubForm"
        ref="ruleForm"
        :rules="addUserRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户编号" prop="userNo">
          <el-input v-model="userSubForm.userNo"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="userSubForm.userName" @change="isUser"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="userPwd">
          <el-input v-model="userSubForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleName">
          <el-select v-model="userSubForm.roleName" placeholder="请选择角色">
            <el-option
              v-for="item in powerSelect"
              :label="item"
              :key="item"
              :value="item"
              style="width: 100%;"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加入时间" prop="joinDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="userSubForm.joinDate"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="addUserDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    // 修改用户按钮--------------------------------------------------
    updata(index) {
      this.updataTab = true;
      // 加载角色
      this.getPowerSelect();
      this.obj.age = index.age;
      this.obj.email = index.email;
      this.obj.isCheck = index.isCheck;
      this.obj.joinDate = index.joinDate;
      this.obj.leavingDate = index.leavingDate;
      this.obj.phone = index.phone;
      this.obj.roleName = index.roleName;
      this.obj.sex = index.sex;
      this.obj.systemPropertiesValue = index.systemPropertiesValue;
      this.obj.userId = index.userId;
      this.obj.userName = index.userName;
      this.obj.userPwd = index.userPwd;
      window.console.log(this.obj);
      // age: null -->
      // email: "Orchid_phy@outlook.com" -->
      // isCheck: "启用" -->
      // joinDate: null -->
      // leavingDate: null -->
      // phone: null -->
      // role: Object -->
      // sex: null -->
      // systemPropertiesValue: null -->
      // userId: 10000001 -->
      // userName: "Orchid" -->
      // userPwd: null -->
    },
    sendUpdata() {
      // http://192.168.6.184:8080
      var words = `/userManage/modifyUserMessage?userId=${this.obj.userId}&userName=${this.obj.userName}&roleName=${this.obj.roleName}&joinDate=${this.obj.joinDate}&leavingDate=${this.obj.leavingDate}&sysProValueName=正常`;
      window.console.log(words);
      this.axios.get(words).then(res => {
        window.console.log(res.data.code);
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.isSearchft();
        } else {
          this.$message({
            type: "info",
            message: "修改失败"
          });
        }
      });
      this.updataTab = false;
    },
    // 修改用户信息关闭
    updataUser() {
      this.updataTab = false;
    },
    // 获取日志
    loadLog() {},
    // 添加用户按钮--------------------------------------------------
    // 获取角色类型select数据的函数
    getPowerSelect() {
      // http://192.168.6.184:8080
      var words = `/permission/getAllRoleName`;
      this.axios.get(words).then(res => {
        window.console.log(res);
        this.powerSelect = res.data.data.roleNames;
      });
    },
    // 点击按钮弹出添加角色函数
    openAddUserBTN() {
      this.addUserDialog = true;
      window.console.log("ok");
      // 加载角色类型 select
      this.getPowerSelect();
    },
    // 发送添加用户请求
    sendAddUser() {
      window.console.log("添加用户");
      // http://192.168.6.184:8080
      var words = `/userManage/addUserMessage?userName=${this.userSubForm.userName}&userPwd=${this.userSubForm.userPwd}&roleName=${this.userSubForm.roleName}&joinDate=${this.userSubForm.joinDate}&leacingDate=${this.userSubForm.leavingDate}&sysProValueName=正常`;
      window.console.log(words);
      this.axios.get(words).then(res => {
        window.console.log(res);
        this.$message({
          type: "success",
          message: "添加用户成功"
        });
        this.isSearchft();
      });
    },
    // 用户查重
    isUser() {
      var words = `/userManage/selectUserNameExists?userName=${this.userSubForm.roleName}`;
      this.axios.get(words).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "名称可以使用"
          });
        } else {
          this.$message({
            type: "info",
            message: "用户名已存在"
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.sendAddUser();
          // 关闭模态框
          this.addUserDialog = false;
        } else {
          this.$message({
            type: "info",
            message: "请输入正确的值"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除用户------------------------------------------------------1
    del(obj) {
      this.$confirm("是否删除用户", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          // 通过传入 scope.row 获取 选取的对象，获得id
          window.console.log(obj);
          // http://192.168.6.184:8080
          var words = `/userManage/deleteUserMessage?userId=${obj.userId}`;
          this.axios.get(words).then(res => {
            window.console.log(res);
            this.isSearchft();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 启用/禁用选项框------------------------------------------------2
    achecbox(index) {
      var words = "此操作将禁用该角色, 是否继续?";
      if (index.isCheck) words = "此操作将启用该角色, 是否继续?";
      this.$confirm(words, "启用/禁用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          // 通过传入 scope.row 获取 选取的对象，获得id
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
          window.console.log(index.name);
          // 传入的值是已经修改过的
          index.isCheck = !index.isCheck;
        });
    },
    // 分页函数----------------------------------------------------------3
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currpage = val;
      window.console.log(this.currpage);
      this.isSearchft();
    },
    // 判断登录与否
    isSearchft() {
      if (this.isSearch == true) {
        this.sendSearch();
      } else if (this.isSearch == false) {
        this.loadData();
      }
    },
    // 加载页面----------------------------------------------------------4
    loadData() {
      this.isSearch = false;
      // http://192.168.6.184:8080
      var words = `/userManage/showAllUsers?pageSize=${this.pagesize}&currentPage=${this.currpage}`;
      // http://192.168.6.184:8080/userManage/showAllUsers?pageSize=2&currentPage=1
      window.console.log(words);
      this.axios.get(words).then(res => {
        this.tableData = res.data.data.usersList;
        this.pages = res.data.data.count;
        this.pagesize = 5;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isCheck = res.data.data.userStates[i];
          this.tableData[i].roleName = this.tableData[i].role.roleName;
          this.tableData[i].lastLoginTime = res.data.data.lastLoginTimes[i];
        }
        window.console.log("获取的数据", this.tableData);
      });
    },
    // ===========================搜索部分===============================
    sendSearch() {
      this.isSearch = true;
      // http://192.168.6.184:8080
      var words = `/userManage/selectAllUsersByUserNameAndSysProValueName?pageSize=${this.pagesize}&userName=${this.search}&sysProValueName=${this.searchSelect}&currentPage=${this.currpage}`;
      window.console.log("搜索用户传的数据", words);
      this.axios.get(words).then(res => {
        window.console.log("搜索结果", res.data.data);
        this.tableData = res.data.data.usersList;
        this.pages = res.data.data.count;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isCheck = res.data.data.userStates[i];
          this.tableData[i].roleName = this.tableData[i].role.roleName;
          this.tableData[i].lastLoginTime = res.data.data.lastLoginTimes[i];
        }
        window.console.log(this.tableData);
        window.console.log(res);
      });
    },
    // 添加用户----------------------------------------------------------
    // 每页几条
    // ========================查看日志============================
    logHandleSizeChange(val) {
      this.logPagesize = val;
    },
    // 如何使用
    isLogSearchft() {
      if (this.isLogSearch == true) {
        this.sendLogData();
      } else if (this.isLogSearch == false) {
        this.sendGetlogMsg();
      }
    },
    // 当前页数
    logHandleCurrentChange(val) {
      this.logCurrpage = val;
      // 换页加载
      this.isLogSearchft();
    },
    seeLog() {
      this.seeLogTab = true;
      // 请求日志信息
      this.sendGetlogMsg();
    },
    sendGetlogMsg() {
      // http://192.168.6.184:8080
      this.isLogSearch = false;
      var words = `/userManage/showUserLog?pageSize=${this.logPagesize}&currentPage=${this.logCurrpage}`;
      window.console.log(words);
      this.axios.get(words).then(res => {
        window.console.log(res);
        this.maliLogData(res);
      });
    },
    // 发送请求
    sendLogData() {
      if (this.logData == "") {
        window.console.log("日期为空");
        return;
      }
      this.isLogSearch = true;
      window.console.log(this.logData);
      var startDate = this.logData[0];
      var endtDate = this.logData[1];
      window.console.log(startDate, endtDate);
      // http://192.168.6.184:8080
      var words = `/userManage/showUserLogBySelectDate?pageSize=${this.logPagesize}&currentPage=${this.logCurrpage}&startTime=${startDate}&endTime=${endtDate}`;
      window.console.log(words);
      this.axios.get(words).then(res => {
        window.console.log(res);
        // 渲染信息
        this.maliLogData(res);
      });
    },
    // 处理用户信息
    maliLogData(res) {
      this.logTableData = res.data.data.userLogList;
      this.logPages = res.data.data.count;
      for (var i = 0; i < res.data.data.userLogList.length; i++) {
        this.logTableData[i].userName =
          res.data.data.userLogList[i].user.userName;
      }
    }
  },
  created() {
    this.loadData();
  },
  watch: {
    addUserDialog() {
      if (this.addUserDialog == false) {
        this.userSubForm.userNo = "";
        this.userSubForm.userName = "";
        this.userSubForm.userPwd = "";
        this.userSubForm.roleName = "";
        this.userSubForm.joinDate = "";
        window.console.log(this.userSubForm);
      }
    },
    isSearch() {
      if (this.isSearch == true) {
        this.currpage = 1;
      }
    },
    isLogSearch() {
      if (this.isLogSearch == true) {
        this.logCurrpage = 1;
      }
    }
  },
  data() {
    return {
      isSearch: false,
      isLogSearch: false,
      // --------------------------------------------------------------
      // 日志的分页信息
      logCurrpage: 1,
      logPagesize: 6,
      logPages: 4,
      logData: "",
      // 日志信息
      // 序号
      // 用户名
      // 操作信息
      // 操作时间
      logTableData: [],
      logdiolog: false,
      // 修改用户数据模态框----------------------------------------------1
      updataTab: false,
      obj: {
        // userId
        // userName
        // userPwd
        // roleName
        // joinDate
        // leavingDate
        // sysProValueName
        age: "",
        email: "",
        isCheck: "",
        joinDate: "",
        leavingDate: "",
        phone: "",
        roleName: "",
        sex: "",
        systemPropertiesValue: "",
        userId: "",
        userName: "",
        userPwd: ""
      },
      // 添加用户模态框控制----------------------------------------------2
      // 新增角色---------------------------------------------------
      // 提交表单
      userSubForm: {
        userNo: "",
        roleName: "",
        userName: "",
        joinDate: "",
        userPwd: "",
        leavingDate: ""
      },
      // 正则
      addUserRules: {
        userNo: [
          { required: true, message: "请输入用户编号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 18, message: "长度在 2 到 18 个字符", trigger: "blur" }
        ],
        roleName: [
          { required: true, message: "角色类型不能为空", trigger: "blur" }
        ],
        joinDate: [
          { required: true, message: "加入日期不能为空", trigger: "blur" }
        ],
        userPwd: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9]{6,22}$/,
            message: "请输入新密码，6-22由数字或字母组成的字符",
            trigger: "blur"
          }
        ]
      },
      // 角色类型select数据
      powerSelect: ["地主", "师爷", "家丁", "长工", "短工", "佃户"],
      // 模态框开启
      addUserDialog: false,
      // 添加的用户名字
      neeUser: {},
      // 查看日志模态框控制----------------------------------------------3
      seeLogTab: false,
      // 分页数据 一页显示最大数，当前页数-------------------------------5
      pagesize: 5,
      currpage: 1,
      pages: 0,
      // select选择框取下的值-------------------------------------------6
      selValue: "",
      selOptions: [
        {
          value: "false",
          label: "冻结"
        },
        {
          value: "true",
          label: "未冻结"
        }
      ],
      // 表格渲染数据 --------------------------------------------------7
      // 渲染表格的数据
      tableData: [],
      // ============================ 搜索 ===============================
      selects: ["正常", "冻结"],
      searchSelect: "正常",
      search: ""
    };
  }
};
</script>
<style lang="less" scoped>
.log {
  font-size: 16px;
}
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
</style>
<style>
.blockbox {
  height: 20px;
}
.form-box {
  widows: 800px;
  margin: 0 auto;
}

.coloraaa {
  background-color: #5ee4e4;
}
.box {
  margin-top: 20px;
  height: 50px;
}
.box > div {
  float: right;
}
.addusers {
  float: right;
  margin-right: 20px;
}
.select-css {
  margin: 0 25px;
}
.cell {
  height: 45px;
  text-align: center;
}
.el-checkbox__inner {
  background-color: #e1e1e1;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #5ee4e4;
  border-color: #5ee4e4;
}
/* 没用上的分隔显示 */
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
/* 分页位置 */
.pages {
  float: right;
}
.topRole {
  margin: 0 auto;
  margin-top: 20px;
  width: 800px;
}
/*  */
.inputs {
  width: 180px;
  float: left;
}
.btn-sea {
  background-color: #5ee4e4;
}
.selec {
  margin: 0 20px;
}
</style>