<template>
  <div class="RepairQuery">
    <!-- 消缺任务查询页面 -->
    <div class="query">
      <!--任务编号，任务状态，缺陷类型，缺陷级别  -->
      <el-row class="firstQuery">
        <!-- 任务编号框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            任务编号:
            <el-input size="mini" v-model="input" placeholder="请输入内容" class="queryKuang"></el-input>
          </div>
        </el-col>
        <!-- 任务状态框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            任务状态:
            <el-select size="mini" v-model="value" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 缺陷类型框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            缺陷类型:
            <el-select size="mini" v-model="value2" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 缺陷级别框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            缺陷级别:
            <el-select size="mini" v-model="value3" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <!-- 工作单据，下发时间 -->
      <el-row>
        <!-- 工作单据 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            工作单据:
            <el-select size="mini" v-model="value4" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 下发时间 -->
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            下发时间:
            <el-date-picker
              size="mini"
              class="timeKuang"
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>

        <!-- 查询按钮 -->
        <el-button type="primary" class="queryBtn">查询</el-button>
      </el-row>

      <!-- 缺陷表格 -->
      <el-table
        class="defectTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        size="mini"
      >
        <!-- 任务编号 -->
        <el-table-column prop="taskNum" label="任务编号" width="180"></el-table-column>
        <!-- 任务状态 -->
        <el-table-column prop="taskStatus" label="任务状态" width="180"></el-table-column>
        <!-- 工作单据 -->
        <el-table-column prop="workDocuments" label="工作单据" width="180"></el-table-column>
        <!-- 线路编号 -->
        <el-table-column prop="lineNum" label="线路编号" width="180"></el-table-column>
        <!-- 杆塔编号 -->
        <el-table-column prop="towerNum" label="杆塔编号" width="180"></el-table-column>
        <!-- 缺陷级别 -->
        <el-table-column prop="defectLevels" label="缺陷级别" width="180"></el-table-column>
        <!-- 缺陷类型 -->
        <el-table-column prop="defectTypes" label="缺陷类型" width="180"></el-table-column>
        <!-- 发现人 -->
        <el-table-column prop="quot" label="发现人" width="180"></el-table-column>
        <!-- 发现时间 -->
        <el-table-column prop="quotTime" label="发现时间" width="180"></el-table-column>
        <!-- 下发人 -->
        <el-table-column prop="issuedPeople" label="下发人" width="180"></el-table-column>
        <!-- 下发时间 -->
        <el-table-column prop="issuedTime" label="下发时间" width="180"></el-table-column>
        <!-- 完好率 -->
        <el-table-column prop="pipe" label="完好率" width="180"></el-table-column>
        <!-- 缺陷描述 -->
        <el-table-column prop="defectDes" label="缺陷描述" width="180"></el-table-column>
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
  name: "RepairQuery",
  data() {
    return {
      tableData: [
        {
          taskNum: 12397,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 16894,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 12994,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 12437,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 124874,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 14357,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 11476,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 17127,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 11378,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        },
        {
          taskNum: 17867,
          taskStatus: "已完成",
          workDocuments: "工作单",
          lineNum: 123457,
          towerNum: "t12054",
          defectLevels: "一般",
          defectTypes: "叉梁断裂",
          quot: "巡检员1号",
          quotTime: "2019/11/29",
          issuedPeople: "yhl",
          issuedTime: "2019/11/30",
          pipe: "90%",
          defectDes: "叉梁断裂"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "待分配"
        },
        {
          value: "选项2",
          label: "已分配"
        },
        {
          value: "选项3",
          label: "执行中"
        },
        {
          value: "选项4",
          label: "已完成"
        }
      ],
      value: "",
      options2: [
        {
          value: "选项1",
          label: "叉梁断裂"
        },
        {
          value: "选项2",
          label: "拦河线断裂"
        },
        {
          value: "选项3",
          label: "绝缘子爆破"
        },
        {
          value: "选项4",
          label: "杆塔倾斜"
        },
        {
          value: "选项5",
          label: "吊杆变形"
        },
        {
          value: "选项6",
          label: "其他"
        }
      ],
      value2: "",
      options3: [
        {
          value: "选项1",
          label: "一般"
        },
        {
          value: "选项2",
          label: "严重"
        },
        {
          value: "选项3",
          label: "紧急"
        }
      ],
      value3: "",
      input: "",
      options4: [
        {
          value: "选项1",
          label: "工作单"
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
      value4: "",
      date: "",
      currentPage: 1, //初始页
      pagesize: 5 //    每页的数据
    };
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      window.console.log(this.currentPage); //点击第几页
    }
  }
};
</script>

<style lang="less" scoped>
.queryKuang {
  width: 158px;
}
.timeKuang {
  width: 300px;
}

.firstQuery {
  margin-bottom: 20px;
}

.queryBtn {
  height: 28px;
  line-height: 0;
}

.pagination {
  float: right;
  margin-top: 10px;
}

.defectTable {
  margin-top: 20px;
}
</style>