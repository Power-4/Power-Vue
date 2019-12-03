<template>
  <div class="app-repair">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409EFF">
      <el-menu-item index="1">
        <router-link to="/repairdistribution">消缺任务制定与分配</router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <router-link to="/repairperform">消缺任务执行与回执</router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <router-link to="/repairquery">消缺查询</router-link>
      </el-menu-item>
    </el-menu>
    <!-- <el-breadcrumb separator="|" class="repair-nav">
      <el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>-->

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
      activeIndex: '1'
    }
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
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