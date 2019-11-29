<template>
  <div class="app-repair">
    <el-breadcrumb separator="|" class="repair-nav">
      <el-breadcrumb-item>
        <router-link to="/repairdistribution">消缺任务制定与分配</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/repairperform">消缺任务执行与回执</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/repairquery">消缺查询</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 子组件 -->
    <div class="repair-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "reapir"
};
</script>

<style lang="less" scoped>
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
}
</style>