<template>
  <div class="enact-view">
    <p class="view-title">查看巡检任务</p>
    <div class="base-info">
      <el-row :gutter="1">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <span></span>  
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>任务名称：</label>
            <span></span>  
          </div>
          </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>巡检线路：</label>
            <span></span> 
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>起始杆号：</label>
            <span></span> 
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>终止杆号：</label>
            <span></span> 
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="1">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>下发人：</label>
            <span></span>  
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <span></span>  
          </div>
          </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>任务状态：</label>
            <span></span> 
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务完成时间：</label>
            <span></span> 
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><label>备注信息：</label><span></span></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><label>巡检员：</label><span></span></div></el-col>
      </el-row>


    </div>
    <div class="info-details">
      <div class="lines">
        <el-tree
          :data="lines"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="details">
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>线路编码：</label><span></span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>杆塔编码：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>有无故障：</label><span></span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>完好率：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>缺陷类型：</label><span></span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>缺陷级别：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><label>巡检时间：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>缺陷发现人：</label><span></span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>发现时间：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>下发人员：</label><span></span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>下发时间：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><label>缺陷描述：</label><span></span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><label>巡检员：</label><span></span></div></el-col>
        </el-row>
      </div>
    </div>
    <el-button type="primary" @click="backto">返回</el-button>



  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: [
        {
          label: '一号线',
          children: [
            {
              id: 1,
              label: 'xw0001'
            },
            {
              id: 2,
              label: 'xw0002'
            },
            {
              id: 3,
              label: 'xw0003'
            },
            {
              id: 4,
              label: 'xw0004'
            },
            {
              id: 5,
              label: 'xw0005'
            },
            {
              id: 6,
              label: 'xw0006'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }

    }
  },
  methods: {
    backto() {
      this.$router.go(-1)
    },
    handleNodeClick() {

    }
  }
  
}
</script>

<style lang="less" scoped>
.enact-view {
  padding: 0 30px 0;

  p {
    margin: 30px 0 10px;
  }

  .base-info {
    width: 100%;
    height: 150px;
    padding: 10px 0 0 0;
    margin-bottom: 10px;
    border: 1px solid #000;

    .el-row {
      margin-bottom: 15px;

      label {
        font-size: 14px;
      }
    }
  }

  .info-details {
    width: 100%;
    display: flex;
    height: 300px;
    margin-bottom: 10px;
    justify-content: space-between;

    .lines {
      width: 20%;
      height: 100%;
      border: 1px solid #000;

      .el-tree {
        margin-top: 10px;
        text-align: center;
      }
    }

    .details {
      width: 75%;
      height: 100%;
      padding: 10px 20px;
      box-sizing: border-box;
      border: 1px solid #000;

      .el-row {
        margin-bottom: 15px;
      }
    }
  }
}

</style>