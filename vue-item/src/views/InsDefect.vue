<template>
  <div class="insdefect">
    <div class="search-box">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <el-input placeholder="请输入内容" v-model="taskNo" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
            <el-input placeholder="请输入内容" v-model="circuitryNo" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷类型：</label>
            <el-select v-model="defectsName" clearable placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷级别：</label>
            <el-select v-model="defectsLevel" clearable placeholder="请选择">
              <el-option
                v-for="item in levelOptions"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>发现时间：</label>
            <el-date-picker v-model="findStartDate" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <el-date-picker v-model="performStartDate" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="defectQuery" class="bg-color">查 询</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple bg-add">
            <el-button type="primary" @click="downloadExcel" class="bg-color">导出EXCEL</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe style="width: 100%">
      <el-table-column prop="taskNo" label="任务编号" align="center"></el-table-column>
      <el-table-column prop="circuitryNo" label="线路编号" align="center"></el-table-column>
      <el-table-column prop="poleNo" label="杆塔编号" align="center"></el-table-column>
      <el-table-column prop="defectsLevel" label="缺陷级别" align="center"></el-table-column>
      <el-table-column prop="defectsName" label="缺陷类型" align="center"></el-table-column>
      <el-table-column prop="findUser" label="发现人" align="center"></el-table-column>
      <el-table-column prop="findDate" label="发现时间" align="center"></el-table-column>
      <el-table-column prop="PerformUser" label="下发人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="下发时间" align="center"></el-table-column>
      <el-table-column prop="completionRate" label="完好率" align="center"></el-table-column>
      <el-table-column prop="defectDescribe" label="缺陷描述" align="center"></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination 
      layout="prev, pager, next"
      :total="tableData.length"
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
      title: "缺陷记录",
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      taskNo: "",
      circuitryNo: "",
      defectsName: "",
      typeOptions: [
        {
          id: 1,
          label: "叉梁断裂"
        },
        {
          id: 2,
          label: "拦河线断裂"
        },
        {
          id: 3,
          label: "绝缘子爆破"
        },
        {
          id: 4,
          label: "杆塔倾斜"
        },
        {
          id: 5,
          label: "吊杆变形"
        },
        {
          id: 6,
          label: "其他"
        }
      ],
      defectsLevel: "",
      levelOptions: [
        {
          id: 1,
          label: "一般"
        },
        {
          id: 2,
          label: "严重"
        },
        {
          id: 3,
          label: "其他"
        }
      ],
      findStartDate: "",
      performStartDate: ""
    };
  },
  created() {
    this.axios.get('http://192.168.6.184:8080/selectDefectsByCondition', {
      params: {
        currentPage: this.currentPage, 
        pageSize: this.pageSize
      }
    })
    .then((res) => {
      this.tableData = res.data.data.defectsVO;
      window.console.log(res.data);
    })
    .catch((err) => {
      window.console.log('错误是', err);
    })

  },
  methods: {
    // 查询
    defectQuery() {
      // this.axios.post('http://192.168.6.184:8080/selectDefectsByCondition', {
      //   taskNo: this.taskNo,
      //   circuitryNo: this.circuitryNo,
      //   defectsName: this.defectsName,
      //   defectsLevel: this.defectsLevel,
      //   findStartDate: this.findStartDate,
      //   performStartDate: this.performStartDate,
      //   currentPage: this.currentPage,
      //   pageSize: this.pageSize
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log('错误是', err);
      // })

    },
    // 分页点击事件
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 导出excel表
    downloadExcel() {
      this.$confirm(`确定导出${this.title}吗?'`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.excelData = this.tableData; //你要导出的数据list。
          this.export2Excel();
        })
        .catch(() => {});
    },
    //数据写入excel
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/export2Excel"); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
        const tHeader = ["任务编号", "线路编号", "杆塔编号","缺陷级别","缺陷类型","发现人","发现时间","下发人","下发时间","完好率","缺陷描述"]; // 导出的表头名信息
        const filterVal = ["taskNo", "circuitryNo", "poleNo","defectsLevel","defectsName","foundPerson","findDate","issuePerson","createDate","completionRate","defectDescribe"]; // 导出的表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, this.title); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style lang="less" scoped>
.insdefect {
  width: 100%;

  .search-box {
    margin: 20px 0;

    .el-row {
      margin: 10px 0;

      .bg-color {
        background-color: #5ee4e4;
        border-color: #5ee4e4;
      }

      .bg-add {
        text-align: right;
      }

      label {
        display: inline-block;
        width: 80px;
      }

      .el-input {
        width: 150px;
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