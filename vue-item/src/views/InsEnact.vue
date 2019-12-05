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
            <el-button type="primary" class="bg-color" @click="enactQuery">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple bg-add">
            <el-button type="primary" class="bg-color"  @click="addTask(adddialogVisible = true )">
              <i class="el-icon-circle-plus-outline" ></i> 制定巡检任务
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 制定任务模态框 -->
    <el-dialog title="制定巡检任务" :visible.sync="adddialogVisible" width="40%" @close="resetForm('addform')">
      <el-form ref="addform" id="add-form" :rules="rules" :model="addform" label-width="80px">
        <el-form-item label="任务编码">
          <el-input v-model="addform.taskNo" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item 
          label="任务名称"
          prop="taskName"
        >
          <el-input v-model="addform.taskName" clearable></el-input>
        </el-form-item>
        <el-form-item 
          label="巡检线路"
          prop="circuitryName"
        >
          <el-select @change="selectChanged" v-model="addform.circuitryName" clearable placeholder="请选择">
            <el-option
              v-for="item in circuitryNames"
              :key="item.circuitryId"
              :label="item.circuitryName"
              :value="item.circuitryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
          label="巡检员"
        >
          <el-select v-model="addform.inspectPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in Inspectors"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
        label="起始杆号"
        prop="startPoleNo"
        >
          <el-select v-model="addform.startPoleNo" clearable placeholder="请选择">
            <el-option
              v-for="item in nowPoles"
              :key="item.poleId"
              :label="item.poleNo"
              :value="item.poleNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
        label="终止杆号"
        prop="endPoleNo"
        >
            <el-select v-model="addform.endPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in nowPoles"
                :key="item.poleId"
                :label="item.poleNo"
                :value="item.poleNo">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="下发人">
          <el-input v-model="addform.userName" :disabled="edit"></el-input> 
        </el-form-item>
        <el-form-item label="下发日期">
          <el-input v-model="addform.createDate" :disabled="edit" ></el-input> 
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="addform.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addform',adddialogVisible=false)">取 消</el-button>
        <el-button type="primary" @click="resetForm('addform')">重 置</el-button>
        <el-button type="primary" @click="addSubmit('addform')">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 分配任务模态框 -->
    <el-dialog title="分配巡检任务" :visible.sync="dialogVisible" width="42%">
      <template>
        <el-transfer 
        class="allot"
        v-model="value" 
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
    <el-dialog title="修改巡检任务" :visible.sync="modifydialogVisible" width="40%"  @close="resetForm('modifyform')">
      <el-form ref="modifyform" id="modify-form" :rules="rules" :model="modifyform" label-width="80px">
        <el-form-item label="任务编码">
          <el-input v-model="modifyform.taskNo" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="modifyform.taskName"></el-input>
        </el-form-item>
        <el-form-item label="巡检线路" prop="circuitryName">
          <el-select @change="selectChanged" v-model="modifyform.circuitryName" clearable placeholder="请选择">
            <el-option
              v-for="item in circuitryNames"
              :key="item.circuitryId"
              :label="item.circuitryName"
              :value="item.circuitryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡检员" prop="inspectPerson">
          <el-select v-model="modifyform.inspectPerson" multiple placeholder="请选择">
            <el-option
              v-for="item in Inspectors"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始杆号" prop="startPoleNo">
            <el-select v-model="modifyform.startPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in nowPoles"
                :key="item.poleId"
                :label="item.poleNo"
                :value="item.poleNo">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="终止杆号" prop="endPoleNo">
            <el-select v-model="modifyform.endPoleNo" clearable placeholder="请选择">
              <el-option
                v-for="item in nowPoles"
                :key="item.poleId"
                :label="item.poleNo"
                :value="item.poleNo">
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
        <el-button @click="resetForm('modifyform',modifydialogVisible = false)">取 消</el-button>
        <el-button type="primary" @click="resetForm('modifyform')">重 置</el-button>
        <el-button type="primary" @click="modifySubmit('modifyform')">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="taskNo" label="任务编号" align="center">
        <template slot-scope="scope">
          <el-popover>
            <p>ID: {{ scope.row.taskId}}</p>
            <p>circuitryId: {{ scope.row.circuitry.circuitryId}}</p>
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
      <el-table-column prop="isCancel" label="任务是否取消" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewInspectTask(scope.$index,scope.row)">查看</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '待分配'? !edit : edit" @click="allot(scope.row, dialogVisible = true)">分配任务</el-button>
          <el-button type="text" size="small" :disabled="scope.row.systemPropertiesValue.sysProValueName == '待分配' || scope.row.systemPropertiesValue.sysProValueName == '已分配'? !edit : edit" @click="modifyInspectTask(scope.$index, scope.row, modifydialogVisible = true)">修改</el-button>
          <el-button type="text" size="small" :disabled="scope.row.isCancel == '否'? !edit : edit" @click="del(scope.row)">取消</el-button>
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
    return {
      tableData: [],
      count: null,
      pageSize: 5,
      currentPage: 1,
      taskNo: "",
      circuitryNo: "",
      userName: "",
      createDate: null,
      taskState: "",
      stateOptions: [],
      circuitryNames: [],
      dialogVisible: false,
      adddialogVisible: false,
      modifydialogVisible: false,

      addform: {
        taskNo: '',
        taskName: '',
        circuitryName: '',
        inspectPerson: '',
        startPoleNo: '',
        endPoleNo: '',
        userName: sessionStorage.getItem('userName'),
        createDate: '',
        describe: '无'
      },
      rules: {
        taskName: [
          { 
            required: true,
            pattern: /[\u4e00-\u9fa5]/,
            message: "请输入中文任务名称", 
            trigger: 'blur' 
          }
        ],
        circuitryName: [
          { required: true, message: '请选择巡检线路', trigger: 'change' }
        ],
        startPoleNo: [
          { required: true, message: '请选择起始杆号', trigger: 'change' }
        ],
        endPoleNo: [
          { required: true, message: '请选择终止杆号', trigger: 'change' }
        ]
      },
      modifyform: {
        taskNo: '',
        taskName: '',
        circuitryName: '',
        inspectPerson: [],
        startPoleNo: '',
        endPoleNo: '',
        userName: sessionStorage.getItem('userName'),
        createDate: '',
        describe: ''
      },
      edit: true,
      Inspectors: [],
      nowPoles: [],
      datas: '',
      value: [],
      nowTaskId: null,
      isQuery: false,
      nowInspector: [],
      nowcircuitryId: '',
      nowPage: ''

    };
  },
  created() {

    // 请求列表数据
    this.axios.get('/showAllTasksByPageS?',{ 
      params: {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
    })
    .then((res) => {
      this.tableData = res.data.data.tasks;
      for(var i = 0; i< res.data.data.tasks.length; i++) {
        if(res.data.data.tasks[i].isCancel == 1) {
          res.data.data.tasks[i].isCancel = '是'
        } else if (res.data.data.tasks[i].isCancel == 0) {
          res.data.data.tasks[i].isCancel = '否'
        }
      }
      this.count = res.data.data.count;
      window.console.log("初始化",res.data);
    })
    .catch((err) => {
      window.console.log("错误",err)
    })

    // 查询巡检员
    this.axios.get('/showInspectorsNamesS?')
    .then((res) => {
      this.Inspectors = res.data.data.inspectorNames;
      window.console.log('所有巡检员',res.data);
    })
    .catch((err) => {
      window.console.log("错误",err)
    })


    // 请求任务状态值
    this.axios.get('/selectAllFixState?')
    .then((res) => {
      this.stateOptions = res.data.data.fixState;
      window.console.log("请求任务状态值",res.data);
    })
    .catch((err) => {
      window.console.log('错误是', err);
    })

    // 查询所有巡检路线
    this.axios.get('/showCircuitryNamesS?')
    .then((res) => {
      this.circuitryNames = res.data.data.circuitryNames;
      window.console.log("查询所有巡检路线",res.data);
    })
    .catch((err) => {
      window.console.log('错误是', err);
    })

  },
  beforeUpdate() {
    this.datas = this.generateData()
  },
  mounted() {
    this.addform.createDate = this.addDate()
    this.modifyform.createDate = this.addDate()
  },
  methods: {

    // 分页之后页面初始化
    pageInit(val) {
      this.axios.get('/showAllTasksByPageS?',{ 
        params: {
          currentPage: val,
          pageSize: this.pageSize
        }
      })
      .then((res) => {
        this.tableData = res.data.data.tasks;
        for(var i = 0; i< res.data.data.tasks.length; i++) {
          if(res.data.data.tasks[i].isCancel == 1) {
            res.data.data.tasks[i].isCancel = '是'
          } else if (res.data.data.tasks[i].isCancel == 0) {
            res.data.data.tasks[i].isCancel = '否'
          }
        }
        this.count = res.data.data.count;
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })
    },


    // 分配任务巡检员获取
    generateData() {
      const datas = [];
      for (let i = 0; i < this.Inspectors.length; i++) {
        datas.push({
          key: i,
          label: this.Inspectors[i].userName,
        });
      }
      return datas;
    },
    
    // 获取当前时间
    addDate() {
      var nowDate = new Date()
      var year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1;
      month = month < 10 ? '0' + month:month;
      var today = nowDate.getDate();
      today = today < 10? '0' + today:today;

      let systemDate = year + '/' + month + '/' + today;
      return systemDate;
    },

    // 查询
    enactQuery() {
      this.isQuery = true;
      window.console.log(this.isQuery)

      this.axios.get('/selectTasksByConditionS?',{
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          id: this.taskState,
          userName: this.userName,
          startDate: this.createDate==''?'1970/01/01':this.createDate,
          taskNo: this.taskNo,
          circuitryNo: this.circuitryNo
        }
      })
      .then((res) => {
        this.tableData = res.data.data.tasks;
        this.count = res.data.data.count;
        for(var i = 0; i< res.data.data.tasks.length; i++) {
          if(res.data.data.tasks[i].isCancel == 1) {
            res.data.data.tasks[i].isCancel = '是'
          } else if (res.data.data.tasks[i].isCancel == 0) {
            res.data.data.tasks[i].isCancel = '否'
          }
        }
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })
    },

    // 制定任务按钮
    addTask() {
      // 获取任务编号
      this.axios.get('/autoCreateTaskNoS?')
      .then((res) => {
        this.addform.taskNo = res.data.data.autoTaskNo;
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log('错误是', err);
      })
    },

    // 制定任务根据线路id请求杆号
    selectChanged(value) {
      this.modifyform.startPoleNo = '';
      this.modifyform.endPoleNo = '';
      window.console.log(value)
      this.axios.get('/selectPoleNoByCircuitryIdS?',{params:{circuitryId: value}})
      .then((res) => {
        this.nowPoles = res.data.data.poles;
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log('错误是', err);
      })
    },

    // 添加保存提交
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 添加请求
          this.axios.get('/createTasksS?',{
            params: {
              taskNo: this.addform.taskNo,
              taskName: this.addform.taskName,
              circuitryId: this.addform.circuitryName,
              inspectorId: this.addform.inspectPerson.toString(),
              startPoleNo: this.addform.startPoleNo,
              endPoleNo: this.addform.endPoleNo,
              userId: sessionStorage.getItem('userId'),
              createDate: this.addform.createDate,
              taskNote: this.addform.describe
            }
          })
          .then((res) => {
            this.$refs[formName].resetFields();
            this.addform.inspectPerson = '';
            if(res.data.data.ifSuccess == 'success') {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "添加失败!"
              });
            }
            this.pageInit(this.nowPage);
            window.console.log('添加成功',res.data);
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "添加失败!"
            });
            window.console.log("错误",err)
          })
        } else {
          window.console.log('提交失败！');
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.addform.inspectPerson = '';
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
      this.axios.get('/assignTaskS?',{
        params: {
          userId: this.value.toString(),
          taskId: this.nowTaskId,
        }
      })
      .then((res) => {
        this.pageInit(this.nowPage);
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })
    },

    // 修改按钮
    modifyInspectTask(index, row) {
      this.nowTaskId = row.taskId;
      this.modifyform.taskNo = this.tableData[index].taskNo;
      this.modifyform.taskName = this.tableData[index].taskName;
      this.modifyform.circuitryName = this.tableData[index].circuitry.circuitryName;
      this.modifyform.startPoleNo = this.tableData[index].circuitry.startPole.poleNo;
      this.modifyform.endPoleNo = this.tableData[index].circuitry.endPole.poleNo;
      this.modifyform.describe = this.tableData[index].taskNote;
      this.nowcircuitryId = this.tableData[index].circuitry.circuitryId;
      
      // 获取当前任务巡检线路杆列表
      this.axios.get('/selectPoleNoByCircuitryIdS?',{
        params: {
          circuitryId: this.tableData[index].circuitry.circuitryId
        }
      })
      .then((res) => {
        this.nowPoles = res.data.data.poles;
        window.console.log(res.data);
      })
      .catch((err) => {
        window.console.log('错误是', err);
      })

      // 获取当前任务的巡检员
      this.axios.get('/showInspectorsByTaskIdS?',{ 
        params: {
          taskId: row.taskId
        }
      })
      .then((res) => {
        res.data.data.inspectorNames.forEach((item)=> {
          var i = {};
          i.userId = item.userId;
          i.userName = item.userName
          this.modifyform.inspectPerson.push(i.userName);
        })
        window.console.log('该任务巡检员',res.data);
      })
      .catch((err) => {
        window.console.log("错误",err)
      })

    },

    // 修改提交模态框
    modifySubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get('/changeTaskS?',{
            params: {
              taskId: this.nowTaskId,
              taskNo: this.modifyform.taskNo,
              taskName: this.modifyform.taskName,
              circuitryId: this.nowcircuitryId,
              inspectorId: this.modifyform.inspectPerson.toString(),
              startPoleNo: this.modifyform.startPoleNo,
              endPoleNo: this.modifyform.endPoleNo,
              userId: sessionStorage.getItem('userId'),
              createDate: this.modifyform.createDate,
              taskNote: this.modifyform.describe
            }
          })
          .then((res) => {
            if(res.data.data.ifSuccess == 'success') {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: "修改失败!"
              });
            }
            this.pageInit(this.nowPage);
            window.console.log(res.data);
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: "修改失败!"
            });
            window.console.log("错误",err)
          })
        } else {
          window.console.log('提交失败！');
          return false;
        }
      });
    },

    // 分页点击事件
    handleCurrentChange(val) {
      // 获取当前点击页
      this.nowPage = val;

      if(this.isQuery) {
        window.console.log(this.isQuery);
        this.axios.get('/selectTasksByConditionS?',{
          params: {
            currentPage: val,
            pageSize: this.pageSize,
            userName: this.userName,
            startTime: this.createDate,
            taskNo: this.taskNo,
            circuitryNo: this.circuitryNo,
            Id: this.taskState
          }
        })
        .then((res) => {
          this.tableData = res.data.data.tasks;
          this.count = res.data.data.count;
          window.console.log(1);
          for(var i = 0; i< res.data.data.tasks.length; i++) {
            if(res.data.data.tasks[i].isCancel == 1) {
              res.data.data.tasks[i].isCancel = '是'
            } else if (res.data.data.tasks[i].isCancel == 0) {
              res.data.data.tasks[i].isCancel = '否'
            }
          }

          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
      } else {
        
        this.axios.get('/showAllTasksByPageS?',{ 
          params: {
            currentPage: val,
            pageSize: this.pageSize
          }
        })
        .then((res) => {
          this.tableData = res.data.data.tasks;
          for(var i = 0; i< res.data.data.tasks.length; i++) {
            if(res.data.data.tasks[i].isCancel == 1) {
              res.data.data.tasks[i].isCancel = '是'
            } else if (res.data.data.tasks[i].isCancel == 0) {
              res.data.data.tasks[i].isCancel = '否'
            }
          }
          this.count = res.data.data.count;
          window.console.log(res.data);
          
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
      }
    },
    //取消弹出框
    del(row) {
      window.console.log(row)
      this.$confirm("此操作将永久取消该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        // 取消请求
        this.axios.get('/cancelTaskS?',{params:{taskId: row.taskId }})
        .then((res) => {

          this.pageInit(this.nowPage);
          if(res.data.data.ifSuccess == 'success') {
            this.$message({
              type: "success",
              message: "取消成功!"
            });
          } else {
            this.$message({
              type: "error",
              message: "取消失败!"
            });
          }
          window.console.log(res.data);
        })
        .catch((err) => {
          window.console.log("错误",err)
        })
        
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
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
    padding: 0 38px;

    .el-select {
      width: 100%;
    }

  }

  #modify-form {
    padding: 0 38px;

    .el-select {
      width: 100%;
    }

  }

  .allot {
    width: 100%;
  }
}

</style>