<template>
  <div class="total">
    <div class="nav">
      <span :class="{select:wdname=='xiao'}" @click="wdname='xiao'">消缺记录</span>
      <span :class="{select:wdname=='xun'}" @click="wdname='xun'">巡检记录</span>
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
  
      <div class="time">
        <span>时间查询:</span>
        <wdtime class="wdtime" @addTime="addTime" :wdname="wdname"></wdtime>
      </div>
      <div class="error" v-show="wdname=='xiao'">
        <span>有无故障:</span>
        <el-select
          v-model="submit.error"
          placeholder="请选择"
          class="in-error"
          :class="{inErrorMin:submit.error=='yes'||submit.error=='no'}"
        >
          <el-option label="全部" value="all"></el-option>
          <el-option label="有" value="yes"></el-option>

          <el-option label="无" value="no"></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search" class="chaxun-btn" @click="chaxun()">查询</el-button>
    </div>

    <div class="daochu">
      <el-button type="primary" class="excel">打印</el-button>
      <el-button type="primary" class="excel" @click="downloadExcel">导出为EXCEL</el-button>

    </div>
    <div class="table">
      <wdtable :tableData="tableData"  class="wdtable"  :wdname="wdname"></wdtable>

      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="submit.pageSize"
          :total="currentPage"
          :page-size="5"
          @current-change="handleCurrentChange"
        ></el-pagination>
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
    address: "上海市"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀"
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普"
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普"
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普"
  }
];

export default {
  name: "total",
  data() {
    return {
      title: "巡检记录",
      wdname: "xun",
      submit: { id: "", error: "", time: "", pageSize: 1 },
      tableData: [],
      total: {},
      currentPage:50,
    };
  },
  components: {
    wdtime,
    wdtable,
   
  },
  watch: {
    wdname() {
      /* 当 wdname 发生变化时 调用重置函数 */
      this.chongzhii();
    }
  },
  methods: {
    addTime(time) {
      this.submit.time = time;
    },
    chongzhii() {
      /* 初始化页面数据 */
      this.submit.id = "";
      this.submit.error = "";
      this.submit.time = "";
      this.submit.pageSize=1;
      /* 初始化 wdname  */
      if (this.wdname == "xun") {
        this.title = "巡检记录";
      } else {
        this.title = "消缺记录";
      }
      /* 调用查询函数 */
      this.chaxun();
    },
    /* 点击查询 */
    chaxun() {
      this.total.name = this.wdname; /* 赋 name 值 */
      this.total.error = this.submit.error || "all"; /* 赋error 值*/
      this.total.pageSize = this.submit.pageSize; /* 页面初始值 */
      this.total.currentPage = 5; /* 页面显示条数 */

      /* 对 Key 和  content 赋值*/

      /* 判断 id 是否存在 */
      if (this.submit.id) {
        var task = /^R/;

        /* 判断是任务编号还是线路编号 */
        if (task.test(this.submit.id)) {
          this.total.key = "task";
        } else {
          this.total.key = "line";
        }
        /* 给content 赋值 */
        this.total.content = this.submit.id;
      } else if (this.submit.time) {
      /* 判断 time 是否存在 */
        (this.total.key = "time"), (this.total.content = this.submit.time);
      }
      
      /* 在此发送 axios */
      window.console.log(this.total);

      this.axios.get("http://192.168.6.175:8080/fix/getallfix")
      .then((res)=>{
          window.console.log(res)
      })
      .catch((err)=>{
        window.console.log("错误",err)
      })
  
      /* 赋值 */
      this.currentPage=50;
      this.tableData = tableData;
    },

    /* 监测分页 */
    handleCurrentChange(val) {
      this.submit.pageSize = val;
      this.chaxun();
    },

    downloadExcel() {
                this.$confirm(`确定导出${this.title}吗?'`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.excelData = tableData; //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {

                });
            },
            //数据写入excel
            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } =  require('@/excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
                    const tHeader = ['时间','名字','地址']; // 导出的表头名信息
                    const filterVal = ['date','name', 'address']; // 导出的表头字段名，需要导出表格字段名
                    const list = that.excelData;
                    const data = that.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, this.title);// 导出的表格名称，根据需要自己命名
                })
            },
            //格式转换，直接复制即可
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
  },
  /*创建开始时*/
  created() {
    this.chaxun();
  }
}

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
.chaxun-btn {
  border-color: @mainColor;
  background-color: @mainColor;
} 
.chaxun-btn:active{
  background-color: #51bdbd;
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
    &:active{
    background-color: #51bdbd;
  }
  }
  
}

/* 表格 */

.table {
  margin-top: 10px;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.wdtable {
  width: 990px;
}
</style>