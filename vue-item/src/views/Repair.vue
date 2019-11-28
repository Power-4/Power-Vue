<template>
  <div class="app-repair">
    <div class="repair-nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="消缺任务制定与分配" name="first">
          <!-- 任务制定页面 -->
          <div class="zhiding">
            <!-- 任务编号和工作单据 -->
            <el-row class="input-1">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  任务编号:
                  <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="input1"
                    clearable
                    class="work-num"
                  ></el-input>
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
              <el-button type="primary" icon="el-icon-edit" class="repair-add" @click="dialogFormVisible = true">
                制定消缺任务
              </el-button>

              <!-- 模态框 -->
              <el-dialog title="制定消缺任务" :visible.sync="dialogFormVisible">
                <div>
                  我是制定消缺任务的模态框
                </div>
              </el-dialog>
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
                <el-button type="text">查看</el-button>
                <el-button type="text">分配任务</el-button>
                <el-button type="text">修改</el-button>
                <el-button type="text">取消</el-button>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              :page-size="5"
              background
              layout="prev, pager, next"
              :total="100"
              class="pagination"
            ></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="消缺任务执行与回执" name="second">
          <!-- 任务执行 -->
          <div class="zhixing">
            <!-- 任务编号和工作单据 -->
            <el-row class="input-1">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  任务编号:
                  <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="input1"
                    clearable
                    class="work-num"
                  ></el-input>
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
            <el-table :data="tableData" border style="width: 100%" size="small">
              <el-table-column prop="taskNum" label="任务编号" width="100"></el-table-column>
              <el-table-column prop="taskName" label="任务名称" width="150"></el-table-column>
              <el-table-column prop="workDocuments" label="工作单据" width="100"></el-table-column>
              <el-table-column prop="issuedPeople" label="下发人" width="100"></el-table-column>
              <el-table-column prop="issuedDate" label="下发时间" width="100"></el-table-column>
              <el-table-column prop="taskStatus" label="任务状态" width="100"></el-table-column>
              <el-table-column prop="completionTime" label="任务完成时间" width="100"></el-table-column>
              <el-table-column prop label="操作" width="229">
                <el-button type="text">查看</el-button>
                <el-button type="text">执行录入</el-button>
                <el-button type="text">执行</el-button>
                <el-button type="text">修改</el-button>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              :page-size="5"
              background
              layout="prev, pager, next"
              :total="100"
              class="pagination"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消缺查询" name="third"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "repair",
  data() {
    return {
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
      tableData: [
        {
          taskNum: "RW0245",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0245",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0245",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0245",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        },
        {
          taskNum: "RW0245",
          taskName: "任务巡检",
          workDocuments: "任务单",
          issuedPeople: "巡检员1号",
          issuedDate: "2019/11/27",
          taskStatus: "未完成",
          completionTime: "",
          isCancel: "否"
        }
      ],
      dialogFormVisible: false,
    };
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
    height: 32px;
  }

  .repair-add {
    height: 32px;
  }

  .pagination {
    float: right;
    margin-top: 10px;
  }

  // .is-leaf {
  //   height: 50px;
  // }
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

  // .is-leaf {
  //   height: 50px;
  // }
}

.el-tabs__item {
  font-size: 18px;
}
</style>