<template>
  <div class="total">
    <div class="nav">
      <span :class="{select:!zi}" @click="zi=false">消缺记录</span>
      <span :class="{select:zi}" @click="zi=true">巡检记录</span>
      <!-- 这个在左边 -->
    </div>

    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>信息统计</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chaxun">
      <div class="bianhao">
        <span>编号查询:</span>
        <el-input v-model="input" placeholder="请输入任务或者线路编号" class="in-bianhao"></el-input>
      </div>

      <div class="error">
        <span>有无故障:</span>
        <el-select v-model="value" placeholder="请选择" class=" in-error" :class="{inErrorMin:value}">
          <el-option label="有" value="yes" ></el-option>

          <el-option label="无" value="no"></el-option>
        </el-select>
      </div>

      <div class="time">
        <span>时间查询:</span>
        <wdtime class="wdtime" @addTime="addTime"></wdtime>
      </div>
   <el-button type="primary" icon="el-icon-search" class="chaxun-btn">查询</el-button>
    </div>
  </div>
</template>

<script>
import wdtime from '../components/wdtime'

export default {
  name: "total",
  data() {
    return {
      zi: true,
      title: "巡检记录",
      input: "",
      value: "",
      time:"",
    };
  },
components:{
  wdtime,
},
  watch: {
    zi() {
      if (this.zi) {
        this.title = "巡检记录";
      } else {
        this.title = "消缺记录";
      }
    }
  },
  methods:{
    addTime(time){
      this.time=time;
    }
  }
};
</script>

<style lang="less" scoped>
.total {
  width: 1000px;
  height: 600px;
  border: 1px solid red;
  margin: 0 auto;
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
  margin-top: 20px;
  margin-left: 50px;
  font-size: 16px;
  span:nth-of-type(2) {
    font-size: 14px;
    padding-top: 1px;
  }
}

/* 查询 */
.chaxun {
  width: 100%;
  height: 60px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  border: 1px solid rgb(218, 218, 218);
}
/* 查询中的Div */
.chaxun > div {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  span {
    width: 70px;
    float: left;
    margin-right: 5px;
    color: #000000;
  }
  }
  
  /* 编号查询 */
  .in-bianhao {
    width: 190px;
    height: 30px;
    float: left;
    font-size: 14px;
  }

  /* 是否为错误查询 */
  .in-error {
    width: 90px;
    float: left;
  }
  /* 选择后 */
  .inErrorMin{
    width: 70px;
    float: left;
  }

  /* 时间查询 */
 
   .wdtime{
    width: 250px;
    float: left;
  }
 
/* 查询输入框组件 */
 .chaxun > div:first-child {
    width: 300px;
    margin-left: 70px;
  }
  /* 第二个是否为错误 */
  .chaxun > div:nth-of-type(2) {
    width: 200px;
  }
  /* 时间查询 */
  .time{
   width: 330px;
  }
  .chaxun-btn{
    margin-left: 10px;
    margin-right: 10px;
  }
</style>