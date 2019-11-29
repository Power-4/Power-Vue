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
                :key="item.id"
                :label="item.label"
                :value="item.label"
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
            <el-button type="primary" class="bg-color">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple bg-add">
            <el-button type="primary" class="bg-color"  @click="addInspectTask(adddialogVisible = true) ">
              <i class="el-icon-circle-plus-outline" ></i> 制定巡检任务
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 制定任务模态框 -->
    <el-dialog title="制定巡检任务" :visible.sync="adddialogVisible" width="48%">
      <el-form ref="form" id="add-form" :model="addform" label-width="80px">
        <el-form-item label="任务编码">
          <el-input v-model="addform.taskNo"></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="addform.taskName"></el-input>
        </el-form-item>
        <el-form-item label="巡检线路">
          <el-select v-model="addform.circuitryName" clearable placeholder="请选择">
            <el-option
              v-for="item in addform.nameOptions"
              :key="item.id"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检员">
          <el-input type="textarea" v-model="addform.inspectPerson"></el-input>
        </el-form-item>
        <el-form-item label="起始杆号">
            <el-select v-model="addform.startPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in addform.PoleNos"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="终止杆号">
            <el-select v-model="addform.endPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in addform.PoleNos"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="下发人">
          <el-input v-model="addform.userName" :disabled="edit"></el-input> 
        </el-form-item>
        <el-form-item label="下发日期">
          <el-input v-model="addform.createDate" :disabled="edit"></el-input> 
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addform.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clear(adddialogVisible = false)">取 消</el-button>
        <el-button type="primary" @click="clear">重置</el-button>
        <el-button type="primary" @click="addSubmit(adddialogVisible = false)">确 定</el-button>
      </span>
    </el-dialog>


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

    <!-- 修改任务模态框 -->
    <el-dialog title="修改巡检任务" :visible.sync="modifydialogVisible" width="48%">
      <el-form ref="form" id="modify-form" :model="modifyform" label-width="80px">
        <el-form-item label="任务编码">
          <el-input v-model="modifyform.taskNo"></el-input>
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="modifyform.taskName"></el-input>
        </el-form-item>
        <el-form-item label="巡检线路">
          <el-select v-model="modifyform.circuitryName" clearable placeholder="请选择">
            <el-option
              v-for="item in modifyform.nameOptions"
              :key="item.id"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检员">
          <el-input type="textarea" v-model="modifyform.inspectPerson"></el-input>
        </el-form-item>
        <el-form-item label="起始杆号">
            <el-select v-model="modifyform.startPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in modifyform.PoleNos"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="终止杆号">
            <el-select v-model="modifyform.endPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in modifyform.PoleNos"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="下发人">
          <el-input v-model="modifyform.userName" :disabled="edit"></el-input> 
        </el-form-item>
        <el-form-item label="下发日期">
          <el-input v-model="modifyform.createDate" :disabled="edit"></el-input> 
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="modifyform.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyclear(modifydialogVisible = false)">取 消</el-button>
        <el-button type="primary" @click="modifyclear">重置</el-button>
        <el-button type="primary" @click="modifySubmit(modifydialogVisible = false)">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" stripe style="width: 100%">
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
      <el-table-column prop="operate" label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewInspectTask">查看</el-button>
          <el-button type="text" size="small" :disabled="scope.row.taskState == '待分配'? !edit : edit" @click="dialogVisible = true">分配任务</el-button>
          <el-button type="text" size="small" :disabled="scope.row.taskState == '待分配'? !edit : edit" @click="modifyInspectTask(scope.$index,scope.row,modifydialogVisible = true)">修改</el-button>
          <el-button type="text" size="small" :disabled="scope.row.taskState == '待分配'||'已分配'? !edit : edit" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination 
      layout="prev, pager, next"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      :page-size="pagesize">
      </el-pagination>
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
          label: `巡检员测试用户 ${i}`,
          disabled: i % 3 === 0
        });
      }
      return data;
    };
    return {
      tableData: [
        {
          taskNo: "002",
          taskName: "一线巡检",
          circuitryName: "一线",
          startPoleId: "xs1",
          endPoleId: "xs05",
          userName: "测试1",
          createDate: "2013/02/02",
          taskState: "已完成",
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
          taskState: "待分配",
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
          taskState: "已完成",
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
          taskState: "执行中",
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
          taskState: "待分配",
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
          taskState: "已完成",
          finishDate: "2013/02/10",
          isCancel: "否"
        }
      ],
      pagesize: 5,
      currentPage: 1,
      taskNo: "",
      circuitryId: "",
      userId: "",
      createDate: "",
      taskState: "",
      options: [
        {
          id: 1,
          label: "待分配"
        },
        {
          id: 2,
          label: "已分配"
        },
        {
          id: 3,
          label: "执行中"
        },
        {
          id: 4,
          label: "已完成"
        }
      ],
      dialogVisible: false,
      adddialogVisible: false,
      modifydialogVisible: false,
      addform: {
        taskNo: '',
        taskName: '',
        circuitryName: '',
        nameOptions: [
          {
            id: 1,
            label: '西邻一线'
          },
          {
            id: 2,
            label: '西邻二线'
          }

        ],
        inspectPerson: '',
        PoleNos: [
          {
            id: 1,
            label: 'xw001'
          },
          {
            id: 2,
            label: 'xw002'
          }
        ],
        startPoleId: '',
        endPoleId: '',
        userName: 'mi',
        createDate: '2013/02/01',
        describe: ''
      },
      modifyform: {
        taskNo: '',
        taskName: '',
        circuitryName: '',
        nameOptions: [
          {
            id: 1,
            label: '西邻一线'
          },
          {
            id: 2,
            label: '西邻二线'
          }

        ],
        inspectPerson: '',
        PoleNos: [
          {
            id: 1,
            label: 'xw001'
          },
          {
            id: 2,
            label: 'xw002'
          }
        ],
        startPoleId: '',
        endPoleId: '',
        userName: 'mi',
        createDate: '2013/02/01',
        describe: ''
      },
      edit: true,
      data: generateData(),
      value: [1, 4]
    };
  },
  created() {
    // 请求列表数据
    // this.axios.get('/',)
    // .then((res) => {
    //   window.console.log(res.data);
    // })
    // .catch((err) => {
    //   window.console.log("错误",err)
    // })
  },
  mounted(){


  },
  methods: {
    //制定巡检任务
    addInspectTask() {
      
    },
    // 添加模态框重置
    clear() {
      this.addform.taskNo = '',
      this.addform.taskName = '',
      this.addform.circuitryName = '',
      this.addform.inspectPerson = '',
      this.addform.startPoleId = '',
      this.addform.endPoleId = '',
      this.addform.describe = ''
    },
    // 添加保存提交
    addSubmit() {
      // 添加请求
      // this.axios.get('/',)
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })

    },

    // 查看巡检任务
    viewInspectTask() {
      this.$router.push("/inspect/enactview");
    },

    // 修改按钮
    modifyInspectTask(index) {
      this.modifyform.taskNo = this.tableData[index].taskNo;
      this.modifyform.taskName = this.tableData[index].taskName;
      this.modifyform.circuitryName = this.tableData[index].circuitryName;
      
    },

    // 修改重置
    modifyclear() {
      this.modifyform.taskNo = '',
      this.modifyform.taskName = '',
      this.modifyform.circuitryName = '',
      this.modifyform.inspectPerson = '',
      this.modifyform.startPoleId = '',
      this.modifyform.endPoleId = '',
      this.modifyform.describe = ''
    },

    // 修改提交模态框
    modifySubmit() {

    },


    // 分页点击事件
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除弹出框
    del(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.inspectData.splice(index, 1);
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
  }

  .pagination {
    margin: 10px 0 0;
    text-align: right;
  }

  #add-form {
    padding: 0 37px;

    .el-select {
      width: 410px;
    }

    .el-input {
      width: 410px;
    }
  }

  #modify-form {
    padding: 0 37px;

    .el-select {
      width: 410px;
    }

    .el-input {
      width: 410px;
    }
  }
}

</style>