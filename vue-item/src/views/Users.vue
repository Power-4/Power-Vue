<template>
  <div class="role">
    <div class="topRole">
      <el-form>
        <el-form-item label="用户名称：">
          <el-input class="inputs" v-model="search" placeholder="请输入用户名称"></el-input>
          <el-select class="select-css" v-model="selValue" placeholder="冻结/未冻结">
            <el-option
              v-for="item in selOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button class="btn-sea">搜索</el-button>
          <el-button class="addusers" @click="addUsers">
            <i class="el-icon-circle-plus-outline"></i>添加用户
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      stripe
      style="width: 100%"
      border
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
    >
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
      <el-table-column prop="userId" label="用户ID" width="130"></el-table-column>
      <el-table-column prop="userName" label="用户账号" width="150"></el-table-column>
      <el-table-column prop="roleName" label="角色" width="100"></el-table-column>
      <el-table-column prop="phone" label="电话" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="isCheck" label="状态" width="180"></el-table-column>
      <el-table-column prop="role" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="joinData" label="入职日期"></el-table-column>
      <el-table-column prop="leavingDate" label="离职日期"></el-table-column>
      <el-table-column label="状态(冻结/未冻结)">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isCheck" @change="achecbox(scope.row)"></el-checkbox>
          <!-- // 添加一个多选框,控制选中与否 -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button class="cli" @click="updata(scope.$index)" type="text" size="small">修改</el-button>
          <el-button @click="del(scope.row, scope.$index, tableData)" type="text" size="small">删除</el-button>
          <el-button @click="seeLog(scope.$index, tableData)" type="text" size="small">日志</el-button>
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
    </el-dialog>

    <el-dialog title="添加用户信息" :visible.sync="addDataTab">
      <!-- 插入类型 -->
      <el-form>
        <el-form-item label="用户信息">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="用户编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label>
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="查看用户日志" :visible.sync="seeLogTab">
      <!-- 插入类型 -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    // 修改用户按钮--------------------------------------------------
    updata() {
      this.updataTab = true;
    },
    // 修改用户信息
    updataUser() {},
    // 查看日志按钮--------------------------------------------------
    seeLog() {
      this.seeLogTab = true;
    },
    // 获取日志
    loadLog() {},
    // 添加用户按钮--------------------------------------------------
    addUsers() {
      this.addDataTab = true;
    },
    // 添加用户
    userAdd() {},
    // 删除用户------------------------------------------------------
    del(obj, index, rows) {
      this.$confirm("是否删除用户", "删除用户", {
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
          window.console.log(obj);
          rows.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    },
    // 启用/禁用选项框------------------------------------------------
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
    // 分页函数------------------------------------------------------
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currpage = val;
    },
    // 加载页面----------------------------------------------------------
    loadData() {
      var words = `http://192.168.6.184:8080/userManage/showAllUsers?pagesize=${this.pagesize}&currpage=${this.currpage}`;
      this.axios.get(words).then(res => {
        this.tableData = res.data.data.usersList;
        this.pages = res.data.data.count;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isCheck = res.data.data.userStates[i];
          this.tableData[i].roleName = this.tableData[i].role.roleName;
        }
        window.console.log(this.tableData);
      });
    }
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      // 修改用户数据模态框---------------------------------------------
      updataTab: false,
      // 添加用户模态框控制----------------------------------------------
      addDataTab: false,
      // 添加的用户名字
      neeUser: {},
      // 查看日志模态框控制----------------------------------------------
      seeLogTab: false,
      // 搜索框内容-----------------------------------------------------
      search: "",
      // 分页数据 一页显示最大数，当前页数-------------------------------
      pagesize: 3,
      currpage: 1,
      pages: 0,
      // select选择框取下的值-------------------------------------------
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
      // 表格渲染数据 --------------------------------------------------
      // 渲染表格的数据
      tableData: []
    };
  }
};
</script>

<style>
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