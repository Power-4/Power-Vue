<template>
  <div class="enact-view">
    <p class="view-title">查看巡检任务</p>
    <div class="base-info">
      <el-row :gutter="1">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <span>{{lineBasic.taskNo}}</span>  
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>任务名称：</label>
            <span>{{lineBasic.taskName}}</span>  
          </div>
          </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>巡检线路：</label>
            <span>{{lineBasic.circuitry.circuitryName}}</span> 
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>起始杆号：</label>
            <span>{{lineBasic.taskPoleRelation.startPoleNo}}</span> 
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>终止杆号：</label>
            <span>{{lineBasic.taskPoleRelation.endPoleNo}}</span> 
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="1">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>下发人：</label>
            <span>{{lineBasic.users.userName}}</span>  
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>下发时间：</label>
            <span>{{lineBasic.createDate}}</span>  
          </div>
          </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>任务状态：</label>
            <span>{{lineBasic.taskState}}</span> 
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <label>任务完成时间：</label>
            <span>{{lineBasic.finishDate}}</span> 
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><label>备注信息：</label><span>{{lineBasic.taskNote}}</span></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><label>巡检员：</label><span>{{nowinspectors}}</span></div></el-col>
      </el-row>


    </div>
    <div class="info-details">
      <div class="lines">
        <el-tree
          :data="lines"
          default-expand-all
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class="details">
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>线路编码：</label><span>{{lineDetail.circuitryNo}}</span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>杆塔编码：</label><span>{{lineDetail.poleNo}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>有无故障：</label><span>{{lineDetail.hasDefects}}</span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>完好率：</label><span>{{lineDetail.completionRate}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>缺陷类型：</label><span>{{lineDetail.defectsName}}</span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>缺陷级别：</label><span>{{lineDetail.defectsLevel}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><label>巡检时间：</label><span>{{lineDetail.checkDate}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>缺陷发现人：</label><span>{{lineDetail.findUserName}}</span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>发现时间：</label><span>{{lineDetail.findDate}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10"><div class="grid-content bg-purple"><label>下发人员：</label><span>{{lineDetail.createUserName}}</span></div></el-col>
          <el-col :span="14"><div class="grid-content bg-purple"><label>下发时间：</label><span>{{lineDetail.createDate}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><label>缺陷描述：</label><span>{{lineDetail.defectsDescribe}}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple"><label>巡检员：</label><span>{{lineDetail.defectUserName}}</span></div></el-col>
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
      lineBasic: {
        taskId:'',
        taskNo: '',
        taskName: '',
        circuitry: {
          circuitryName: ''
        },
        users: {
          userName: ''
        },
        taskPoleRelation: {
          startPoleNo: '',
          endPoleNo: ''
        },
        taskState: '',
        taskNote: ''
      },
      nowinspectors: '',
      nowinspector: [],
      
      lines: [
        {
          id: 0,
          label: '',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      lineDetail: {
        circuitryNo: '',
        poleNo: '',
        hasDefects: '',
        completionRate: '',
        defectsName: '',
        defectsLevel: '',
        checkDate: '',
        defectUserName: '',
        findDate: '',
        createUserName: '',
        createDate: '',
        defectsDescribe: ''
      }
    }
  },
  created() {
    this.getParams();


    this.axios.get('/checkMissionS?',{params:{taskId: this.$route.query.taskId}})
    .then((res) => {
      if(res.data.data.taskInfo[0].taskState == 7) {
        res.data.data.taskInfo[0].taskState = '待分配'
      } else if (res.data.data.taskInfo[0].taskState == 8) {
        res.data.data.taskInfo[0].taskState = '已分配'
      } else if (res.data.data.taskInfo[0].taskState == 9) {
        res.data.data.taskInfo[0].taskState = '执行中'
      } else if (res.data.data.taskInfo[0].taskState == 11) {
        res.data.data.taskInfo[0].taskState = '已完成'
      }
      this.lineBasic = res.data.data.taskInfo[0];
      res.data.data.poles.forEach((item)=> {
        var i = {};
        i.id = item.poleId,
        i.label = item.poleNo;
        this.lines[0].children.push(i)
      })

      res.data.data.inspectors.forEach((item)=> {
        var i = {};
        i.userName = item.userName;
        this.nowinspector.push(i.userName);
      })

      this.nowinspectors = this.nowinspector.toString();
      this.lines[0].label = res.data.data.taskInfo[0].circuitry.circuitryName;

      window.console.log('任务对应杆号',res.data);
    })
    .catch((err) => { 
      window.console.log("错误",err)
    })
  },
  watch: {
    '$route': 'getParams'
  },
  methods: {
    getParams() {
      this.lineBasic.taskId = this.$route.query.taskId;
    },
    backto() {
      this.$router.go(-1)
    },
    handleNodeClick(lines) {
      window.console.log(lines.id)

      // 判断点击的杆塔编号
      if(lines.id !== 0) {
        this.lineDetail.poleNo = lines.label;
      } else {
        this.lineDetail.poleNo= '';
      }


      this.axios.get('/showPoleInfosS?',{params:{poleId: lines.id}})
      .then((res) => {
        if(res.data.data.poleInfosS[0]==null) {
          this.lineDetail = {}
          this.lineDetail.poleNo = lines.label;
        } else {
          this.lineDetail = res.data.data.poleInfosS[0];
          if(res.data.data.taskAndPoles.hasDefects == 1) {
            res.data.data.taskAndPoles.hasDefects = '有'
          } else if (res.data.data.taskAndPoles.hasDefects == 0) {
            res.data.data.taskAndPoles.hasDefects = '无'
          }
        }
        window.console.log(res.data);
      })
      .catch((err) => { 
        window.console.log("错误",err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.enact-view {
  padding: 0 30px 0;

  .view-title {
    font-weight: 600;
    margin: 15px 0;
  }

  .base-info {
    width: 100%;
    height: 150px;
    padding: 10px 5px 0;
    margin-bottom: 10px;
    box-sizing: border-box;
    border: 1px solid #000;

    .el-row {
      margin-bottom: 15px;

      label {
        font-size: 14px;
        font-weight: 600;
      }
      span {
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
      overflow: auto;
      box-sizing: border-box;
      border: 1px solid #000;

      .el-tree {
        margin-top: 10px;
        height: 250px;
        text-align: center;

        &>div:first-child {
          height: 100%;
        }
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