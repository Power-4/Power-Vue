<template>
  <div class="role">
    <div class="topRole">
      <el-form>
        <el-form-item label="角色名称：">
          <el-input class="inputs" v-model="search" placeholder="请输入角色名称"></el-input>
          <el-select class="select-css" v-model="selValue" @change="getPower" placeholder="请选择">
            <el-option
              v-for="item in selOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button class="btn-sea" type="button" @click="getSearch">搜索</el-button>
          <el-button class="addusers" type="button" @click="addRole">
            <i class="el-icon-circle-plus-outline"></i>添加角色
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      stripe
      style="width: 100%"
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
    >
      <el-table-column prop="date" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="address" label="创建人"></el-table-column>
      <el-table-column prop="address" label="创建时间"></el-table-column>
      <el-table-column label="状态(启用/未启用)">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isCheck" @change="achecbox(scope.row)"></el-checkbox>
          <!-- // 添加一个多选框,控制选中与否 -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button class="cli" @click="updata(scope.$index)" type="text" size="small">修改</el-button>

          <el-button @click="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
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

    <!-- 模态框 -->
    <el-dialog title="修改角色信息" :visible.sync="updataTab">
      <!-- 插入类型 -->
    </el-dialog>

    <!-- 模态框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleTab" class="addbox">
      <!-- 插入类型 -->
      <el-form>
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色编号">
          <el-input v-model="role.roleNo"></el-input>
        </el-form-item>
        <el-radio v-model="radio" label="1">启用</el-radio>
        <el-radio v-model="radio" label="2">未启用</el-radio>
        <div class="box">
          <div>
            <el-button type="button" class="ok">确认</el-button>
            <el-button type="button" @click="addRoleTab = false">取消</el-button>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

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
    // 根据角色id roleId加载权限
    getPower(index) {
      // 获取的数据为字符串
      window.console.log(index);
      if (index == "true") {
        this.chose = "2";
      } else {
        this.chose = "3";
      }
      window.console.log(this.chose);
    },
    // 启用/禁用选项框
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
    // index 编号传入 scope.$index
    // rows 需要修改的数组
    deleteRow(index, rows) {
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
          // 执行删除操作
          rows.splice(index, 1);
          // 获取准确 id
          var a = this.currpage - 1;
          var b = a * this.pagesize + index;
          // 输出id
          this.a = this.tableData[b].id;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 修改角色操作
    updata(index) {
      // 弹出由 :visible.sync 绑定的模态框
      this.updataTab = true;
      //
      // 获取准确 id
      var a = this.currpage - 1;
      var b = a * this.pagesize + index;
      // 输出id
      this.a = this.tableData[b].id;
    },
    // 分页函数
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currpage = val;
    },
    addRole() {
      this.addRoleTab = true;
    },
    getSearch() {
      if (this.chose == "1") {
        if (this.search == "") {
          // 没有内容
          window.console.log("没有内容");
        } else {
          // 没选择但是有内容
          window.console.log("没选择但是有内容");
        }
      }
      if (this.chose == "2") {
        if (this.search == "") {
          // 没有内容选 true
          window.console.log("没有内容选 true");
        } else {
          // 选 true 但是有内容
          window.console.log("选 true 但是有内容");
        }
      }
      if (this.chose == "3") {
        if (this.search == "") {
          // 没有内容选 false
          window.console.log("没有内容选 false");
        } else {
          // 选 false 但是有内容
          window.console.log("选 false 但是有内容");
        }
      }
    },
    // 加载角色
    LoadData() {
      // 获取平台数据
      var words = `http://192.168.6.184:8080/role/showAllRole?currentPage=${this.currpage}&pageSize=${this.pagesize}`;
      this.axios
        .get(words)
        .then(res => {
          window.console.log(res);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    updateRole() {}
  },
  created() {
    this.LoadData();
  },
  data() {
    return {
      // 添加角色-----------------------------------
      radio: "1",
      role: {
        roleName: "",
        roleNo: "",
        sysProValueName: ""
      },
      // 控制添加模态框弹出
      addRoleTab: false,
      // --------------------------------------------
      // 控制修改模态框弹出
      updataTab: false,
      // 搜索内容
      search: "",
      chose: "1",
      // 分页数据 一页显示最大数，当前页数
      pagesize: 3,
      currpage: 1,
      pages: 3,
      // select选择框取下的值
      selValue: "",
      // 复选框选择
      selOptions: [
        {
          value: "true",
          label: "启用"
        },
        {
          value: "false",
          label: "未启用"
        }
      ],
      // 渲染表格的数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: false
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isCheck: true
        }
      ],
      newList: []
    };
  }
};
</script>
