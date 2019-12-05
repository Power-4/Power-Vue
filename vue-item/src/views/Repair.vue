<template>
  <div class="app-repair">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#409EFF"
    >
      <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
        <el-breadcrumb-item>消缺管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-menu>

    <!-- 子组件 -->
    <div class="repair-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "reapir",
  data() {
    return {
      activeIndex: "1",
      title: "消缺任务制定与分配"
    };
  },
  watch: {
    "$route": {
      handler(){

        window.console.log( this.$route.fullPath)

        if ( this.$route.fullPath == "/repair") {
          this.title = "消缺任务制定与分配";
        } 
        else if (this.$route.fullPath == "/repairperform") {
          this.title = "消缺任务执行与回执";
        } 
        else if (this.$route.fullPath == "/repairquery") {
          this.title = "消缺查询";
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.lu {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  span:nth-of-type(1) {
    margin-left: 20px;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    padding-top: 1px;
  }
}

.app-repair {
  width: 980px;
  height: 600px;
  float: right;
  margin-left: 20px;

  .repair-nav {
    height: 20px;
    font-size: 18px;
  }

  .repair-content {
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }

  .el-menu-demo {
    font-size: 18px;
  }
}
</style>