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

          <el-button class="addusers">
            <i class="el-icon-circle-plus-outline"></i>添加用户
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      stripe
      style="width: 100%"
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
    >
      <el-table-column prop="date" label="用户账号" width="150"></el-table-column>
      <el-table-column prop="name" label="用户名称" width="150"></el-table-column>
      <el-table-column prop="address" label="角色"></el-table-column>
      <el-table-column prop="address" label="邮箱"></el-table-column>
      <el-table-column prop="address" label="最后登录时间"></el-table-column>
      <el-table-column label="状态(冻结/未冻结)">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isCheck"></el-checkbox>
          <!-- // 添加一个多选框,控制选中与否 -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button class="cli" @click="looklook(scope.$index)" type="text" size="small">查看</el-button>

          <el-button @click="deleteRow(scope.$index, tableData)" type="text" size="small">处理</el-button>
          <el-button @click="deleteRow(scope.$index, tableData)" type="text" size="small">日志</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        class="pages"
      ></el-pagination>
    </div>
  </div>
</template>

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

<script>
export default {
  methods: {
    // index 编号传入 scope.$index
    // rows 需要修改的数组
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    looklook(index) {
      this.a = index++;
    },
    // 分页函数
    // 每页几条
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currpage = val;
    }
  },
  data() {
    return {
      search: "",
      // 分页数据 一页显示最大数，当前页数
      pagesize: 3,
      currpage: 1,
      // select选择框取下的值
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
      ]
    };
  }
};
</script>
