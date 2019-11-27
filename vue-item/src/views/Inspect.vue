<template>
  <div class="app-inspect">
    <p class="now-positon">
      巡检任务管理
    </p>

    <div class="search-box">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务状态：</label>
            <select>
              <option value="--请选择--">--请选择--</option>
              <option value="待分配">待分配</option>
              <option value="已分配">已分配</option>
              <option value="执行中">执行中</option>
              <option value="已完成">已完成</option>
            </select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>下发人：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <input type="date">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query">查 询</button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple bg-add">
            <button type="button" class="btn-add">+ 制定巡检任务</button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="takeId"
        label="任务编号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="巡检线路"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="startNumber"
        label="起始杆号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="endNumber"
        label="终止杆号"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="下发人"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="下发时间"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="任务状态"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="任务完成时间"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="任务是否取消"
        align= "center">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="200px"
        fixed="right"
        align= "center">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">分配任务</el-button>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">取消</el-button>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="5"
        @current-change="current_change">
      </el-pagination>
    </div>

  </div>
</template>

<script>

export default {
  name:'inspect',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }
      ],
      total: 10,
      pagesize:5,
      currentPage:1
    }

  },
  methods: {
    current_change:function(currentPage){
      this.currentPage = currentPage;
    }
  }

 
}
</script>


<style lang="less" scoped>

.app-inspect {
  width: 1000px;
  padding: 0 20px 50px;
  background: #f4f4f4;
  box-sizing: border-box;
  overflow: hidden;
  text-align: left;

  .now-position {
    margin: 25px 0;
  }

  .search-box {
    margin: 20px 0;

    .el-row {
      margin: 10px 0;

      .bg-add {
        text-align: right;
      }

      label {
        display: inline-block;
        width: 80px;
      }

      .btn-query,
      .btn-add {
        height: 30px;
        background: rgb(94,228,228);
        border: 0;
        border-radius: 5px;
        color: #fff;
        padding: 0 15px;
      }

    }


  }

  .el-table {
    margin: 0 auto;

    .el-table__header {
      background: #F4F4F4;
    }
  }

  .pagination {
    margin: 10px 0 0;
    text-align: right;
  }
}



</style>