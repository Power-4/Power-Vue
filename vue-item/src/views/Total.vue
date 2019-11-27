<template>
  <div class="total">
    <div class="nav">
      <span :class="{select:name=='xiao'}" @click="name='xiao'">消缺记录</span>
      <span :class="{select:name=='xun'}" @click="name='xun'">巡检记录</span>
      <!-- 这个在左边 -->
    </div>

    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>信息统计</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chaxun">
      <div class="bianhao">
        <span>编号查询:</span>
        <el-input v-model="submit.id" placeholder="请输入任务或者线路编号" class="in-bianhao"></el-input>
      </div>

      <div class="error">
        <span>有无故障:</span>
        <el-select
          v-model="submit.error"
          placeholder="请选择"
          class="in-error"
          :class="{inErrorMin:submit.error}"
        >
          <el-option label="有" value="yes"></el-option>

          <el-option label="无" value="no"></el-option>
        </el-select>
      </div>

      <div class="time">
        <span>时间查询:</span>
        <wdtime class="wdtime" @addTime="addTime"></wdtime>
      </div>
      <el-button type="primary" icon="el-icon-search" class="chaxun-btn" @click="chaxun()">查询</el-button>
    </div>

    <div class="daochu">
      <el-button type="primary" class="excel">打印</el-button>
      <el-button type="primary" class="excel">导出为EXCEL</el-button>
    </div>
    <div class="table">
      <wdtable :tableData="tableData" class="wdtable"></wdtable>
      
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="50" :page-size="7"  
        @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import wdtime from "../components/wdtime";
import wdtable from "../components/wdtable";

var tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄"
  }
];

export default {
  name: "total",
  data() {
    return {
      title: "巡检记录",
      name: "xun",
      submit: { name: "", id: "", error: "", time: "",page:1, },
      tableData: []
    };
  },
  components: {
    wdtime,
    wdtable
  },
  watch: {
    name() {
      if (this.name == "xun") {
        this.title = "巡检记录";
        this.submit.name = "xun";
      } else {
        this.title = "消缺记录";
        this.submit.name = "xiao";
      }
    }
  },
  methods: {
    addTime(time) {
      this.submit.time = time;
    },
    chaxun() {
      window.console.log(this.submit);
    },
    handleCurrentChange(val) {
       this.submit.page=val;
      }
  },
  beforeCreate(){
   /*  var total=
    {
      name=this.submit.name,

    };
    if(!this.submit.error)
    {
      total = {}
    } */
  },
  /* 数据复制 */
  created() {
    this.tableData = tableData;
  }
};
</script>

<style lang="less" scoped>
@mainColor: #5ee4e4;
@bottom: 1px solid rgb(218, 218, 218);
.total {
  width: 998px;

  float: right;
  border: @bottom;
}
/* 导航栏 */
.nav {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #606266;
  span {
    float: right;
    margin-right: 30px;
    cursor: pointer;
  }
  span:nth-of-type(1) {
    margin-right: 50px;
  }
  span:hover {
    color: #000000;
  }
}
/* 选中状态 */
.select {
  font-weight: 700;
  color: black;
}

/* 路径提示  */
.lu {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  border-bottom: @bottom;
  span:nth-of-type(1) {
    margin-left: 20px;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    padding-top: 1px;
  }
}

/* 查询 */
.chaxun {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: @bottom;
}
/* 查询中的Div */
.chaxun > div {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  span {
    width: 70px;
    float: left;
    color: #000000;
  }
}

/* 编号查询 */
.in-bianhao {
  width: 190px;
  float: left;
  font-size: 14px;
}

/* 是否为错误查询 */
.in-error {
  width: 90px;
  float: left;
}
/* 选择后 */
.inErrorMin {
  width: 70px;
  float: left;
}

/* 时间查询 */
.wdtime {
  width: 250px;
  float: left;
}

/* 查询按钮 */
.chaxun-btn{
  border-color: @mainColor;
  background-color: @mainColor;
}

/* 导出 */
.daochu {
  width: 100%;
  height: 60px;
  border-bottom: @bottom;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .excel {
    height: 40px;
    position: relative;
    right: 30px;
    border-color: @mainColor;
    background-color: @mainColor;
  }
}

/* 表格 */

.table {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.wdtable {
  width: 900px;
}
</style>