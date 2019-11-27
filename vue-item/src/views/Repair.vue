<template>
  <div class="app-repair">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消缺任务制定与分配" name="first">
        <div class="zhiding">

        </div>
      </el-tab-pane>
      <el-tab-pane label="消缺任务执行与回执" name="second">

      </el-tab-pane>
      <el-tab-pane label="消缺查询" name="third">

      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "repair",
  data() {
      return {
        activeName: 'first'
      };
    },
    
};
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
}

.app-repair {
  width: 1000px;
  height: 600px;
  float: right;
}

.zhiding {
  width: 998px;
  height: 300px;
  border: 1px solid #000;
}
</style>