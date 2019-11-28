<template>
  <div class="insenact">
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
            <el-input placeholder="请输入内容" v-model="circuitryId" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>任务状态：</label>
            <el-select v-model="taskState" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
            <el-input placeholder="请输入内容" v-model="userId" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <el-date-picker v-model="createDate" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-button type="primary">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple bg-add">
            <el-button type="primary" @click="addInspectTask">
              <i class="el-icon-circle-plus-outline"></i> 制定巡检任务
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 分配任务模态框 -->
    <el-dialog title="分配巡检任务" :visible.sync="dialogVisible" width="42%">
      <template class="allot">
        <el-transfer v-model="value" :data="data"></el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="inspectData" stripe style="width: 100%">
      <el-table-column prop="taskNo" label="任务编号" align="center"></el-table-column>
      <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
      <el-table-column prop="circuitryName" label="巡检线路" align="center"></el-table-column>
      <el-table-column prop="startPoleId" label="起始杆号" align="center"></el-table-column>
      <el-table-column prop="endPoleId" label="终止杆号" align="center"></el-table-column>
      <el-table-column prop="userName" label="下发人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="下发时间" align="center"></el-table-column>
      <el-table-column prop="taskState" label="任务状态" align="center"></el-table-column>
      <el-table-column prop="finishDate" label="任务完成时间" align="center"></el-table-column>
      <el-table-column prop="isCancel" label="任务是否取消" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" width="200px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewInspectTask">查看</el-button>
          <el-button type="text" size="small" @click="dialogVisible = true">分配任务</el-button>
          <el-button type="text" size="small" @click="modifyInspectTask(scope.$index, scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" :page-size="5"></el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
      const generateData = function() {
        const data = [];
        for (let i = 1; i <= 9; i++) {
          data.push({
            key: i,
            label: `巡检员测试用户 ${ i }`,
            disabled: i % 3 === 0
          });
        }
        return data;
      };
    return {
      inspectData: [
        {
          taskNo: "002",
          taskName: "一线巡检",
          circuitryName: "一线",
          startPoleId: "xs1",
          endPoleId: "xs05",
          userName: "测试1",
          createDate: "2013/02/02",
          taskState: "完成",
          finishDate: "2013/02/10",
          isCancel: "否"
        },
        {
          taskNo: "001",
          taskName: "一线巡检",
          circuitryName: "一线",
          startPoleId: "xs1",
          endPoleId: "xs05",
          userName: "测试1",
          createDate: "2013/02/02",
          taskState: "完成",
          finishDate: "2013/02/10",
          isCancel: "否"
        },
        {
          taskNo: "001",
          taskName: "一线巡检",
          circuitryName: "一线",
          startPoleId: "xs1",
          endPoleId: "xs05",
          userName: "测试1",
          createDate: "2013/02/02",
          taskState: "完成",
          finishDate: "2013/02/10",
          isCancel: "否"
        },
        {
          taskNo: "001",
          taskName: "一线巡检",
          circuitryName: "一线",
          startPoleId: "xs1",
          endPoleId: "xs05",
          userName: "测试1",
          createDate: "2013/02/02",
          taskState: "完成",
          finishDate: "2013/02/10",
          isCancel: "否"
        },
        {
          taskNo: "001",
          taskName: "一线巡检",
          circuitryName: "一线",
          startPoleId: "xs1",
          endPoleId: "xs05",
          userName: "测试1",
          createDate: "2013/02/02",
          taskState: "完成",
          finishDate: "2013/02/10",
          isCancel: "否"
        }
        
      ],
      total: 10,
      pagesize: 5,
      currentPage: 1,
      value1: '',
      taskNo: '',
      circuitryId: '',
      userId: '',
      createDate: '',
      taskState: '',
      options: [
        {
          value: '选项1',
          label: '待分配'
        }, {
          value: '选项2',
          label: '已分配'
        }, {
          value: '选项3',
          label: '执行中'
        }, {
          value: '选项4',
          label: '已完成'
        }
      ],
      dialogVisible: false,
      data: generateData(),
      value: [1, 4]

    };
  },
  created() {
    // let taskNo = this.$route.params.taskNo;
  },
  methods: {
    //制定巡检任务
    addInspectTask() {
      this.$router.push("/inspect/enactadd");
    },
    // 查看巡检任务
    viewInspectTask() {
      this.$router.push("/inspect/enactview");
    },
    modifyInspectTask(index, row) {
      var rows = row;
      this.$router.push({
        path: "/inspect/enactadd",
        query: rows
      });
    },
    open() {


    },
    //删除弹出框
    del(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.inspectData.splice(index,1);
          window.console.log(row);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.insenact {
  width: 100%;

  .search-box {
    margin: 20px 0;

    .el-row {
      margin-top: 10px;

      .bg-add {
        text-align: right;
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