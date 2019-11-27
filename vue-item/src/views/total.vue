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
        <el-select v-model="submit.error" placeholder="请选择" class="in-error" :class="{inErrorMin:submit.error}">
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

    <div>
        
    </div>
  </div>
</template>

<script>
import wdtime from "../components/wdtime";

export default {
  name: "total",
  data() {
    return {
      title: "巡检记录",
      name:"xun",
      submit: { name:"", id: "", error: "", time: "" }
    };
  },
  components: {
    wdtime
  },
  watch: {
    name() {
      if ( this.name=="xun") {
        this.title = "巡检记录";
        this.submit.name="xun";
      } else {
        this.title = "消缺记录";
        this.submit.name="xiao";
      }
    }
  },
  methods:{
    addTime(time) {
      this.submit.time = time;
    },
    chaxun(){
      window.console.log(this.submit)
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #5ee4e4;
.total {
  width: 998px;
  height: 500px;
  float: right;
  border: 1px solid rgb(218, 218, 218);
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
  border-bottom: 1px solid rgb(218, 218, 218);
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
  border-bottom: 1px solid rgb(218, 218, 218);
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
</style>