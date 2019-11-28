<template>
  <div class="towar">
    <!-- 查询线路 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>电力巡检系统</el-breadcrumb-item>
      <el-breadcrumb-item>线路管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="chaxun">
      <div class="bianhao">
        <span>所属线路:</span>
        <el-input v-model="submit.id" placeholder="请输入编号" class="in-bianhao"></el-input>
      </div>

      <div class="error">
        <span>是否启用:</span>
        <el-select v-model="submit.error" placeholder="请选择" class="in-error" :class="{inErrorMin:submit.error}">
          <el-option label="启用" value="yes"></el-option>

          <el-option label="停用" value="no"></el-option>
        </el-select>
      </div>
  
      <el-button type="primary" icon="el-icon-search" class="chaxun-btn" @click="chaxun()">查询</el-button>
    </div>

    <!-- 添加线路类型 -->
    <div class="add-btn">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query" @click="dialogFormVisible = true">
              <i class="el-icon-circle-plus-outline"></i>添加线路
            </button>
            <el-dialog title="添加线路" :visible.sync="dialogFormVisible">
              
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false" class="ok-btn">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 线路表单 -->
    <el-table :data="tableData" stripe style="width: 100%" align="center">
      <el-table-column prop="lineid" label="线路编号" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="线路名称" width="100" align="center"></el-table-column>
      <el-table-column prop="startid" label="起始杆号" width="100" align="center"></el-table-column>
      <el-table-column prop="endid" label="终止杆号" width="100" align="center"></el-table-column>
      <el-table-column prop="base" label="塔基数" width="100" align="center"></el-table-column>
      <el-table-column prop="run" label="运行状态" width="100" align="center"></el-table-column>
      <el-table-column prop="state" label="状态(启动/未启动)" width="200" align="center"></el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <el-button type="text" size="small">停用</el-button> 
        <el-button type="text" size="small">修改</el-button> 
        <el-button type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "total",
  data() {
    return {
      title: "线路",
      name:"xun",
      submit: {id: "", error: ""},
      tableData: [
        {
          lineid:"XW00001",
          startid:"XW00010",
          endid:"XW00250",
          base:"440",
          run:"正常",
          name: "西渭线",
          state: "启用"
        },
        {
          lineid:"XW00001",
          startid:"XW00010",
          endid:"XW00250",
          base:"440",
          run:"检修中",
          name: "西渭线",
          state: "启用"
        },
        {
          lineid:"XW00001",
          startid:"XW00010",
          endid:"XW00250",
          base:"440",
          run:"正常",
          name: "西渭线",
          state: "启用"
        },
        {
          lineid:"XW00001",
          startid:"XW00010",
          endid:"XW00250",
          base:"440",
          run:"正常",
          name: "西渭线",
          state: "停用"
        }
      ],
      dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  components: {
    
  },
  methods:{
    chaxun(){
      window.console.log(this.submit)
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #5ee4e4;
.towar {
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
    width: 100px;
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
  width: 100px;
  float: left;
}

/* 查询按钮 */
.chaxun-btn {
  border-color: @mainColor;
  background-color: @mainColor;
}

/*添加杆塔*/
.btn-query {
  width: 200px;
  height: 40px;
  line-height: 40px;
  background: rgb(94, 228, 228);
  border: 0;
  border-radius: 5px;
  color: #fff;
  padding: 0 15px;
  outline: none;
  font-size: 18px;
}
.add-btn {
  float: right;
  margin-right: 20px;
  padding: 20px 0;
  font-size: 16px;
}
.long{
  width: 200px;
}
</style>
