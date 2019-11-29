<template>
  <div class="work">
    <div class></div>
    <el-table
      style="width: 100%"
      stripe
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
    >
      <el-table-column prop="date" label="代办任务类型" width="180"></el-table-column>
      <el-table-column prop="name" label="待办任务名称" width="180"></el-table-column>
      <el-table-column prop="address" label="到达时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="looklook(scope.$index)" type="text" size="small">查看</el-button>
          <el-button @click="goWorkWeb(scope.$index, tableData)" type="text" size="small">处理</el-button>
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
    <el-dialog title="任务详情" :visible.sync="lookTab">
      <!-- 插入类型 -->
    </el-dialog>
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.pages {
  float: right;
}
</style>

<script>
export default {
  methods: {
    // index 编号传入 scope.$index
    // rows 需要修改的数组
    goWorkWeb(index, rows) {
      // 删除 测试是否能使用
      rows.splice(index, 1);
      // 获取准确id
      var a = this.currpage - 1;
      var b = a * this.pagesize + index;
      this.a = this.tableData[b].id;
      // 根据 id 跳转页面
    },
    // 弹出详细信息模态框
    looklook(index) {
      // 弹出由 :visible.sync 绑定的模态框
      this.lookTab = true;
      //
      // 获取准确 id
      var a = this.currpage - 1;
      var b = a * this.pagesize + index;
      // 输出id
      this.a = this.tableData[b].id;

      // 请求数据

      // 覆盖信息框内数据
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
      a: 0,
      lookTab: false,
      // 分页数据 一页显示最大数，当前页数
      pagesize: 5,
      currpage: 1,
      // 渲染表格的数据
      tableData: [
        {
          id: 3,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 6,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 9,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 10,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 11,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 15,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 20,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 30,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 40,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  }
};
</script>
