<template>
  <div class="RepairPerform">
    <!-- 任务执行页面 -->
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
              value-format="yyyy/MM/dd"
            >></el-date-picker>
          </div>
        </el-col>
        <el-button type="text" @click="chaxun()">查询</el-button>
      </el-row>

      <!-- 下方表格 -->
      <el-table :data="tableData" border style="width: 100%" size="small">
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
            <el-button @click="chakanClick(scope.row)" type="text" size="small" class="wb_chakan">查看</el-button>
            <!-- 查看时的模态框 -->
            <el-dialog title="详情" :visible.sync="checkTask">
              <el-table :data="chakanForm" border size="small">
                <el-table-column prop="taskNum" label="任务编号" width="178"></el-table-column>
                <el-table-column prop="taskName" label="任务名称" width="178"></el-table-column>
                <el-table-column prop="taskStatus" label="任务状态" width="178"></el-table-column>
                <el-table-column prop="workDocuments" label="工作单据" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="issuedPeople" label="下发人" width="178"></el-table-column>
                <el-table-column prop="issuedDate" label="下发时间" width="178"></el-table-column>
                <el-table-column prop="fuzheren" label="任务负责人" width="178"></el-table-column>
                <el-table-column prop="miaoshu" label="任务描述" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="xiaoqueren" label="消缺员" width="178"></el-table-column>
                <el-table-column prop="xiaoqueTime" label="消缺时间" width="178"></el-table-column>
                <el-table-column prop="fuzheyijian" label="负责人审查意见" width="178"></el-table-column>
                <el-table-column prop="wanmiaoshu" label="完成情况描述" width="178">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入内容"
                      :readonly="!xiuTask"
                      v-model="wanmiaoshu"
                    >{{scope.wanmiaoshu}}</el-input>
                  </template>
                </el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="xiayijian" label="下发人审查意见" width="178"></el-table-column>
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
                <el-table-column prop="interruptDelayRecord" label="工作间断延期报告" width="358">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      autosize
                      :readonly="!xiuTask"
                      placeholder="请输入内容"
                      v-model="interruptDelayRecord"
                    >{{scope.wanmiaoshu}}</el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="workSummaryReport" label="工作总结报告" width="358">
                  <template slot-scope="scope">
                    <el-input
                      type="textarea"
                      autosize
                      :readonly="!xiuTask"
                      v-model="workSummaryReport"
                    >{{scope.wanmiaoshu}}</el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-button v-if="xiuTask" @click="xiugai()">确定</el-button>
              <el-button @click="checkTask=false">返回</el-button>
            </el-dialog>

            <el-button
              type="text"
              size="small"
              @click="chakanClick(scope.row,'xiuTask')"
              :disabled="scope.row.quan[0]"
            >执行录入</el-button>

            <el-button
              type="text"
              size="small"
              @click="chakanClick(scope.row,'xiuTask')"
              :disabled="scope.row.quan[1]"
            >修改</el-button>

            <el-button
              type="text"
              size="small"
              @click="open(scope.row)"
              :disabled="scope.row.quan[2]"
            >执行</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        :page-size="5"
        layout="prev, pager, next"
        :total="countPage"
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
      fneArr: [],
      chakanForm: [{}],
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
      options: [],
      value: "",
      value2: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      countPage: null, // 页面总数
      tableData: [],
      tableData2: [],
      fixId: null,
      wanmiaoshu: "", //任务完成描述
      interruptDelayRecord: "", //工作间断延期报告
      workSummaryReport: "", // 工作总结报告
      checkTask: false,
      xiuTask: false
    };
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.chaxun(currentPage);
    },
    chaxun(currentPage) {
      var startTime = "1970/01/01";
      var endTime = "2050/01/01";

      if (this.value2) {
        startTime = this.value2[0];
        endTime = this.value2[1];
      }

      this.axios
        .get("/fix/getFixByConditions", {
          params: {
            currentPage: currentPage || 1,
            pageSize: this.pagesize,
            taskNo: this.input1,
            workFormId: this.value,
            userName: this.input2,
            startTime,
            endTime
          }
        })
        .then(res => {
          window.console.log(res);

          this.countPage = res.data.data.page.count;
          this.tableData = [];

          res.data.data.fix.forEach(item => {
            var data = {};

            data.taskNum = item.task.taskNo;
            data.taskName = item.task.taskName;
            data.workDocuments = item.workForm.workFormName;
            data.issuedPeople = item.task.users.userName;
            data.issuedDate = item.task.createDate;
            data.taskStatus = item.task.systemPropertiesValue.sysProValueName; // 任务状态

            data.quan = [true, true, true]; // 是否可用
            if (data.taskStatus == "执行中" || data.taskStatus == "已完成") {
              data.quan[0] = false;
            }
            if (data.taskStatus == "待分配" || data.taskStatus == "已分配") {
              data.quan[1] = false;
            }
            if (data.taskStatus == "已分配") {
              data.quan[2] = false;
            }

            data.completionTime = item.task.finishDate;
            item.task.isCancel == 1
              ? (data.isCancel = "是")
              : (data.isCancel = "否");

            data.fixId = item.fixId;

            this.tableData.push(data);
          });
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    chakanClick(row, xiuTask) {
      xiuTask ? (this.xiuTask = true) : (this.xiuTask = false);

      this.fixId = row.fixId;

      this.axios
        .get("/fix/getfixpolebyfixid", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res.data);
          this.chakanForm = [{}];
          this.tableData2 = [];

          var mydata = res.data.data.fix;

          this.chakanForm[0].taskNum = mydata.task.taskNo; // 任务编号
          this.chakanForm[0].taskName = mydata.task.taskName; //任务名称
          this.chakanForm[0].taskStatus =
            mydata.task.systemPropertiesValue.sysProValueName; // 任务状态

          this.chakanForm[0].workDocuments = mydata.workForm.workFormName; // 工作单据
          this.chakanForm[0].issuedPeople = mydata.task.users.userName; // 下发人
          this.chakanForm[0].issuedDate = mydata.task.createDate; // 下发时间

          this.chakanForm[0].fuzheren = mydata.users.userName; // 任务负责人
          this.chakanForm[0].miaoshu = mydata.task.taskNote; // 任务描述

          // 消缺人
          this.chakanForm[0].xiaoqueren = "";
          res.data.data.user.forEach(item2 => {
            this.chakanForm[0].xiaoqueren += item2.userName + " ";
          });

          this.chakanForm[0].xiaoqueTime = mydata.task.finishDate; // 消缺时间
          this.chakanForm[0].fuzheyijian = mydata.headUserOpinion; // 负责人意见
          this.wanmiaoshu = mydata.accomplishDescribe; // 完成情况描述
          this.chakanForm[0].xiayijian = mydata.createUserOpinion; // 下发人审查意见

          this.interruptDelayRecord = mydata.interruptDelayRecord; //中断记录
          this.workSummaryReport = mydata.workSummaryReport; //延期记录

          res.data.data.poles.forEach((item, index) => {
            var data = {};
            data.lineNum = res.data.data.circuitries[index].circuitryNo; //  线路编号
            data.poleNum = item.damageRecord.pole.poleNo; //杆塔编号
            data.defectLevels = item.damageRecord.defectsLevel; //缺陷等级
            data.defectTypes = item.damageRecord.defects.defectsName; //缺陷类型
            data.defectDes = item.damageRecord.defectsDescribe; //缺陷描述
            data.quot = item.damageRecord.users.userName; //发现人
            data.findTime = item.damageRecord.findDate; //发现时间

            this.tableData2.push(data);
          });

          this.checkTask = true;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    open(scope) {
      this.fixId = scope.fixId;

      this.$confirm("确定执行", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var userId = sessionStorage.getItem("userId");
          this.axios
            .get(`/fix/executetask?fixId=${this.fixId}&userId=${userId}`)
            .then(res => {
              window.console.log(res);

              if ( res.data.code == 201) {
                this.$confirm("您没有排到此任务", "提示", {
                   confirmButtonText: "确定",
                   type: "error"
                });
                              
              }
              else{
                this.$message({
                type: "success",
                message: "执行成功!"
                });
               this.chaxun(this.currentPage)
              }

            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消执行"
          });
        });
    },
    danju() {
      this.axios.get("/fix/getallworkform").then(res => {
        res.data.data.workForms.forEach(item => {
          var newDanju = {};
          newDanju.value = item.workFormId;
          newDanju.label = item.workFormName;
          this.options.push(newDanju);
        });
      });
    }
  },
  created: function() {
    this.danju();
    this.chaxun();
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

.wb_chakan {
  padding-right: 10px;
}
.el-tabs__item {
  font-size: 18px;
}
</style>
