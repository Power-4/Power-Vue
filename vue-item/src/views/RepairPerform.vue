<template>
  <div class="RepairPerform">
    <!-- 任务制定页面 -->
    <div class="zhixing">
      <!-- 任务编号和工作单据 -->
      <el-row class="input-1">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            任务编号:
            <el-input size="small" placeholder="请输入内容" v-model="input1" clearable class="work-num"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            工作单据:
            <el-select size="small" v-model="value" placeholder="请选择" class="work-danju">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <!-- 下发人和下发时间 -->
      <el-row class="input-1">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            下发人:
            <el-input
              size="small"
              placeholder="请输入内容"
              v-model="input2"
              clearable
              class="work-xiafa"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            下发时间:
            <el-date-picker
              class="work-date"
              size="small"
              v-model="value2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-button type="primary" class="repair-query">查询</el-button>
        

        
      </el-row>

      <!-- 下方表格 -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="taskNum" label="任务编号" width="75"></el-table-column>
        <el-table-column prop="taskName" label="任务名称" width="100"></el-table-column>
        <el-table-column prop="workDocuments" label="工作单据" width="100"></el-table-column>
        <el-table-column prop="issuedPeople" label="下发人" width="100"></el-table-column>
        <el-table-column prop="issuedDate" label="下发时间" width="100"></el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" width="100"></el-table-column>
        <el-table-column prop="completionTime" label="任务完成时间" width="100"></el-table-column>
        <el-table-column prop="isCancel" label="是否取消" width="75"></el-table-column>
        <el-table-column prop label="操作" width="229">
          <template slot-scope="scope">
            <el-button @click="chakanClick(scope.row)" type="text" size="small">查看</el-button>
            <!-- 查看时的模态框 -->
            <el-dialog title="查看任务" :visible.sync="checkTask">
              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="taskNum" label="任务编码" width="178"></el-table-column>
                <el-table-column prop="taskName" label="任务名称" width="178"></el-table-column>
                <el-table-column prop="taskStatus" label="任务状态" width="178"></el-table-column>
                <el-table-column prop="workDocuments" label="工作单据" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="issuedPeople" label="下发人" width="178"></el-table-column>
                <el-table-column prop="issuedDate" label="下发时间" width="178"></el-table-column>
                <el-table-column prop label="任务负责人" width="178"></el-table-column>
                <el-table-column prop label="任务描述" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop label="消缺员" width="178"></el-table-column>
                <el-table-column prop label="消缺时间" width="178"></el-table-column>
                <el-table-column prop label="负责人审查意见" width="178"></el-table-column>
                <el-table-column prop label="完成情况描述" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop label="下发人审查意见" width="178"></el-table-column>
              </el-table>

              <p>缺陷列表:</p>
              <el-table
                :data="tableData2"
                border
                style="width: 99%"
                size="small"
                class="quexianlist"
              >
                <el-table-column prop="lineNum" label="线路编号" width="84"></el-table-column>
                <el-table-column prop="poleNum" label="塔杆编号" width="84"></el-table-column>
                <el-table-column prop="defectLevels" label="缺陷等级" width="100"></el-table-column>
                <el-table-column prop="defectTypes" label="缺陷类型" width="100"></el-table-column>
                <el-table-column prop="defectDes" label="缺陷描述" width="158"></el-table-column>
                <el-table-column prop="quot" label="发现人" width="85"></el-table-column>
                <el-table-column prop="findTime" label="发现时间" width="100"></el-table-column>
              </el-table>

              <!--  -->
              <el-table :data="chakanForm" border style="width: 100%" size="small">
                <el-table-column prop label="工作间断延期报告" width="358"></el-table-column>
                <el-table-column prop label="工作总结报告" width="358"></el-table-column>
              </el-table>
            </el-dialog>

            <el-button type="text" size="small" @click="fenClick(scope.row)">执行录入</el-button>

            <!-- 分配任务时的模态框 -->
            <el-dialog title="分配任务" :visible.sync="fenTask">
              <el-transfer v-model="fneValue" :data="fneArr"></el-transfer>
              <el-button type="primary" class="fenCofim">确认分配</el-button>
            </el-dialog>
            <el-button type="text" size="small" @click="xiuClick(scope.row)">修改</el-button>
            <!-- 修改时的模态框 -->
            <el-dialog title="修改任务" :visible.sync="xiuTask">
              <div style="width:100%; height:700px;">
                <el-form
                  class="zhidingMotai xiugaiMoTai"
                  size="mini"
                  :inline="true"
                  label-position="left"
                  ref="form"
                  :model="xiuForm"
                  label-width="86px"
                  style="height:40%"
                >
                  <!-- 任务编码修改 -->
                  <el-form-item label="任务编码:">
                    <el-input v-model="xiuForm.taskNum"></el-input>
                  </el-form-item>

                  <!-- 任务名称修改 -->
                  <el-form-item label="任务名称:">
                    <el-input v-model="xiuForm.taskName"></el-input>
                  </el-form-item>

                  <!-- 工作单据修改 -->
                  <el-form-item label="工作单据:">
                    <el-select v-model="form.workDocuments" placeholder="请选择工作单据">
                      <el-option label="任务单" value="renwudan"></el-option>
                      <el-option label="第一张单据" value="one"></el-option>
                      <el-option label="第二种单据" value="two"></el-option>
                    </el-select>
                  </el-form-item>

                  <!-- 任务负责人修改 -->
                  <el-form-item label="任务负责人:">
                    <el-select v-model="xiuForm.taskLeader" placeholder="请选择任务负责人">
                      <el-option label="线路管理测试用户1" value="taskLeaderOne"></el-option>
                      <el-option label="线路管理测试用户3" value="taskLeaderTwo"></el-option>
                      <el-option label="线路管理测试用户2" value="taskLeaderThree"></el-option>
                    </el-select>
                  </el-form-item>

                  <!-- 下发人修改 -->
                  <el-form-item label="下发人:">
                    <el-input v-model="xiuForm.issuedPeople"></el-input>
                  </el-form-item>

                  <!-- 下发时间修改 -->
                  <el-form-item label="下发时间:">
                    <el-col :span="14">
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="xiuForm.issuedDate"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item>

                  <!-- 任务描述修改 -->
                  <el-form-item label="任务描述:">
                    <el-input type="textarea" v-model="xiuForm.taskDescription"></el-input>
                  </el-form-item>

                  <!-- 任务备注修改 -->
                  <el-form-item label="任务备注:">
                    <el-input type="textarea" v-model="xiuForm.taskNote"></el-input>
                  </el-form-item>

                  <!-- 任务消缺员修改 -->
                  <el-form-item label="消缺员:">
                    <el-input type="textarea" v-model="xiuForm.eliminateVacancies"></el-input>
                  </el-form-item>

                  <!--  -->
                </el-form>
                <!-- 添加缺陷按钮 -->
                <el-button type="primary" size="small">添加缺陷</el-button>
                <!-- 缺陷列表 -->
                <el-table
                  ref="multipleTable"
                  :data="tableData2"
                  tooltip-effect="dark"
                  style="width: 100%"
                  size="mini"
                >
                  <el-table-column type="selection" width="40"></el-table-column>
                  <el-table-column prop="lineNum" label="线路编号" width="84"></el-table-column>
                  <el-table-column prop="poleNum" label="塔杆编号" width="84"></el-table-column>
                  <el-table-column prop="defectLevels" label="缺陷等级" width="50"></el-table-column>
                  <el-table-column prop="defectTypes" label="缺陷类型" width="100"></el-table-column>
                  <el-table-column prop="defectDes" label="缺陷描述" width="100"></el-table-column>
                  <el-table-column prop="quot" label="发现人" width="85"></el-table-column>
                  <el-table-column prop="findTime" label="发现时间" width="100"></el-table-column>
                  <el-table-column prop="defectCaozuo" label="操作" width="75">
                    <el-button type="text" size="mini" @click="open()">取消</el-button>
                  </el-table-column>
                </el-table>
                <!-- 确认制定按钮 -->
                <el-button type="primary" class="addXiaoQueren">确认修改消缺任务</el-button>
              </div>
            </el-dialog>

            <el-button type="text" size="small" @click="open()">执行</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        :page-size="5"
        layout="prev, pager, next"
        :total="10"
        class="pagination"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "RepairPerform",
  data() {
    return {
      fneValue: [],
      fneArr: [
        {
          key: 1,
          label: "消缺员1",
          disabled: false
        },
        {
          key: 2,
          label: "消缺员2",
          disabled: false
        },
        {
          key: 3,
          label: "消缺员3",
          disabled: false
        }
      ],
      chakanForm: [],
      xiuForm: {},
      form: {
        taskNum: "",
        taskName: "",
        workDocuments: "",
        taskLeader: "",
        issuedPeople: "",
        issuedDate: "",
        taskDescription: "",
        taskNote: "",
        eliminateVacancies: ""
      },
      activeName: "first",
      input1: "",
      input2: "",
      options: [
        {
          value: "选项1",
          label: "任务单"
        },
        {
          value: "选项2",
          label: "第一种单据"
        },
        {
          value: "选项3",
          label: "第二种单据"
        }
      ],
      value: "",
      value2: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      tableData: [
        {
          taskNum: "RW0245",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否",
          fuzeren: "羊海龙"
        },
        {
          taskNum: "RW0246",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0247",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0248",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0249",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0250",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否",
          fuzeren: "羊海龙"
        },
        {
          taskNum: "RW0251",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否",
          fuzeren: "羊海龙"
        },
        {
          taskNum: "RW0252",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否",
          fuzeren: "羊海龙"
        },
        {
          taskNum: "RW0253",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否",
          fuzeren: "羊海龙"
        },
        {
          taskNum: "RW0254",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否",
          fuzeren: "羊海龙"
        }
      ],
      tableData2: [
        {
          lineNum: 123456,
          poleNum: 45678,
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          defectDes: "断裂了",
          quot: "羊海龙",
          findTime: "2019/11/28"
        },
        {
          lineNum: 123456,
          poleNum: 45678,
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          defectDes: "断裂了",
          quot: "羊海龙",
          findTime: "2019/11/28"
        }
      ],
      checkTask: false,
      xiuTask: false,
      fenTask: false
    };
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      window.console.log(this.currentPage); //点击第几页
    },
    chakanClick(row) {
      this.checkTask = true;
      this.chakanForm = [];
      this.chakanForm.push(row);
    },
    fenClick() {
      this.fenTask = true;
      this.axios
        .post("http://192.168.6.175:8080/fix/getallfix", {
          currentPage: 1,
          pageSize: 2
        })
        .then(res => {
          window.console.log(res.data);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    xiuClick(row) {
      this.xiuTask = true;
      window.console.log(row);
      Object.assign(this.xiuForm, row);
      window.console.log(this.xiuForm);
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
  created: function() {
    // this.axios
    //   .post("http://192.168.6.184:8080//selectFixTaskByFind", {
    //     currentPage: 1,
    //     pageSize: 5,
    //     taskNo: 1,
    //     taskName: "",
    //     userName: "",
    //     sysProValueId: 1,
    //     startDate: "1999/2/10",
    //     endDate: "2020/10/10"
    //   })
    //   .then(res => {
    //     window.console.log(res.data.data.fix[0].task);
    //   })
    //   .catch(err => {
    //     window.console.log(err);
    //   });
  }
};
</script>

<style lang="less" scoped>

.app-repair {
  width: 980px;
  height: 600px;
  float: right;
  margin-left: 20px;
}

.zhixing {
  width: 100%;

  .work-num {
    width: 170px;
  }

  .work-danju {
    width: 170px;
  }

  .work-xiafa {
    width: 170px;
    margin-left: 15px;
  }

  .work-date {
    width: 310px;
  }

  .bg-purple {
    margin-bottom: 20px;
  }

  .bg-purple-light {
    margin-left: 20px;
  }

  .repair-query {
    height: 32px;
  }

  .repair-add {
    height: 32px;
  }

  .pagination {
    float: right;
    margin-top: 10px;
  }

  .addXiaoQueren {
    margin-top: 200px;
    margin-left: 275px;
  }

  .quexianlist {
    margin-bottom: 10px;
  }

  .fenCofim {
    margin-left: 240px;
  }
  // .is-leaf {
  //   height: 50px;
  // }
}


.el-tabs__item {
  font-size: 18px;
}
</style>
