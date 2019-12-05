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
            <el-select size="mini" v-model="id" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.sysProValueName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 缺陷类型框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            缺陷类型:
            <el-select size="mini" v-model="defectsId" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options2"
                :key="item.defectsId"
                :label="item.defectsName"
                :value="item.defectsId"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 缺陷级别框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple-light" >
            
             <label>缺陷级别：</label>
            <el-select v-model="value3"   class="queryKuang">
              <el-option value="一般">一般</el-option>
              <el-option value="紧急">紧急</el-option>
              <el-option value="严重">严重</el-option>
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
            <el-select size="mini" v-model="workFormId" placeholder="请选择" class="queryKuang">
              <el-option
                v-for="item in options4"
                :key="item.workFormId"
                :label="item.workFormName"
                :value="item.workFormId"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- 下发时间 -->
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            下发时间:
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" class="queryKuang"></el-date-picker>
          </div>
        </el-col>

        <!-- 查询按钮 -->
        <el-button type="primary" class="queryBtn" @click="find(ischeck=false)">查询</el-button>
      </el-row>

      <!-- 缺陷表格 -->
      <el-table class="defectTable" :data="tableData" style="width: 100%" size="mini">
        <!-- 任务编号 -->
        <el-table-column prop="taskNo" label="任务编号" width="85"></el-table-column>
        <!-- 任务状态 -->
        <el-table-column prop="sysProValueName" label="任务状态" width="85"></el-table-column>
        <!-- 工作单据 -->
        <el-table-column prop="workFormName" label="工作单据" width="85"></el-table-column>
        <!-- 线路编号 -->
        <el-table-column prop="circuitryNo" label="线路编号" width="85"></el-table-column>
        <!-- 杆塔编号 -->
        <el-table-column prop="poleNo" label="杆塔编号" width="85"></el-table-column>
        <!-- 缺陷级别 -->
        <el-table-column prop="defectsLevel" label="缺陷级别" width="85"></el-table-column>
        <!-- 缺陷类型 -->
        <el-table-column prop="defectsName" label="缺陷类型" width="85"></el-table-column>
        <!-- 发现人 -->
        <el-table-column prop="findusername" label="发现人" width="85"></el-table-column>
        <!-- 发现时间 -->
        <el-table-column prop="findDate" label="发现时间" width="85"></el-table-column>
        <!-- 下发人 -->
        <el-table-column prop="createUserName" label="下发人" width="85"></el-table-column>
        <!-- 下发时间 -->
        <el-table-column prop="createDate" label="下发时间" width="85"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="count"
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
      tableData: [],
      options: [],
      defectsId: "",
      value1: "",
      options2: [],
      id : "",
      options3: [],
      value3: "",
      input: "",
      options4: [],
      workFormId: "",
      date: "",
      count: null,
      ischeck:false,
      currentPage: 1, //初始页
      pagesize: 5 //    每页的数据
    };
  },
  methods: {
    handleCurrentChange: function(val) {
      window.console.log(val); //点击第几页
      if(this.ischeck == true) {
        window.console.log("chaxun",this.ischeck)
        this.axios
        .get("fix/selectallfix", {
          params: {
          userId:window.sessionStorage['userId'],
          taskNo: this.taskNo,
          taskState:this.id,
          defectsId: this.defectsId,
          defectsLevel:this.value3,
          workFormId:this.workFormId,
          startTime: this.value1==''?'1970/01/01':this.value1,
          pageSize: this.pagesize,
          currentPage: val,
        }
        })
        .then(res => {
          // window.console.log(res.data.data.fixs);
          this.tableData = res.data.data.fixs;
          this.count = res.data.data.page.count;
        })
        .catch(err => {
          window.console.log(err);
        });
      }else{
        window.console.log("chushi",this.ischeck)
        this.axios
        .get("fix/selectallfix", {
          params: {
            userId:window.sessionStorage['userId'],
            pageSize: this.pagesize,
            currentPage: val
          }
        })
        .then(res => {
          // window.console.log(res.data.data.fixs);
          this.tableData = res.data.data.fixs;
          this.count = res.data.data.page.count;
        })
        .catch(err => {
          window.console.log(err);
        });
      }
      
    },
    find() {
      this.ischeck=true
      // window.console.log(this.value3)
      this.axios
      .get("fix/selectallfix", {
        params: {
          userId:window.sessionStorage['userId'],
          taskNo: this.taskNo,
          taskState:this.id,
          defectsId: this.defectsId,
          defectsLevel:this.value3,
          workFormId:this.workFormId,
          startTime: this.value1==''?'1970/01/01':this.value1,
          pageSize: this.pagesize,
          currentPage: this.currentPage,
        }
      })
      .then(res => {
        window.console.log(res.data.data);
        this.tableData = res.data.data.fixs;
        this.count = res.data.data.page.count;
      })
      .catch(err => {
        window.console.log(err);
      });
    }
  },
  created() {
    this.axios.get("fix/selectallfix", {
        params: {
          pageSize: this.pagesize,
          currentPage: this.currentPage
        }
      })
      .then(res => {
        window.console.log("初始化",res.data);
        this.tableData = res.data.data.fixs;
        this.count = res.data.data.page.count;
      })
      .catch(err => {
        window.console.log(err);
      });

    this.axios.get("fix/getalltaskstate", {
      })
      .then(res => {
        window.console.log("任务状态",res.data);
        this.options = res.data.data.taskstate;
      })
      .catch(err => {
        window.console.log(err);
      });

    this.axios.get("fix/getalldefects", {
    })
    .then(res => {
      window.console.log("缺陷类型",res.data);
       this.options2 = res.data.data.defects;
    })
    .catch(err => {
      window.console.log(err);
    });

     this.axios.get("fix/getallfixlevel", {
    })
    .then(res => {
      window.console.log("缺陷级别",res.data);
      this.options3 = res.data.data.fixlevel;
    })
    .catch(err => {
      window.console.log(err);
    });

    this.axios.get("fix/getallworkform", {
    })
    .then(res => {
      window.console.log("工作单据",res.data);
      this.options4 = res.data.data.workForms
    })
    .catch(err => {
      window.console.log(err);
    });

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
  height: 40px;
}

.pagination {
  float: right;
  margin-top: 10px;
}

.defectTable {
  margin-top: 20px;
}
</style>