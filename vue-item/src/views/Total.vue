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
        <el-input v-model="submit.id" placeholder="请输入任务或者线路编号" class="in-bianhao" 
          @input="chaxun"
          clearable=ture
        ></el-input>
      </div>

      <div class="time">
        <span>时间查询:</span>
        <wdtime class="wdtime" @addTime="addTime" :wdname="wdname" ></wdtime>
      </div>
      <div class="error" v-show="wdname=='xun'"  @input="chaxun">
        <span>有无故障:</span>
        <el-select
          v-model="submit.error"
          placeholder="请选择"
          class="in-error"
          :class="{inErrorMin:submit.error=='1'||submit.error=='2'}"
        >
          <el-option label="全部" value></el-option>
          <el-option label="有" value="1"></el-option>

          <el-option label="无" value="2"></el-option>
        </el-select>
      </div>

      <el-button type="primary" icon="el-icon-search" class="chaxun-btn" @click="chaxun()" :loading="loading">查询</el-button>
    </div>

    <div class="daochu">
      <el-button type="primary" class="excel" disabled="ture"> 打印</el-button>
      <el-button type="primary" class="excel" @click="downloadExcel">导出为EXCEL</el-button>
    </div>
    <div class="table">
      <wdtable :tableData="tableData" class="wdtable" :wdname="wdname" :loading="loading"></wdtable>

      <div class="fyblock">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="submit.currentPage"
          :total="countPage"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import wdtime from "../components/wdtime";
import wdtable from "../components/wdtable";

export default {
  name: "total",
  data() {
    return {
      title: "巡检记录",
      wdname: "xun",
      submit: { id: "", error: "", time: ["", ""], currentPage: 1 },
      tableData: [],
      total: {},
      countPage:null,
      pageSize:5,
      loading:true
    };
  },
  components: {
    wdtime,
    wdtable
  },
  watch: {
    wdname() {
      /* 当 wdname 发生变化时 调用重置函数 */
      this.chongzhii();
    }
  },
  methods: {
    addTime(time) {
      this.submit.time = time||["",""];
      this.chaxun();
    },
    chongzhii() {
      /* 初始化页面数据 */
      this.submit.id = "";
      this.submit.error = "";
      this.submit.time = ["", ""];
      this.submit.currentPage = 1;
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

      this.loading=true;
      this.tableData=[];
      this.total.currentPage = this.submit.currentPage; /* 页面初始值 第几页 */
      this.total.pageSize = this.pageSize; /* 页面显示条数 */

      /* 时间赋值 */
      this.total.startDate = this.submit.time[0];
      this.total.endDate = this.submit.time[1];

      if (this.wdname == "xun") {
        this.total.error = this.submit.error; /* 赋 error 值*/
      } else {
        delete this.total.error; // 删除 error 值
      }

      /* 判断是任务编号还是线路编号*/

      var task = /^R/;
      /* 任务编号 */
      if (task.test(this.submit.id)) {
        // this.total.circuitryNo ? delete this.total.circuitryNo : "";

        this.total.circuitryNo = "";
        this.total.taskNo = this.submit.id;
      } else {
        /* 线路编号 */
        // this.total.taskNo ? delete this.total.taskNo : "";
        this.total.taskNo = "";
        this.total.circuitryNo = this.submit.id;
      }

      window.console.log(this.total);

      var url = "http://192.168.6.184:8080";
      this.wdname == "xun" ? "" : (url = url + "/selectFixRecordByFind");

      this.axios
        .get(url, {
          params: this.total
        })
        .then(res => {
         
         this.countPage = res.data.data.count; //初始化分页
         this.tableData=[] //初始化表格数据 ;
          window.console.log(res.data)
          
          var wdData = res.data.data.fixRecord;
      
        

          /* 赋值 */
          wdData.forEach((item)=>{
          var tableData={};
           
           // 各种赋值
           tableData.taskNo=item.poleFixRelation.fix.task.taskNo;
           tableData.taskName=item.poleFixRelation.fix.task.taskName;
           
           tableData.line=`${item.poleFixRelation.fix.task.circuitry.circuitryNo}
           (${item.poleFixRelation.fix.task.circuitry.startPole.poleNo}-${ item.poleFixRelation.fix.task.circuitry.endPole.poleNo})`
          
           tableData.poleNo=item.pole.poleNo;
           tableData.defectsLevel=item.defectsLevel;
           tableData.defectsName=item.defects.defectsName;
           tableData.finishDate=item.poleFixRelation.fix.task.finishDate;
           tableData.findDate=item.findDate;
           tableData.defectsDescribe=item.defectsDescribe;
           
           this.tableData.push(tableData);
         

         })

          this.loading=false;

        })
        .catch(err => {
          this.loading=false;
          window.console.log("错误", err);
        });
    },

    /* 监测分页 */
    handleCurrentChange(val) {
      this.submit.currentPage = val;
      this.chaxun();
    },

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
        
        var arr1;
        var arr2;
        if(this.wdname=="xun")
        {
          arr1 = ["任务编号", "任务名称", "线路编号（起始编号-终止编号","杆塔编号","有无故障","缺陷级别","缺陷类型","发现时间","缺陷描述"];
          arr2 = ["taskNo","taskName","line","poleNo","error","poleNo","defectsLevel","defectsName","findDate","defectsDescribe"];
        }

        else 
        {
           arr1  = ["任务编号", "任务名称", "线路编号（起始编号-终止编号","杆塔编号","缺陷级别","缺陷类型","发现时间","消缺时间","缺陷描述"]; // 导出的表头名信息
           arr2  = ["taskNo","taskName","line","poleNo","defectsLevel","defectsName","findDate","finishDate","defectsDescribe"];  // 导出的表头字段名，需要导出表格字段名
        }
           const tHeader = arr1;  // 导出的表头名信息
           const filterVal =arr2;  // 导出的表头字段名，需要导出表格字段名
       
        
          
       
        
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, this.title); // 导出的表格名称，根据需要自己命名
      });
    },
    //格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map( j => v[j]));
    }
  },
  /*创建开始时*/
  created() {
    this.chaxun();
  }
};
</script>

<style lang="less" scoped>

@mainColor: #5ee4e4;
@bottom: 1px solid rgb(218, 218, 218);
.total {
  width: 998px;
  max-height: 700px;
  overflow: hidden;
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
.chaxun-btn:active {
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
    &:active {
      background-color: #51bdbd;
    }
  }
}

/* 表格 */

.table {
  margin-top: 10px;
  margin-bottom: 5px;
  width: 100%;
  flex-wrap: wrap;
}
.wdtable {
  margin: 0 auto;
  width: 990px;
}
.fyblock {
  float: right;
}
</style>