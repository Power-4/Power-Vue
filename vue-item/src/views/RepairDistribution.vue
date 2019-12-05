<template>
  <div class="repairdistribution">
    <!-- 任务制定页面 -->
    <div class="zhiding">
      <!-- 任务编号和工作单据 -->
      <el-row class="input-1">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            任务编号:
            <el-input size="small" placeholder="请输入内容" v-model="input1" clearable class="work-num"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            任务名称:
            <el-input
              size="small"
              placeholder="请输入内容"
              v-model="taskName"
              clearable
              class="work-num"
            ></el-input>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            任务状态:
            <el-select size="small" v-model="statusValue" placeholder="请选择" class="work-danju">
              <el-option
                v-for="item in options1"
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
              format="yyyy/MM/dd"
              v-model="createTime"
              type="date"
              placeholder="选择日期"
              class="time"
            ></el-date-picker>-
            <el-date-picker
              format="yyyy/MM/dd"
              v-model="endTime"
              type="date"
              placeholder="选择日期"
              class="time"
            ></el-date-picker>
          </div>
        </el-col>
        <el-button type="primary" class="repair-query" @click="selectByFind()">查询</el-button>
        <el-button type="primary" icon="el-icon-edit" class="repair-add" @click="addXiao()">制定消缺任务</el-button>

        <!-- 模态框 -->
        <el-dialog title="制定消缺任务" :visible.sync="dialogFormVisible">
          <div style="width:100%; height:700px;">
            <el-form
              class="zhidingMotai"
              size="mini"
              :inline="true"
              label-position="left"
              ref="form"
              :model="form"
              label-width="86px"
              style="height:40%"
            >
              <!-- 任务编码制定 -->
              <el-form-item label="任务编码:">
                <p>{{getTaskNum()}}</p>
              </el-form-item>

              <!-- 任务名称制定 -->
              <el-form-item label="任务名称:">
                <el-input v-model="form.taskName"></el-input>
              </el-form-item>

              <!-- 工作单据制定 -->
              <el-form-item label="工作单据:">
                <el-select v-model="value1" placeholder="请选择工作单据">
                  <el-option
                    v-for="item in workDan"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 任务负责人选择 -->
              <el-form-item label="任务负责人:">
                <el-select v-model="form.taskLeader" placeholder="请选择任务负责人">
                  <el-option
                    v-for="item in taskLeader"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- 下发人 -->
              <el-form-item label="下发人:">
                <el-input v-model="form.issuedPeople"></el-input>
              </el-form-item>

              <!-- 下发时间 -->
              <el-form-item label="下发时间:">
                <el-col :span="24">
                  <p>{{getTime()}}</p>
                </el-col>
              </el-form-item>

              <!-- 任务描述 -->
              <el-form-item label="任务描述:">
                <el-input type="textarea" v-model="form.taskDescription"></el-input>
              </el-form-item>

              <!-- 任务备注 -->
              <el-form-item label="任务备注:">
                <el-input type="textarea" v-model="form.taskNote"></el-input>
              </el-form-item>

              <!-- 任务消缺员 -->
              <el-form-item label="消缺员:">
                <el-table
                  @selection-change="changeFun"
                  height="100"
                  :data="xiaoPeople"
                  border
                  style="width: 100%"
                  size="mini"
                >
                  <el-table-column type="selection" width="40"></el-table-column>
                  <el-table-column prop="id" label="消缺员id" width="100"></el-table-column>
                  <el-table-column prop="name" label="消缺员" width="180"></el-table-column>
                </el-table>
              </el-form-item>

              <!--  -->
            </el-form>
            <!-- 添加缺陷按钮 -->
            <!-- <el-button type="primary" size="small">添加缺陷</el-button> -->
            <!-- 缺陷列表 -->
            选择缺陷：
            <el-table
              lazy
              v-infinite-scroll="load"
              height="250"
              @selection-change="fixchangeFun"
              ref="multipleTable"
              :data="tableData2"
              tooltip-effect="dark"
              style="width: 100%"
              size="mini"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="deId" label="id" width="48"></el-table-column>
              <el-table-column prop="lineNum" label="线路编号" width="70"></el-table-column>
              <el-table-column prop="poleNum" label="塔杆编号" width="70"></el-table-column>
              <el-table-column prop="defectLevels" label="缺陷等级" width="50"></el-table-column>
              <el-table-column prop="defectTypes" label="缺陷类型" width="80"></el-table-column>
              <el-table-column prop="defectDes" label="缺陷描述" width="100"></el-table-column>
              <el-table-column prop="quot" label="发现人" width="85"></el-table-column>
              <el-table-column prop="findTime" label="发现时间" width="100"></el-table-column>
              <el-table-column prop="defectCaozuo" label="操作" width="75">
                <el-button type="text" size="mini" @click="open()">取消</el-button>
              </el-table-column>
            </el-table>
            <!-- 确认制定按钮 -->
            <el-button type="primary" class="addXiaoQueren" @click="addTaskCofim()">确认制定消缺任务</el-button>
          </div>
        </el-dialog>
      </el-row>

      <!-- 下方表格 -->
      <el-table :data="tableData" border style="width: 100%" size="small">
        <el-table-column prop="fixId" label="id" width="40" v-if="false"></el-table-column>
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
                <el-table-column prop="taskLeader" label="任务负责人" width="178"></el-table-column>
                <el-table-column prop="taskDescription" label="任务描述" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="fixuser" label="消缺员" width="178"></el-table-column>
                <el-table-column prop="fixDate" label="消缺时间" width="178"></el-table-column>
                <el-table-column prop="leaderOption" label="负责人审查意见" width="178"></el-table-column>
                <el-table-column prop label="完成情况描述" width="178"></el-table-column>
              </el-table>

              <el-table :data="chakanForm" border style="width: 99%" size="small">
                <el-table-column prop="issuedOption" label="下发人审查意见" width="178"></el-table-column>
              </el-table>

              <p>缺陷列表:</p>
              <el-table
                :data="tableData3"
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

            <el-button
              type="text"
              size="small"
              @click="fenClick(scope.row)"
              :disabled="scope.row.isCancel == '是'?true:(scope.row.taskStatus == '审核中'?true:(scope.row.taskStatus == '驳回'?true:false))"
            >分配任务</el-button>

            <!-- 分配任务时的模态框 -->
            <el-dialog title="分配任务" :visible.sync="fenTask">
              <el-transfer v-model="fneValue" :data="fneArr"></el-transfer>
              <el-button type="primary" class="fenCofim" @click="fenCofirm()">确认分配</el-button>
            </el-dialog>
            <el-button
              v-if="scope.row.taskStatus == '审核中'"
              type="text"
              size="small"
              @click="shenClick(scope.row)"
              :disabled="scope.row.taskStatus == '已完成'?true:(scope.row.taskStatus == '驳回'?true:false)"
            >审核</el-button>
            <el-button
              v-else
              type="text"
              size="small"
              @click="xiuClick(scope.row)"
              :disabled="scope.row.isCancel == '是'?true:(scope.row.taskStatus == '审核中'?true:(scope.row.taskStatus == '驳回'?true:false))"
            >修改</el-button>

            <!-- 审查时的模态框 -->
            <el-dialog title="任务审查" :visible.sync="shenTask">
              <!-- 第一列表格 -->
              <el-table :data="shenTable1" border style="width: 100%" size="mini">
                <el-table-column prop="taskNum" label="任务编码" width="180"></el-table-column>
                <el-table-column prop="taskName" label="任务名称" width="180"></el-table-column>
                <el-table-column prop="taskStatus" label="任务状态"></el-table-column>
                <el-table-column prop="workDocuments" label="工作单据"></el-table-column>
              </el-table>

              <!-- 第二列表格 -->
              <el-table :data="shenTable1" border style="width: 100%" size="mini">
                <el-table-column prop="issuedPeople" label="下发人" width="180"></el-table-column>
                <el-table-column prop="issuedDate" label="下发时间" width="180"></el-table-column>
                <el-table-column prop="taskLeader" label="负责人"></el-table-column>
                <el-table-column prop="taskDescription" label="任务描述"></el-table-column>
              </el-table>

              <!-- 第三列表格 -->
              <el-table :data="shenTable1" border style="width: 100%" size="mini">
                <el-table-column prop="eliminateVacancies" label="消缺员" width="180"></el-table-column>
                <el-table-column prop="fixDate" label="任务完成时间" width="180"></el-table-column>
                <el-table-column prop="wanDes" label="完成情况描述"></el-table-column>
              </el-table>

              <!-- 审查意见 -->
              <el-form ref="form" :model="shenform" label-width="80px" size="mini">
                <el-form-item label="下发人意见">
                  <el-input type="textarea" v-model="shenform.yijian1" :disabled="issuedShen"></el-input>
                </el-form-item>

                <el-form-item label="负责人意见">
                  <el-input type="textarea" v-model="shenform.yijian2" :disabled="leaderShen"></el-input>
                </el-form-item>
              </el-form>
              <!-- 是否通过 -->
              下发人审核是否通过:
              <el-select v-model="value" placeholder="请选择" size="mini" :disabled="shenStatus">
                <el-option
                  v-for="item in isPass"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <!-- 缺陷信息列表 -->
              <el-table :data="fixList" border style="width: 100%" size="mini" height="150">
                <el-table-column prop="lineNum" label="线路编号" width="70"></el-table-column>
                <el-table-column prop="poleNum" label="塔杆编号" width="70"></el-table-column>
                <el-table-column prop="defectLevels" label="缺陷等级" width="50"></el-table-column>
                <el-table-column prop="defectTypes" label="缺陷类型" width="100"></el-table-column>
                <el-table-column prop="defectDes" label="缺陷描述" width="100"></el-table-column>
                <el-table-column prop="quot" label="发现人" width="85"></el-table-column>
                <el-table-column prop="findTime" label="发现时间" width="100"></el-table-column>
              </el-table>

              <!-- 确认审核按钮 -->
              <el-button
                type="primary"
                class="shenCofim"
                @click="shenCofim()"
                :disabled="shenCofimBtn"
              >确认</el-button>
            </el-dialog>

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
                    <el-select v-model="xiuForm.workDocuments" placeholder="请选择工作单据">
                      <el-option
                        v-for="item in options4"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <!-- 任务负责人修改 -->
                  <el-form-item label="任务负责人:">
                    <el-select v-model="xiuForm.taskLeader" placeholder="请选择任务负责人">
                      <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
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
                    <el-table
                      @selection-change="changeFun"
                      height="100"
                      :data="xiuxiaoPeople"
                      border
                      style="width: 100%"
                      size="mini"
                    >
                      <el-table-column type="selection" width="40"></el-table-column>
                      <el-table-column prop="id" label="消缺员id" width="100"></el-table-column>
                      <el-table-column prop="name" label="消缺员" width="180"></el-table-column>
                    </el-table>
                  </el-form-item>

                  <!--  -->
                </el-form>
                <!-- 添加缺陷按钮 -->
                <el-table
                  class="xiuTable"
                  lazy
                  v-infinite-scroll="load"
                  height="150"
                  @selection-change="fixchangeFun"
                  ref="multipleTable"
                  :data="tableDataXiu"
                  tooltip-effect="dark"
                  style="width: 100%"
                  size="mini"
                >
                  <el-table-column type="selection" width="40"></el-table-column>
                  <el-table-column prop="deId" label="id" width="48"></el-table-column>
                  <el-table-column prop="lineNum" label="线路编号" width="70"></el-table-column>
                  <el-table-column prop="poleNum" label="塔杆编号" width="70"></el-table-column>
                  <el-table-column prop="defectLevels" label="缺陷等级" width="50"></el-table-column>
                  <el-table-column prop="defectTypes" label="缺陷类型" width="80"></el-table-column>
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

            <el-button
              v-if="scope.row.isCancel == '是'?false:true"
              type="text"
              size="small"
              @click="open(scope.row)"
              :disabled="scope.row.taskStatus == '待分配'?false:(scope.row.taskStatus == '已分配'?false:true)"
            >取消</el-button>
            <el-button
              v-else
              type="text"
              size="small"
              @click="open2(scope.row)"
              
            >开启</el-button>

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
  name: "repair",
  data() {
    return {
      xiaoList: ["消缺员1"],
      selectXuan: false,
      fneValue: [],
      fneArr: [],
      chakanForm: [],
      xiuForm: {
        taskName: "",
        workDocuments: "",
        taskLeader: "",
        issuedPeople: "",
        issuedDate: "",
        taskDescription: "",
        taskNote: "",
        eliminateVacancies: ""
      },
      shenform: {},
      xiaoPeople: [],
      xiuxiaoPeople: [],
      form: {
        taskName: "",
        workDocuments: "",
        taskLeader: "",
        issuedPeople: "",
        taskDescription: "",
        taskNote: "",
        eliminateVacancies: ""
      },
      activeName: "first",
      input1: "",
      input2: "",
      taskName: "",
      value1: "",

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
      workDan: [
        {
          value: 1,
          label: "抬头单据"
        },
        {
          value: 2,
          label: "银行票据"
        },
        {
          value: 3,
          label: "邮递单据"
        }
      ],
      taskLeader: [],
      options1: [
        {
          value: 1,
          label: "待分配"
        },
        {
          value: 2,
          label: "已分配"
        },
        {
          value: 3,
          label: "执行中"
        },
        {
          value: 4,
          label: "审核中"
        },
        {
          value: 5,
          label: "已完成"
        },
        {
          value: 6,
          label: "驳回"
        }
      ],
      isPass: [
        {
          value: 1,
          label: "通过"
        },
        {
          value: 0,
          label: "不通过"
        }
      ],
      options3: [],
      options4: [
        {
          value: 1,
          label: "抬头发票"
        },
        {
          value: 2,
          label: "银行票据"
        },
        {
          value: 3,
          label: "邮递单据"
        }
      ],
      multipleSelection: [],
      fixSelection: [],
      value: "",
      statusValue: "",
      createTime: "",
      endTime: "",
      fixId: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      countPage: "",
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableDataXiu: [],
      fixList: [], //审查时缺陷列表
      shenTable1: [], //审查时表格
      dialogFormVisible: false,
      checkTask: false,
      xiuTask: false,
      fenTask: false,
      shenTask: false,
      isCofim: true,
      issuedShen: true,
      leaderShen: true,
      shenStatus: true,
      shenCofimBtn: false,
      issuedId: "",
      mangerId: "",
      checkList: []
    };
  },
  methods: {
    load() {
      window.console.log("到底了");
    },
    fixchangeFun(val) {
      this.fixSelection = val.map(function(item) {
        return item.deId;
      }); // 返回的是选中的列的数组集合
      window.console.log(this.fixSelection.join(","));
    },
    shenCofim() {
      window.console.log(this.shenform);
      window.console.log(this.value);
      window.console.log(this.fixId);

      window.console.log(this.issuedId);
      window.console.log(this.mangerId);
      //发送确认请求
      if (10000004 == this.issuedId) {
        this.axios
          .get("/creatAuditTask", {
            params: {
              fixId: this.fixId,
              createUserOpinion: this.shenform.yijian1,
              passAudit: this.value
            }
          })
          .then(res => {
            window.console.log(res);
          })
          .catch(err => {
            window.console.log(err);
          });
      } else if (10000004 == this.mangerId) {
        this.axios
          .get("/manageAuditTask", {
            params: {
              fixId: this.fixId,
              headUserOpinion: this.shenform.yijian2
            }
          })
          .then(res => {
            window.console.log(res);
          })
          .catch(err => {
            window.console.log(err);
          });
      } else if (10000004 == this.mangerId && 10000003 == this.issuedId) {
        this.axios
          .get("/cbossAuditTask", {
            params: {
              fixId: this.fixId,
              createUserOpinion: this.shenform.yijian1,
              headUserOpinion: this.shenform.yijian2,
              passAudit: this.value
            }
          })
          .then(res => {
            window.console.log(res);
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    },
    changeFun(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id;
      }); // 返回的是选中的列的数组集合
      window.console.log(this.multipleSelection.join(","));
    },
    getTime: function() {
      var str = "";
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      month = month > 10 ? month : "0" + month;
      day = day > 10 ? day : "0" + day;

      str += year + "/" + month + "/" + day;
      this.form.createDate = str;
      return str;
    },
    getTaskNum: function() {
      var str = "";
      var date = Date.parse(new Date());

      str += "RXQ" + date;
      this.form.taskNum = str.substr(0, 13);
      return str.substr(0, 13);
    },
    selectByFind: function() {
      if (this.statusValue == "待分配") {
        this.statusValue = 1;
      } else if (this.statusValue == "已分配") {
        this.statusValue = 2;
      } else if (this.statusValue == "执行中") {
        this.statusValue = 3;
      } else if (this.statusValue == "审核中") {
        this.statusValue = 4;
      } else if (this.statusValue == "已完成") {
        this.statusValue = 5;
      } else if (this.statusValue == "驳回") {
        this.statusValue = 6;
      } else if (this.statusValue == "") {
        this.statusValue = -1;
      }
      this.axios
        .get("/selectFixTaskByFind", {
          params: {
            currentPage: 1,
            pageSize: 5,
            taskNo: this.input1,
            taskName: this.taskName,
            userName: this.input2,
            sysProValueId: this.statusValue,
            startDate: this.createTime,
            endDate: this.endTime
          }
        })
        .then(res => {
          window.console.log(res.data.data.count);
          this.countPage = res.data.data.count;
          var work = res.data.data.fix.map(function(item) {
            return item.workForm.workFormName;
          });
          var fix = res.data.data.fix.map(function(item) {
            return item.fixId;
          });
          // window.console.log(work);
          // window.console.log(fix)
          var taskArr = res.data.data.fix.map(function(item) {
            return item.task;
          });
          // window.console.log(taskArr);
          var newArr = taskArr.map(function(item) {
            return {
              taskNum: item.taskNo,
              taskName: item.taskName,
              issuedPeople: item.users.userName,
              issuedDate: item.createDate,
              taskStatus: item.systemPropertiesValue.sysProValueName,
              completionTime: item.finishDate,
              isCancel: item.isCancel
            };
          });
          // window.console.log(newArr);
          for (var i = 0; i < newArr.length; i++) {
            newArr[i].workDocuments = work[i];
            newArr[i].fixId = fix[i];
          }
          this.tableData = newArr.map(function(item) {
            return item;
          });
          for (var j = 0; j < this.tableData.length; j++) {
            if (this.tableData[j].isCancel == 1) {
              this.tableData[j].isCancel = "否";
            } else if (this.tableData[j].isCancel == 0) {
              this.tableData[j].isCancel = "是";
            }
          }
          window.console.log(this.tableData);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      window.console.log(this.currentPage); //点击第几页
      this.axios
        .get("/selectFixTask", {
          params: {
            currentPage: this.currentPage,
            pageSize: 5
          }
        })
        .then(res => {
          window.console.log(res);
          var work = res.data.data.fix.map(function(item) {
            return item.workForm.workFormName;
          });
          var fix = res.data.data.fix.map(function(item) {
            return item.fixId;
          });
          // window.console.log(work);
          // window.console.log(fix)
          var taskArr = res.data.data.fix.map(function(item) {
            return item.task;
          });
          // window.console.log(taskArr);
          var newArr = taskArr.map(function(item) {
            return {
              taskNum: item.taskNo,
              taskName: item.taskName,
              issuedPeople: item.users.userName,
              issuedDate: item.createDate,
              taskStatus: item.systemPropertiesValue.sysProValueName,
              completionTime: item.finishDate,
              isCancel: item.isCancel
            };
          });
          // window.console.log(newArr);
          for (var i = 0; i < newArr.length; i++) {
            newArr[i].workDocuments = work[i];
            newArr[i].fixId = fix[i];
          }
          this.tableData = [];
          this.tableData = newArr.map(function(item) {
            return item;
          });
           for (var j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].isCancel == 1) {
            this.tableData[j].isCancel = "否";
          } else if (this.tableData[j].isCancel == 0) {
            this.tableData[j].isCancel = "是";
          }
        }
          window.console.log(this.tableData);
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    chakanClick(row) {
      window.console.log(row.fixId);
      //发送查看请求
      this.axios
        .get("/selectFixTaskByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          this.checkTask = true;
          // 绑定数据
          var newArr = [];
          newArr.push(res.data.data.fix);
          var first = newArr.map(function(item) {
            return {
              taskNum: item.task.taskNo,
              taskName: item.task.taskName,
              taskStatus: item.task.systemPropertiesValue.sysProValueName,
              workDocuments: item.workForm.workFormName,
              issuedPeople: item.task.users.userName,
              issuedDate: item.task.createDate,
              taskLeader: item.users.userName,
              taskDescription: item.task.taskDescribe,
              fixDate: item.task.finishDate,
              leaderOption: item.headUserOpinion,
              issuedOption: item.createUserOpinion
            };
          });
          this.chakanForm = first.map(function(item) {
            return item;
          });
          window.console.log(this.chakanForm);
          // 绑定消缺员数据
          var fixUser = res.data.data.fixUser.map(function(item) {
            return item.userName;
          });
          this.chakanForm[0].fixuser = fixUser.join(",");
          window.console.log(this.chakanForm[0]);
        })
        .catch(err => {
          window.console.log(err);
        });

      // 查看当前任务缺陷
      this.axios
        .get("/selectPoleDamageByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          var newQue = res.data.data.damageRecord.map(function(item) {
            return {
              deId: item.damageRecordId,
              lineNum: item.pole.circuitry.circuitryNo,
              poleNum: item.pole.poleNo,
              defectLevels: item.defectsLevel,
              defectTypes: item.defects.defectsName,
              defectDes: item.defectsDescribe,
              quot: item.users.userName,
              findTime: item.findDate
            };
          });
          window.console.log(newQue);
          this.tableData3 = newQue.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    fenClick(row) {
      this.fenTask = true;
      window.console.log(row.fixId);
      this.fixId = row.fixId;
      //获取所有消缺员
      // this.axios
      //   .get("http://192.168.6.184:8080/selectAllFixUser")
      //   .then(res => {
      //     window.console.log(res);
      // var fixUserList = res.data.data.users.map(function(item) {
      //   return {
      //     key: item.userId,
      //     label: item.userName,
      //     disabled: false
      //   };
      // });
      // this.fneArr = fixUserList.map(function(item) {
      //   return item;
      // });
      // window.console.log(this.fneArr);
      //   })
      //   .catch(err => {
      //     window.console.log(err);
      //   });

      this.axios
        .get("/selectWaitFixUserByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          var fixUserList = res.data.data.users.map(function(item) {
            return {
              key: item.userId,
              label: item.userName,
              disabled: false
            };
          });
          this.fneArr = fixUserList.map(function(item) {
            return item;
          });
          window.console.log(this.fneArr);
        })
        .catch(err => {
          window.console.log(err);
        });
      // 查询对应的消缺员

      this.axios
        .get("/selectFixUserByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          this.fneValue = res.data.data.users.map(function(item) {
            return item.userId;
          });
          window.console.log(this.fneValue);

          var selectFix = res.data.data.users.map(function(item) {
            return {
              key: item.userId,
              label: item.userName,
              disabled: false
            };
          });

          for (var k = 0; k < selectFix.length; k++) {
            this.fneArr.push(selectFix[k]);
          }
          window.console.log(this.fneArr);
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    fenCofirm() {
      // 确认分配任务
      window.console.log(this.fneValue);
      var fixUserId = this.fneValue.join(",");
      window.console.log(fixUserId);
      this.axios
        .get("/updateTaskUserRelation", {
          params: {
            fixId: this.fixId,
            fixUserId: fixUserId
          }
        })
        .then(res => {
          window.console.log(res);
          // this.fenTask = false;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    xiuClick(row) {
      this.xiuTask = true;
      window.console.log(row.fixId);

      //发送查看请求
      this.fixId = row.fixId;
      this.axios
        .get("/selectFixTaskByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          // 绑定数据
          var newArr = [];
          newArr.push(res.data.data.fix);
          var first = newArr.map(function(item) {
            return {
              taskNum: item.task.taskNo,
              taskName: item.task.taskName,
              workDocuments: item.workForm.workFormName,
              issuedPeople: item.task.users.userName,
              issuedDate: item.task.createDate,
              taskLeader: item.users.userName,
              taskDescription: item.task.taskDescribe,
              taskNote: item.task.taskNote
            };
          });
          this.xiuForm = first[0];
          window.console.log(first);
        })
        .catch(err => {
          window.console.log(err);
        });
      // 获取任务负责人（线路管理员）

      this.axios
        .get("/selectAllLineUser")
        .then(res => {
          var newLeader = res.data.data.users.map(function(item) {
            return {
              value: item.userId,
              label: item.userName
            };
          });
          this.options3 = newLeader.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });

      // 获取所有的消缺管理员
      this.axios
        .get("/selectAllFixUser")
        .then(res => {
          window.console.log(res.data.data.users);
          var newXiao = res.data.data.users.map(function(item) {
            return {
              name: item.userName,
              id: item.userId
            };
          });
          // window.console.log(newXiao);

          this.xiuxiaoPeople = newXiao.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });

      // 查询缺陷表
      // this.axios
      //   .get("http://192.168.6.184:8080/selectPoleDamage")
      //   .then(res => {
      //     window.console.log(res.data.data.damageRecord);
      //     var newQue = res.data.data.damageRecord.map(function(item) {
      //       return {
      //         deId: item.damageRecordId,
      //         lineNum: item.pole.circuitry.circuitryNo,
      //         poleNum: item.pole.poleNo,
      //         defectLevels: item.defectsLevel,
      //         defectTypes: item.defects.defectsName,
      //         defectDes: item.defectsDescribe,
      //         quot: item.users.userName,
      //         findTime: item.findDate
      //       };
      //     });
      //     window.console.log(newQue[0]);
      //     加入缺陷表中;
      //     this.tableDataXiu = newQue.map(function(item) {
      //       return item;
      //     });
      //   })
      //   .catch(err => {
      //     window.console.log(err);
      //   });
    },
    shenClick(row) {
      
      this.shenTask = true;
      // window.console.log(row.fixId);
      //发送查看请求
      this.fixId = row.fixId;
      this.axios
        .get("/selectFixTaskByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          this.issuedId = res.data.data.fix.task.users.userId;
          this.mangerId = res.data.data.fix.users.userId;

          if (10000004 == res.data.data.fix.task.users.userId) {
            this.issuedShen = false;
            this.shenStatus = false;
          } else if (10000004 == res.data.data.fix.users.userId) {
            this.leaderShen = false;
          } else if (
            10000004 == res.data.data.fix.users.userId &&
            10000004 == res.data.data.fix.task.users.userId
          ) {
            this.issuedShen = false;
            this.leaderShen = false;
            this.shenStatus = false;
          }

          // 绑定数据
          var newArr = [];
          newArr.push(res.data.data.fix);
          var first = newArr.map(function(item) {
            return {
              taskNum: item.task.taskNo,
              taskName: item.task.taskName,
              taskStatus: item.task.systemPropertiesValue.sysProValueName,
              workDocuments: item.workForm.workFormName,
              issuedPeople: item.task.users.userName,
              issuedDate: item.task.createDate,
              taskLeader: item.users.userName,
              taskDescription: item.task.taskDescribe,
              fixDate: item.task.finishDate,
              wanDes: item.accomplishDescribe
            };
          });
          var leader = newArr.map(function(item) {
            return item.headUserOpinion;
          });
          this.shenform.yijian2 = leader.join("");
          window.console.log(this.shenform.yijian2);
          if(this.shenform.yijian2 == "") {
             this.issuedShen = true;
             this.shenCofimBtn = true;
          }
          window.console.log(first);
          this.shenTable1 = first.map(function(item) {
            return item;
          });
          // window.console.log(this.chakanForm);
          // 绑定消缺员数据
          var fixUser = res.data.data.fixUser.map(function(item) {
            return item.userName;
          });
          this.shenTable1[0].eliminateVacancies = fixUser.join(",");
          // window.console.log(this.chakanForm[0]);
        })
        .catch(err => {
          window.console.log(err);
        });

      // 查看当前任务缺陷
      this.axios
        .get("/selectPoleDamageByFixId", {
          params: {
            fixId: row.fixId
          }
        })
        .then(res => {
          window.console.log(res);
          var newQue = res.data.data.damageRecord.map(function(item) {
            return {
              deId: item.damageRecordId,
              lineNum: item.pole.circuitry.circuitryNo,
              poleNum: item.pole.poleNo,
              defectLevels: item.defectsLevel,
              defectTypes: item.defects.defectsName,
              defectDes: item.defectsDescribe,
              quot: item.users.userName,
              findTime: item.findDate
            };
          });
          // window.console.log(newQue);
          this.fixList = newQue.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    open(row) {
      window.console.log(row.fixId);
      this.$confirm("此操作将取消该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送取消请求
          this.axios
            .get("/updateTaskIsCancel", {
              params: {
                fixId: row.fixId
              }
            })
            .then(res => {
              window.console.log(res);
              // this.init();
            })
            .catch(err => {
              window.console.log(err);
            });
          this.$message({
            type: "success",
            message: "取消成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    open2(row) {
      window.console.log(row.fixId);
      this.$confirm("此操作将开启该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送开启请求
          this.axios
            .get("/startTaskIsCancel", {
              params: {
                fixId: row.fixId
              }
            })
            .then(res => {
              window.console.log(res);
              // this.init();
            })
            .catch(err => {
              window.console.log(err);
            });
          this.$message({
            type: "success",
            message: "开启成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    addXiao() {
      this.dialogFormVisible = true;
      // 获取任务负责人（线路管理员）

      this.axios
        .get("/selectAllLineUser")
        .then(res => {
          var newLeader = res.data.data.users.map(function(item) {
            return {
              value: item.userId,
              label: item.userName
            };
          });
          this.taskLeader = newLeader.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });
      // 获取所有的消缺管理员
      this.axios
        .get("/selectAllFixUser")
        .then(res => {
          window.console.log(res.data.data.users);
          var newXiao = res.data.data.users.map(function(item) {
            return {
              name: item.userName,
              id: item.userId
            };
          });
          // window.console.log(newXiao);

          this.xiaoPeople = newXiao.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });

      // 查询缺陷表
      this.axios
        .get("/selectPoleDamage")
        .then(res => {
          // window.console.log(res.data.data.damageRecord);
          var newQue = res.data.data.damageRecord.map(function(item) {
            return {
              deId: item.damageRecordId,
              lineNum: item.pole.circuitry.circuitryNo,
              poleNum: item.pole.poleNo,
              defectLevels: item.defectsLevel,
              defectTypes: item.defects.defectsName,
              defectDes: item.defectsDescribe,
              quot: item.users.userName,
              findTime: item.findDate
            };
          });
          window.console.log(newQue[0]);
          // 加入缺陷表中;
          this.tableData2 = newQue.map(function(item) {
            return item;
          });
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    addTaskCofim() {
      // 确认添加新项目
      window.console.log(this.form);
      window.console.log(this.value1);
      window.console.log(this.form.taskLeader);
      this.axios
        .get("/addFixTask", {
          params: {
            taskNo: this.form.taskNum,
            taskName: this.form.taskName,
            userId: 10000003,
            createDate: this.form.createDate,
            taskNote: this.form.taskNote,
            taskDescribe: this.form.taskDescription,
            workFormId: this.value1,
            damageRecordId: this.fixSelection.join(","),
            fixUserId: this.multipleSelection.join(","),
            manageUserId: this.form.taskLeader
          }
        })
        .then(res => {
          window.console.log(res);
          this.form = {};
          this.dialogFormVisible = false;
          // this.init();
        })
        .catch(err => {
          window.console.log(err);
        });
    }
   
  },
  created: function() {
    this.axios
      .get("/selectFixTask", {
        params: {
          currentPage: this.currentPage,
          pageSize: 5
        }
      })
      .then(res => {
        window.console.log(res);
        this.countPage = res.data.data.count;
        var work = res.data.data.fix.map(function(item) {
          return item.workForm.workFormName;
        });
        var fix = res.data.data.fix.map(function(item) {
          return item.fixId;
        });
        // window.console.log(work);
        // window.console.log(fix)
        var taskArr = res.data.data.fix.map(function(item) {
          return item.task;
        });
        // window.console.log(taskArr);
        var newArr = taskArr.map(function(item) {
          return {
            taskNum: item.taskNo,
            taskName: item.taskName,
            issuedPeople: item.users.userName,
            issuedDate: item.createDate,
            taskStatus: item.systemPropertiesValue.sysProValueName,
            completionTime: item.finishDate,
            isCancel: item.isCancel
          };
        });
        // window.console.log(newArr);
        for (var i = 0; i < newArr.length; i++) {
          newArr[i].workDocuments = work[i];
          newArr[i].fixId = fix[i];
        }
        this.tableData = newArr.map(function(item) {
          return item;
        });
        for (var j = 0; j < this.tableData.length; j++) {
          if (this.tableData[j].isCancel == 1) {
            this.tableData[j].isCancel = "否";
          } else if (this.tableData[j].isCancel == 0) {
            this.tableData[j].isCancel = "是";
          }
        }
        window.console.log(this.tableData);
      })
      .catch(err => {
        window.console.log(err);
      });

    // this.axios
    //   .get("/selectAllWorkForm")
    //   .then(res => {
    //     window.console.log(res);
    //   })
    //   .catch(err => {
    //     window.console.log(err);
    //   });
  }
};
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}

.app-repair {
  width: 980px;
  height: 600px;
  float: right;
  margin-left: 20px;
}

.zhiding {
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
    height: 42px;
  }

  .repair-add {
    height: 42px;
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
  .time {
    width: 150px;
  }

  .shenCofim {
    margin-top: 15px;
    margin-left: 300px;
  }

  .xiuTable {
    margin-top: 20px;
  }
}

.el-tabs__item {
  font-size: 18px;
}
</style>