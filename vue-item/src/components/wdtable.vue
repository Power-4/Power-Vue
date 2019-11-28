<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" class="table">
      <el-table-column prop="date" label="任务编号" width="100"></el-table-column>
      <el-table-column prop="name" label="任务名称"></el-table-column>
      <el-table-column prop="address" label="线路编号（起始编号-终止编号）" width="200"></el-table-column>
      <el-table-column prop="address" label="杆塔编号"></el-table-column>
      <el-table-column prop="address" label="有无故障" v-if="wdname=='xiao'"></el-table-column>
      <el-table-column prop="address" label="缺陷级别"></el-table-column>
      <el-table-column prop="address" label="缺陷类型"></el-table-column>
      <el-table-column prop="date" label="消缺时间" width="100" v-if="wdname=='xiao'" ></el-table-column>
      <el-table-column prop="date" label="发现时间" width="100" ></el-table-column>
      <el-table-column prop="address" label="缺陷描述"  ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "wdtable",
  props: {
    tableData: Array,
    wdname: String
  },
  data() {
    return {
  
    };
  }
};
</script>
<style lang="less" scoped>
  .table{
    font-size: 12px;
  }
</style>