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
            <el-input placeholder="请输入内容" v-model="circuitryNo" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <label>任务状态：</label>
            <el-select v-model="taskState" clearable placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.id"
                :label="item.label"
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
            <el-button type="primary" class="bg-color" @click="enactQuery">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple bg-add">
            <el-button type="primary" class="bg-color"  @click="adddialogVisible = true ">
              <i class="el-icon-circle-plus-outline" ></i> 制定巡检任务
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 制定任务模态框 -->
    <el-dialog title="制定巡检任务" :visible.sync="adddialogVisible" width="40%">
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
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检员">
          <el-select v-model="addform.inspectPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in addform.personOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始杆号">
            <el-select v-model="addform.startPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in addform.PoleNos"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="终止杆号">
            <el-select v-model="addform.endPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in addform.PoleNos"
                :key="item.id"
                :label="item.label"
                :value="item.id">
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
        <el-transfer v-model="value" 
        :data="datas"
        :titles="['待选巡检员', '已选巡检员']"
        ></el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotSubmit(dialogVisible = false)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改任务模态框 -->
    <el-dialog title="修改巡检任务" :visible.sync="modifydialogVisible" width="40%">
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
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检员">
          <el-select v-model="modifyform.inspectPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in addform.personOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
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
      <el-table-column prop="circuitry.startPole.circuitry" label="起始杆号" align="center"></el-table-column>
      <el-table-column prop="circuitry.endPole.circuitry" label="终止杆号" align="center"></el-table-column>
      <el-table-column prop="users.userName" label="下发人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="下发时间" align="center"></el-table-column>
      <el-table-column prop="systemPropertiesValue.sysProValueName" label="任务状态" align="center"></el-table-column>
      <el-table-column prop="finishDate" label="任务完成时间" align="center"></el-table-column>
      <el-table-column prop="isCancel" label="任务是否取消" align="center" ></el-table-column>
      <el-table-column prop="operate" label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewInspectTask(scope.$index,scope.row)">查看</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '待分配'? !edit : edit" @click="allot(scope.row, dialogVisible = true)">分配任务</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '待分配'? !edit : edit" @click="modifyInspectTask(scope.$index, scope.row, modifydialogVisible = true)">修改</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '待分配'||'已分配'? !edit : edit" @click="del(scope.row)">删除</el-button>
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
export default {
  data() {
    const generateData = function() {
      const datas = [];
      const testPerson = [
        '巡检员测试用户1',
        '巡检员测试用户2',
        '巡检员测试用户3',
        '巡检员测试用户4',
        '巡检员测试用户5',
        '巡检员测试用户6',
        '巡检员测试用户7',
        '巡检员测试用户8',
        '巡检员测试用户9',
      ];
      for (let i = 0; i <testPerson.length; i++) {
        datas.push({
          key: i,
          label: testPerson[i],
          disabled: i % 3 === 0
        });
      }
      return datas;
    };
    return {
    tableData: {
        taskNo: '',
        taskName: '',
        circuitry: {
          circuitryName: '',
          startPole: {
            circuitry: ''
          },
          endPole: {
            circuitry: ''
          }
        },
        users: {
          userName: ''
        },
        systemPropertiesValue: {
          sysProValueName: ''
        },
      },
      count: null,
      pageSize: 5,
      currentPage: 1,
      taskNo: "",
      circuitryNo: "",
      userId: "",
      createDate: "",
      taskState: "",
      stateOptions: [
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
          label: "审核中"
        },
        {
          id: 5,
          label: "已完成"
        },
        {
          id: 6,
          label: "驳回"
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
        personOptions: [
          {
            id: 1,
            label: '黄金糕'
          }, 
          {
            id: 2,
            label: '双皮奶'
          }, 
          {
            id: 3,
            label: '蚵仔煎'
          }, 
          {
            id: 4,
            label: '龙须面'
          }, 
          {
            id: 5,
            label: '北京烤鸭'
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
      datas: generateData(),
      value: [],
      nowTaskId: null,
      isQuery: false
    };
  },
  created() {

    // contentType: "application/json",
    // headers:{ Authorization: window.localStorage.token};

    // 请求列表数据
    // this.axios.get('http://192.168.6.184:8080/showAllTasksByPageS?',{ 
    //   params: {
    //     currentPage: this.currentPage,
    //     pageSize: this.pageSize
    //   }
    // })
    // .then((res) => {
    //   this.tableData = res.data.data.tasks;
    //   this.count = res.data.data.count;
    //   window.console.log(res.data);
    // })
    // .catch((err) => {
    //   window.console.log("错误",err)
    // })

    // this.axios.get('http://192.168.6.184:8080/showInspectorsByTaskIdS?',{ 
    //   params: {
    //     currentPage: this.currentPage,
    //     pageSize: this.pageSize
    //   }
    // })
    // .then((res) => {
    //   this.tableData = res.data.data.tasks;
    //   this.count = res.data.data.count;
    //   window.console.log(res.data);
    // })
    // .catch((err) => {
    //   window.console.log("错误",err)
    // })


  },
  mounted() {
    // 页面加载完后显示当前时间
    this.addform.createDate = this.addDate()
    this.modifyform.createDate = this.addDate()
    // 定时刷新时间
    let _this = this
    // 定时器
    this.timer = setInterval(function () {
      _this.findDate = _this.addDate() // 修改数据date
    })
  },
  methods: {
    addDate() {
      var nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      let systemDate = date.year + '-' + date.month + '-' + date.date;
      return systemDate;
    },

    // 查询
    enactQuery() {
      this.isQuery = true;

      // this.axios.get('http://192.168.6.184:8080/selectTasksByConditionS?',{
      //   params: {
      //     currentPage: this.currentPage,
      //     pageSize: this.pageSize,
      //     // userName: localStorage.getItem()
      //     startTime: this.createDate,
      //     taskNo: this.taskNo,
      //     circuitryNo: this.circuitryNo,
      //     Id: this.taskState
      //   }
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })
      

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
      // this.axios.get('http://192.168.6.184:8080/createTasksS?',{
      //   params: {
      //     taskNo: this.addform.taskNo,
      //     taskName: this.addform.taskName,
      //     circuitryId: this.addform.circuitryName,
      //     inspectorId: this.addform.inspectPerson,
      //     startPoleNo: this.addform.startPoleNo,
      //     endPoleNo: this.addform.endPoleNo,
      //     userId: sessionStorage.getItem('userid'),
      //     createDate: this.addform.create,
      //     taskNote: this.addform.describe
      //   }
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })

    },

    // 查看巡检任务
    viewInspectTask(index, row) {
      var taskId = row.taskId;
      this.$router.push({
        path: "/inspect/enactview",
        query: {taskId}
      });
    },

    // 分配任务按钮
    allot(row) {
      this.nowTaskId = row.taskId;
    },
    // 分配提交
    allotSubmit() {
      window.console.log(this.value);
      // this.axios.get('http://192.168.6.184:8080/assignTaskS?',{
      //   params: {
      //     userId: this.value,
      //     taskId: this.nowTaskId,
      //   }
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })

    },

    // 修改按钮
    modifyInspectTask(index, row) {
      this.nowTaskId = row.taskId;
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

      // this.axios.get('http://192.168.6.184:8080/changeTaskS?',{
      //   params: {
      //     taskId: this.nowTaskId,
      //     taskNo: this.modfyform.taskNo,
      //     taskName: this.modfyform.taskName,
      //     circuitryId: this.modfyform.circuitryName,
      //     inspectorId: this.modfyform.inspectPerson,
      //     startPoleNo: this.modfyform.startPoleNo,
      //     endPoleNo: this.modfyform.endPoleNo,
      //     userId: sessionStorage.getItem('userid'),
      //     createDate: this.modifyform.createDate,
      //     taskNote: this.addform.describe
      //   }
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })
    },


    // 分页点击事件
    handleCurrentChange(val) {
      if(this.isQuery) {

        this.axios.get('http://192.168.6.184:8080/selectTasksByConditionS?',{
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            // userName: localStorage.getItem()
            startTime: this.createDate,
            taskNo: this.taskNo,
            circuitryNo: this.circuitryNo,
            Id: this.taskState
          }
        })
        .then((res) => {
          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
      }


      this.axios.get('http://192.168.6.184:8080/showAllTasksByPageS?',{ 
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
        window.console.log("错误",err)
      })

    },
    //删除弹出框
    del(row) {
      window.console.log(row)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除请求
          // this.axios.get('/',{params:{taskId: row.taskId }})
          // .then((res) => {
          //   window.console.log(res.data);
          // })
          // .catch((err) => {
          //   window.console.log("错误",err)
          // })
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
  },
  destroyed () {
    if (this.timer) { 
      clearInterval(this.timer)
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
    padding: 0 38px;

    .el-select {
      width: 410px;
    }

    .el-input {
      width: 410px;
    }
  }

  #modify-form {
    padding: 0 38px;

    .el-select {
      width: 410px;
    }

    .el-input {
      width: 410px;
    }

  }
}

</style>