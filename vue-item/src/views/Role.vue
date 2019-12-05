<template>
  <div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="topRole">
      <el-form>
        <el-form-item label="角色名称：">
          <el-input class="inputs" v-model="search" placeholder="请输入角色名称"></el-input>
          <el-select class="select-css" v-model="searchSelect" placeholder="请选择">
            <el-option v-for="item in selectList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
          <el-button class="btn-sea" type="button" @click="getSearch">搜索</el-button>
          <el-button type="button" @click="LoadData">全部</el-button>
          <el-button class="addusers" type="button" @click="addRole">
            <i class="el-icon-circle-plus-outline"></i>新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table stripe style="width: 100%" :data="tableData">
      <!-- roleId:  -->
      <!-- roleName:  -->
      <!-- roleNo:  -->
      <!-- systemProperties:  -->
      <!-- systemPropertiesValue:  -->
      <!-- updateDate:  -->
      <!-- users:  -->
      <el-table-column prop="roleNo" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="users" label="创建人"></el-table-column>
      <el-table-column prop="updateDate" label="创建时间"></el-table-column>
      <el-table-column label="状态(启用/未启用)">
        <template slot-scope="scope">
          <!-- // 添加一个多选框,控制选中与否 -->
          <el-checkbox v-model="scope.row.isCheck" @change="achecbox(scope.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button class="cli" @click="updata(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
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

    <!-- 修改模态框 -->
    <el-dialog title="修改角色信息" :visible.sync="updataTab">
      <!-- 插入类型 -->
      <el-form>
        <el-form-item label="角色名">
          <el-input v-model="roleData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色编号">
          <el-input v-model="roleData.roleNo"></el-input>
          <!-- roleName -->
          <!-- roleNo -->
          <!-- sysProValueName -->
          <!-- roleId -->
        </el-form-item>
        <div class="box">
          <div>
            <el-button type="button" class="ok" @click="updateRole">确认</el-button>
            <el-button type="button" @click="updataTab = false">取消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>

    <!-- 添加模态框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleTab" class="addbox">
      <!-- 插入类型 -->
      <el-form>
        <el-form-item label="角色名称">
          <!-- @blur="isRoleNameOk" -->
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色编号">
          <el-input v-model="role.roleNo" @blur="isRoleNoOk" minlength="4" maxlength="10"></el-input>
        </el-form-item>
        <el-radio v-model="radio" label="启用">启用</el-radio>
        <el-radio v-model="radio" label="停用">未启用</el-radio>
        <div class="box">
          <div>
            <el-button type="button" class="ok" @click="getRole">确认</el-button>
            <el-button type="button" @click="addRoleTab = false">取消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less">
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
.el-radio__input.is-checked .el-radio__inner {
  border-color: #5ee4e4;
  background-color: #5ee4e4;
}
.ok {
  background-color: #5ee4e4;
}
.box {
  height: 45px;
  margin-top: 20px;
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

<script>
export default {
  methods: {
    // 启用/禁用选项框的修改
    achecbox(index) {
      this.addRoleTab = true;
      this.addRoleTab = false;
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
          // 修改状态, 还要传入修改后的值
          if (index.systemPropertiesValue.sysProValueName == "启用") {
            index.systemPropertiesValue.sysProValueName = "停用";
          } else if (index.systemPropertiesValue.sysProValueName == "停用") {
            index.systemPropertiesValue.sysProValueName = "启用";
          }
          window.console.log(
            "确认改变",
            index.isCheck,
            index.systemPropertiesValue.sysProValueName
          );
          // 添加东西
          this.roleData.roleName = index.roleName;
          this.roleData.roleNo = index.roleNo;
          this.roleData.systemPropertiesValue.sysProValueName =
            index.systemPropertiesValue.sysProValueName;
          this.roleData.roleId = index.roleId;
          window.console.log(this.roleData);
          this.updateRole();
        })
        .catch(() => {
          // if (index.systemPropertiesValue.sysProValueName == "启用") {
          //   index.isCheck = true;
          // } else if (index.systemPropertiesValue.sysProValueName == "未启用") {
          //   index.isCheck = false;
          // }
          this.$message({
            type: "info",
            message: "取消修改"
          });
          index.isCheck = !index.isCheck;
          this.addRoleTab = true;
          this.addRoleTab = false;
          // 取消修改如何进行
          // if (index.isCheck == "1") {
          //   index.isCheck = "2";
          // } else {
          //   index.isCheck = "1";
          // }
          window.console.log("取消后的isCheck", index.isCheck);
        });
    },
    deleteRow(index) {
      // 弹出确认窗口
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          // 输出id
          // http://192.168.6.184:8080
          var c = `/userManage/deleteUserMessage?roleId=${index.roleId}`;
          window.console.log(c);
          this.axios.get(c).then(res => {
            window.console.log(res);
            this.LoadData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 修改角色按钮
    updata(index) {
      // 弹出由 :visible.sync 绑定的模态框
      this.updataTab = true;
      // 此处 index 对象
      window.console.log(index);
      this.roleData.roleName = index.roleName;
      this.roleData.roleNo = index.roleNo;
      this.roleData.systemPropertiesValue.sysProValueName =
        index.systemPropertiesValue.sysProValueName;
      this.roleData.roleId = index.roleId;
    },
    // 分页函数
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currpage = val;
      this.LoadData();
    },
    // 添加角色按钮
    addRole() {
      this.addRoleTab = true;
    },
    // 检查角色编号是否重合
    isRoleNoOk() {
      if (this.role.roleNo == "") return;
      window.console.log("roleNo检测");
      // http://192.168.6.184:8080
      this.axios
        .get(`/role/isExistsRoleNo?roleNo=${this.role.roleNo}`)
        .then(res => {
          window.console.log(res);
          if (res.data.code == "200") {
            window.console.log("角色·编号通过");
            this.roleNoOk = 1;
          }
        });
    },
    // 确认添加角色
    getRole() {
      // 是否符合标准
      if (this.roleNameOk == 1 && this.roleNoOk == 1) {
        window.console.log("开始添加角色");
        window.console.log(window.sessionStorage.getItem("userId"));
        // http://192.168.6.184:8080
        this.axios
          .get(
            `/role/addRole?roleName=${this.role.roleName}&roleNo=${
              this.role.roleNo
            }&sysProValueName=${
              this.radio
            }&userId=${window.sessionStorage.getItem("userId")}`
          )
          .then(res => {
            window.console.log(res);
            this.$message({
              showClose: true,
              message: "添加角色成功",
              type: "success"
            });
            this.LoadData();
            this.addRoleTab = false;
          });
      }
    },
    // 搜索内容
    getSearch() {
      // http://192.168.6.184:8080
      var words = `/role/fuzzyQueryShowRole?pagesize=${this.pagesize}&currpage=${this.currpage}&roleName=${this.search}&sysProValueName=${this.searchSelect}`;
      window.console.log(words);
      this.axios.get(words).then(res => {
        window.console.log("加载角色", res);
        this.pages = res.data.data.count;
        this.pagesize = res.data.data.count;
        this.tableData = res.data.data.roleList;
        for (var i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i].systemPropertiesValue.sysProValueName == "启用"
          ) {
            this.tableData[i].isCheck = true;
            window.console.log(this.tableData[i].isCheck);
          }
          if (
            this.tableData[i].systemPropertiesValue.sysProValueName == "未启用"
          ) {
            this.tableData[i].isCheck = false;
          }
          this.tableData[i].users = res.data.data.roleList[i].users.userName;
        }
      });
    },
    // 加载角色f
    LoadData() {
      // 获取平台数据
      // http://192.168.6.184:8080
      var words = `/role/showAllRole?currentPage=${this.currpage}&pageSize=${this.pagesize}`;
      this.axios
        .get(words)
        .then(res => {
          window.console.log("加载角色", res);
          this.pages = res.data.data.count;
          this.pagesize = 4;
          this.tableData = res.data.data.roleList;
          for (var i = 0; i < this.tableData.length; i++) {
            if (
              this.tableData[i].systemPropertiesValue.sysProValueName == "启用"
            ) {
              this.tableData[i].isCheck = true;
              window.console.log(this.tableData[i].isCheck);
            }
            if (
              this.tableData[i].systemPropertiesValue.sysProValueName ==
              "未启用"
            ) {
              this.tableData[i].isCheck = false;
            }
            this.tableData[i].users = res.data.data.roleList[i].users.userName;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    // 修改角色信息
    updateRole() {
      //
      window.console.log(this.roleData.roleId);
      window.console.log(this.roleData.roleNo);
      window.console.log(this.roleData.roleName);
      window.console.log(this.roleData.systemPropertiesValue.sysProValueName);

      // http://192.168.6.184:8080
      var b = `/role/modifyRoleNoAndRoleName?roleNo=${this.roleData.roleNo}&roleName=${this.roleData.roleName}&sysProValueName=${this.roleData.systemPropertiesValue.sysProValueName}&roleId=${this.roleData.roleId}`;
      window.console.log(b);
      this.axios.get(b).then(res => {
        window.console.log("修改角色", res);
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.LoadData();
      });
      // 关闭窗口 一切结束后写道axios回调函数里面
      this.updataTab = false;
    }
  },
  created() {
    this.LoadData();
  },
  data() {
    return {
      // ============================搜索===========================
      // 搜索内容
      search: "",
      selectList: ["启用", "停用"],
      searchSelect: "启用",
      // 添加角色----------------------------------------------------1
      // 1 为通多，2 为不通过
      roleOk: 2,
      // 用户名是否得体
      roleNameOk: 1,
      // 用户编号是否得体
      roleNoOk: 1,
      radio: "启用",
      role: {
        roleName: "",
        roleNo: "",
        sysProValueName: ""
      },
      // 控制添加模态框弹出
      addRoleTab: false,
      // 修改角色---------------------------------------------------2
      // 控制修改模态框弹出
      updataTab: false,
      // 修改数据时加入的绑定input的数据
      roleData: {
        roleName: "",
        roleNo: "",
        roleId: "",
        systemPropertiesValue: {
          sysProValueName: ""
        }
      },
      // 显示分页------------------------------------------------------4
      // 分页数据 一页显示最大数，当前页数
      pagesize: 4,
      currpage: 1,
      pages: 3,
      // 表格数据渲染----------------------------------------------------6
      // 渲染表格的数据
      tableData: [
        {
          roleId: 2,
          roleName: "二",
          roleNo: "2222",
          isCheck: true,
          systemPropertiesValue: {
            sysProValueName: "启用"
          }
        },
        {
          roleId: 4,
          roleName: "四",
          roleNo: "4444",
          isCheck: false,
          systemPropertiesValue: {
            sysProValueName: "未启用"
          }
        }
      ],
      // 查询需要修改的资料
      newList: []
    };
  }
};
</script>


    // // 确认添加角色
    // isRoleNameOk() {
    //   if (this.role.roleName == "") return;
    //   window.console.log("roleName检测");
    //   this.axios
    //     .get(
    //       `http://192.168.6.184:8080/role/isExistsRoleNo?roleName=${this.role.roleName}`
    //     )
    //     .then(res => {
    //       window.console.log(res);
    //       // if(res.code ='200') {
    //       //   window.console.log('角色·名字通过');
    //       //   this.roleName = 1;
    //       // }
    //     });
    // },
    //
    // 角色编号确认
