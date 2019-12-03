<template>
  <div class="config">
    <div class="config-type">
      <el-row>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">取消</el-button>
      </el-row>
    </div>
    <div class="type-connect">
      <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column type="selection" width="55" height="50"></el-table-column>
        <el-table-column prop="date" label="配置类型编码" width="150" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.date" style="width:150" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="配置类型名称" width="150" align="center" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" style="width:150"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
           <template slot-scope="scope">
            <el-input v-model="scope.row.address" style="width:150"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" align="center">
           <template slot-scope="scope">
            <el-input v-model="scope.row.address" style="width:150"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="config-parameter">
      <el-row>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">保存</el-button>
        <el-button type="primary">取消</el-button>
      </el-row>
    </div>
    <div class="parameter-connect">321</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
        window.console.log(val)
      }
  }
};
</script>

<style lang="less" scoped>
.el-button.el-button--primary {
  background-color: rgb(94, 228, 228);
  border-color: rgb(94, 228, 228);
}

.config {
  padding: 10px 10px;
}

.config-type,
.config-parameter {
  margin: 60px 0 0 50px;
}

.type-connect,
.parameter-connect {
  margin-left: 60px;
}

/deep/.el-table tr  {
  height:20px;
}


</style>