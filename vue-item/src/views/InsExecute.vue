<template>
  <div class="insexecute">
    <div class="search-box">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <el-input placeholder="请输入内容" v-model="taskNo" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
            <el-input placeholder="请输入内容" v-model="circuitryNo" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>任务状态：</label>
            <el-select v-model="taskState" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.sysProValueName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>下发人：</label>
            <el-input placeholder="请输入内容" v-model="userName" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <el-date-picker v-model="createDate" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-button type="primary" class="bg-color" @click="taskQuery">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="taskNo" label="任务编号" align="center">
         <template slot-scope="scope">
          <el-popover>
            <p>ID: {{ scope.row.taskId}}</p>
            <div slot="reference">
              {{ scope.row.taskNo }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
      <el-table-column prop="circuitry.circuitryName" label="巡检线路" align="center"></el-table-column>
      <el-table-column prop="taskPoleRelation.startPoleNo" label="起始杆号" align="center"></el-table-column>
      <el-table-column prop="taskPoleRelation.endPoleNo" label="终止杆号" align="center"></el-table-column>
      <el-table-column prop="users.userName" label="下发人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="下发时间" align="center"></el-table-column>
      <el-table-column prop="systemPropertiesValue.sysProValueName" label="任务状态" align="center"></el-table-column>
      <el-table-column prop="finishDate" label="任务完成时间" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" width="200px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="view(scope.$index,scope.row)">查看</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '执行中'? !edit : edit" @click="add(scope.$index,scope.row)">回执录入</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '已分配'? !edit : edit" @click="execute(scope.row)">执行</el-button>
          <el-button type="text" size="small" @click="modifys(scope.$index,scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="count"
        @current-change="handleCurrentChange"
        :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      count: null,
      pageSize: 5,
      currentPage: 1,
      taskNo: "",
      circuitryNo: "",
      userName: "",
      createDate: "",
      taskState: "",
      options: [],
      edit: true,
      isQuery: false
    };
  },
  created() {
    window.console.log(this.isAdd);
    // 渲染页面数据
    this.axios.get('/getAllTaskByUserId?', {
      params: {
        currentPage: this.currentPage, 
        pageSize: this.pageSize
      }
    })
    .then((res) => {
      this.tableData = res.data.data.tasks;
      this.count = res.data.data.count;
      window.console.log(res.data);
    })
    .catch((err) => {
      window.console.log('错误是', err);
    })


    // 请求任务状态值
    this.axios.get('/selectAllFixState?')
    .then((res) => {
      this.options = res.data.data.fixState;
      window.console.log(res.data);
    })
    .catch((err) => {
      window.console.log('错误是', err);
    })

    
  },
  computed: {
    ...mapState([
      'isAdd'
    ]),
  },
  
  methods: {
    // 初始化
    init() {
      this.axios.get('/getAllTaskByUserId?', {
        params: {
          currentPage: this.currentPage, 
          pageSize: this.pageSize
        }
      })
      .then((res) => {
        this.tableData = res.data.data.tasks;
        this.count = res.data.data.count;
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log('错误是', err);
      })

    },

    // 查询
    taskQuery() {
      this.isQuery = true;
      // 请求列表数据
      this.axios.get('/getAllTaskByConditionL?',{ params:{
        taskNo: this.taskNo,
        circuitryNo: this.circuitryNo,
        taskState: this.taskState,
        userName: this.userName,
        startDate: this.createDate==''?'1970/01/01':this.createDate,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }})
      .then((res) => {
        this.tableData = res.data.data.tasks;
        this.count = res.data.data.count;
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })

    },
    //回执录入
    add(index, row) {
      this.$store.state.isAdd = true;
      var taskId = row.taskId;
      this.$router.push({
        path: "/inspect/executeenter",
        query: { taskId }
      });
    },
    view(index, row) {
      var taskId = row.taskId;
      this.$router.push({
        path: "/inspect/enactview",
        query: { taskId }
      });
    },
    // 执行
    execute(row) {
      window.console.log(row.taskId)
      this.$confirm("你确定执行此任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.axios.get('/changeTaskSateToRunning?',{params:{taskId: row.taskId}})
        .then((res) => {
          this.init();
          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
      })
      .catch(() => {});
    },
    modifys(index, row) {
      this.$store.state.isAdd = false;
      var taskId = row.taskId;
      this.$router.push({
        path: "/inspect/executeenter",
        query: { taskId }
      });
    },
    // 分页点击事件
    handleCurrentChange(val) {
      window.console.log(this.isQuery)
      if(this.isQuery) {
        this.axios.get('/getAllTaskByCondition?',{params:{
          taskNo: this.taskNo,
          circuitryNo: this.circuitryNo,
          taskState: this.taskState,
          userName: this.userName,
          startDate: this.startDate,
          currentPage: val,
          pageSize: this.pageSize
        }})
        .then((res) => {
          this.tableData = res.data.data.tasks;
          this.count = res.data.data.count;
          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
      } else {

        this.axios.get('/getAllTaskByUserId?', {
          params: {
            currentPage: val, 
            pageSize: this.pageSize
          }
        })
        .then((res) => {
          this.tableData = res.data.data.tasks;
          this.count = res.data.data.count;
          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log('错误是', err);
        })
      }
    },
  }
};
</script>

<style lang="less" scoped>
.insexecute {
  width: 100%;

  .search-box {
    margin: 20px 0;

    .el-row {
      margin: 10px 0;

      .bg-add {
        text-align: right;
      }

      .bg-color {
        background-color: #5ee4e4;
        border-color: #5ee4e4;
      }

      label {
        display: inline-block;
        width: 80px;
      }

      .el-input {
        width: 180px;
      }

      .el-select {
        width: 150px;
      }
    }
  }

  .el-table {
    margin: 0 auto;

    .el-button:hover {
      cursor: pointer;
    }
  }

  .pagination {
    margin: 10px 0 0;
    text-align: right;
  }
}
</style>