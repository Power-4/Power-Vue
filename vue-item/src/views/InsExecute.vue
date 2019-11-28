<template>
  <div class="insexecute">
    <div class="search-box">
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
              <el-input
                placeholder="请输入内容"
                v-model="taskNo"
                clearable>
              </el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
              <el-input
                placeholder="请输入内容"
                v-model="circuitryId"
                clearable>
              </el-input>
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
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>下发人：</label>
              <el-input
                placeholder="请输入内容"
                v-model="userId"
                clearable>
              </el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <el-date-picker
              v-model="createDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-button type="primary">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">       
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="taskId"
        label="任务编号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="inspectLine"
        label="巡检线路"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="startNumber"
        label="起始杆号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="endNumber"
        label="终止杆号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="issuePerson"
        label="下发人"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="issueDate"
        label="下发时间"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="taskState"
        label="任务状态"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="finishDate"
        label="任务完成时间"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="200px"
        fixed="right"
        align= "center">
        <template>
          <el-button type="text" size="small" @click="view">查看</el-button>
          <el-button type="text" size="small" @click="add">执行录入</el-button>
          <el-button type="text" size="small" @click="execute">执行</el-button>
          <el-button type="text" size="small" @click="modifys">修改</el-button>
        </template>

      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="5">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          taskId: '001',
          taskName: '一线巡检',
          inspectLine: '一线',
          startNumber: 'xs1',
          endNumber: 'xs05',
          issuePerson: '测试1',
          issueDate: '2013/02/02',
          taskState: '完成',
          finishDate: '2013/02/10'
        },
        {
          taskId: '001',
          taskName: '一线巡检',
          inspectLine: '一线',
          startNumber: 'xs1',
          endNumber: 'xs05',
          issuePerson: '测试1',
          issueDate: '2013/02/02',
          taskState: '完成',
          finishDate: '2013/02/10'
        },
        {
          taskId: '001',
          taskName: '一线巡检',
          inspectLine: '一线',
          startNumber: 'xs1',
          endNumber: 'xs05',
          issuePerson: '测试1',
          issueDate: '2013/02/02',
          taskState: '完成',
          finishDate: '2013/02/10'
        }
      ],
      total: 10,
      pagesize:5,
      currentPage:1,
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
      ]
    }
  },
  methods: {
    //执行录入
    add() {
      this.$router.push("/inspect/executeenter");
    },
    view() {
      this.$router.push("/inspect/enactview");
    },
    execute() {
      this.$confirm('你确定执行此任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
        
        });

    },
    modifys() {
      this.$router.push("/inspect/executeenter");
    }

  }
  
}
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