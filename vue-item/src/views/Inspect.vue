<template>
  <div class="app-inspect">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="nav">
        <el-breadcrumb-item>巡检管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>

      <router-view> </router-view>
    </div>

  </div>
</template>

<script>

export default {
  name:'inspect',
  data() {
    return {
      title: ''
    }

  },
  watch: {
    "$route.query":{
      handler() {
        this.name = this.$route.query.name;
        if(this.name == 'enact') {
          this.title = '巡检任务的制定与分配'
        } else if(this.name == 'execute') {
          this.title = '巡检任务的执行与回执'
        } else if(this.name == 'quexian') {
          this.title = '缺陷查询'
        }
      }
     }
  }

 
}
</script>


<style lang="less" scoped>

.app-inspect {
  width: 1000px;
  padding: 0 0 15px 20px;
  box-sizing: border-box;
  overflow: hidden;
  text-align: left;

  .nav {
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

}



</style>
