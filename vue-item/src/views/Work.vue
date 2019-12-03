<template>
  <div class="work">
    <div class></div>
    <el-table style="width: 100%" stripe border :data="tableData">
      <!-- 
        传回来的值
        circuitry: null
        createDate: "2019-10-27"
        finishDate: "2019-11-22"
        isCancel: 1
        systemPropertiesValue: null
        taskDescribe: null
        taskId: 1
        taskName: "西渭一线任务巡检"
        taskNo: "XJ1911270001"
        taskNote: "任务笔记"
        taskType: 1
        users: null
      -->
      <el-table-column prop="taskNo" label="任务编号" width="150"></el-table-column>
      <el-table-column prop="date" label="代办任务类型" width="180"></el-table-column>
      <el-table-column prop="taskName" label="待办任务名称" width="180"></el-table-column>
      <el-table-column prop="taskNote" label="任务记录" width="180"></el-table-column>
      <el-table-column prop="taskDescribe" label="任务描述" width="180"></el-table-column>
      <el-table-column prop="createDate" label="到达时间" width="110"></el-table-column>
      <el-table-column prop="createDate" label="完成时间" width="110"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="looklook(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="goWorkWeb(scope.$index)" type="text" size="small">处理</el-button>
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
    <el-dialog title="任务详情" :visible.sync="lookTab">
      <!-- circuitry: null -->
      <!-- createDate: "2019-11-30" -->
      <!-- finishDate: null -->
      <!-- isCancel: null -->
      <!-- systemPropertiesValue: null -->
      <!-- taskDescribe: "任务笔记" -->
      <!-- taskId: 4 -->
      <!-- taskName: "川藏一线任务消缺" -->
      <!-- taskNo: "XQ1911270001" -->
      <!-- taskNote: "任务笔记" -->
      <!-- taskType: 2 -->
      <p>
        <span>任务编号：</span>
        {{ workMsg.taskNo }}
      </p>
      <p>
        <span>任务名称：</span>
        {{ workMsg.taskName }}
      </p>
      <p>
        <span>开始时间：</span>
        {{ workMsg.createDate }}
      </p>
      <p>
        <span>结束时间：</span>
        {{ workMsg.finishDate }}
      </p>
      <p>
        <span>是否取消：</span>
        {{ workMsg.isCancel }}
      </p>
      <p>
        <span>任务笔记：</span>
        {{ workMsg.taskDescribe }}
      </p>
      <p>
        <span>任务类型：</span>
        {{ workMsg.taskType }}
      </p>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
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
    goWorkWeb(index) {
      // 获取准确id
      var a = this.currpage - 1;
      var b = a * this.pagesize + index;
      this.a = this.tableData[b].id;
      // 根据 id 跳转页面
    },
    // 弹出详细信息模态框
    looklook(row) {
      // 弹出由 :visible.sync 绑定的模态框
      this.lookTab = true;
      //
      // 获取准确 id
      var id = row.taskId;

      // 请求数据
      var words = `http://192.168.6.177:8080/taskOrchid/getTaskByTaskId?taskId=${id}`;
      this.axios.get(words).then(res => {
        this.workMsg = res.data.data.task;
        switch (this.workMsg.taskType) {
          case 1:
            this.workMsg.taskType = "待分配";
            break;
          case 2:
            this.workMsg.taskType = "已分配";
            break;
          case 3:
            this.workMsg.taskType = "执行中";
            break;
          case 4:
            this.workMsg.taskType = "审核中";
            break;
          case 5:
            this.workMsg.taskType = "已完成";
            break;
          case 6:
            this.workMsg.taskType = "驳回";
            break;
        }
        window.console.log(this.workMsg);
      });
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
    LoadData() {
      // 获取平台数据
      var words = `http://192.168.6.184:8080/taskOrchid/getTaskByUserId?currentPage=${this.currpage}&pageSize=${this.pagesize}`;
      this.axios
        .get(words)
        .then(res => {
          window.console.log("asd");
          this.pages = res.data.data.count;
          this.tableData = res.data.data.tasks;
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  },
  data() {
    return {
      a: 0,
      lookTab: false,
      // 分页数据 一页显示最大数，当前页数
      // 页数大小
      pagesize: 5,
      // 当前页数，初始值为 1
      currpage: 1,
      pages: 0,
      // 渲染表格的数据
      tableData: [],
      workMsg: {}
    };
  },
  // 载入页面时加载数据
  created() {
    this.LoadData();
  }
};
</script>
