<template>
  <div class="execute-enter">
    <p class="title" v-if="isadd">巡检任务回执录入</p>
    <p class="title" v-else>巡检任务回执修改</p>
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
        <el-form>
          <el-form-item label="线路编码：">
            <el-input v-model="form.circuitryNo" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="杆塔编码：">
            <el-input v-model="form.poleNo" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="缺陷类型：">
            <el-select v-model="form.defectsName" clearable placeholder="请选择">
              <el-option
                v-for="item in form.typeOptions"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺陷级别：">
            <el-select v-model="form.defectsLevel" clearable placeholder="请选择">
              <el-option
                v-for="item in form.levelOptions"
                :key="item.id"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发现时间：">
            <el-input v-model="form.findDate" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="发现人员：">
            <el-input v-model="form.foundPerson" :disabled="edit"></el-input>
          </el-form-item>
          <el-form-item label="缺陷描述：">
            <el-input type="textarea" v-model="form.defectsDescribe" class="area"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <el-button type="primary" @click="upLoad">上传回执</el-button> -->
    <el-button v-if="isadd" type="primary" @click="addSave">新增保存</el-button>
    <el-button v-else type="primary" @click="modifySave">修改保存</el-button>
    <el-button type="primary" @click="backto">返回</el-button>
  </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  data() {
    return {
      taskId: '',
      temps: [],
      isadd: true,
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
      form: {
        circuitryNo: 'XW001',
        poleNo: '',
        findDate: '',
        foundPerson: '巡检员01',
        defectsDescribe: '',
        defectsName: '',
        typeOptions: [
          {
            id: 1,
            label: '叉梁断裂'
          }, {
            id: 2,
            label: '拦河线断裂'
          }, {
            id: 3,
            label: '绝缘子爆破'
          }, {
            id: 4,
            label: '杆塔倾斜'
          }, {
            id: 5,
            label: '吊杆变形'
          }, {
            id: 6,
            label: '其他'
          }
        ],
        defectsLevel: '',
        levelOptions: [
          {
            id: 1,
            label: '一般'
          }, {
            id: 2,
            label: '严重'
          }, {
            id: 3,
            label: '其他'
          } 
        ],
      },
      edit:true,
      timer: null
    }
  },
  created() {
    this.getParams();
    this.isadd = this.isAdd;

    this.axios.get('http://192.168.6.184:8080/showTaskandPoles?',{params:{taskId: this.taskId}})
    .then((res) => {
      res.data.data.taskAndPoles.poles.forEach((item)=> {
        var i = {};
        i.id = item.poleId,
        i.label = item.poleNo;
        this.lines[0].children.push(i)
      })
      this.lines[0].label = res.data.data.taskAndPoles.task.circuitry.circuitryName;
      window.console.log(res.data);
    })
    .catch((err) => { 
      window.console.log("错误",err)
    })
  },
  computed: {
    ...mapState([
      'isAdd'
    ]),
  },
  watch: {
    '$route': 'getParams'
  },
  mounted() {
    // 页面加载完后显示当前时间
    this.form.findDate = this.addDate()
    // 定时刷新时间
    let _this = this
    // 定时器
    this.timer = setInterval(function () {
      _this.findDate = _this.addDate() // 修改数据date
    })
  },
  methods: {
    //  获取基本信息
    getParams() {
      this.taskId = this.$route.query.taskId;
    },
    addDate() {
      var nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      let systemDate = date.year + '-' + date.month + '-' + date.date;
      return systemDate;
    },
    // 返回上一页
    backto() {
      this.$router.go(-1);
    },
    // 点击杆号
    handleNodeClick(lines) {

      // 判断点击的杆塔编号
      if(lines.id !== 0) {
        this.form.poleNo = lines.label;
      } else {
        this.form.poleNo= '';
      }
      // 判断是否编辑
      var flags = false;
      if(this.temps.length==0) {
        window.console.log(flags)
      } else {
        for(var i in this.temps) {
          if(this.temps[i].poleNo == lines.label) {
            this.form.defectName = this.temps[i].defectName;
            this.form.defectLevel = this.temps[i].defectLevel;
            this.form.defectsDescribe = this.temps[i].defectsDescribe;
            flags=true;
          }
        }

        if(flags==false) {
          this.form.defectName = '';
          this.form.defectLevel = '';
          this.form.defectsDescribe = '';
        }
      }

      // this.axios.get('http://192.168.6.184:8080/selectRecord',{params:{poleId: lines.id}})
      // .then((res) => {
      //     this.form.defectsName = res.data.data.circuitryPoleRecordVO.damageRecord.defects.defectsName;
      //     this.form.defectsLevel = res.data.data.circuitryPoleRecordVO.damageRecord.defectsLevel;
      //     this.form.defectsDescribe = res.data.data.circuitryPoleRecordVO.damageRecord.defectsDescribe;
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })
    },


    // 保存
    addSave() {
      let msg = {
        poleNo: this.form.poleNo,
        defectsName: this.form.defectName,
        defectsLevel: this.form.defectLevel,
        defectsDescribe: this.form.defectsDescribe
      }

      // 判断数组是否存在（之前保存过）
      var  flag = false;
      if(this.temps.length==0) {
        this.temps.push(msg);
      } else {
        for(var i in this.temps) {
          if(this.temps[i].poleNo == this.form.poleNo) {
            this.temps.splice(i, 1, msg);
            flag=true;
          }
        }

        if(flag==false) {
          this.temps.push(msg);
        }
      }


      // this.axios.post('http://192.168.6.184:8080/insertRecord',{
      //   poleId: this.lines[0].children.poleId,
      //   defectsId: this.form.typeOptions.defectsId,
      //   defectsLevel: this.defectLevel,
      //   findDate: this.findDate,
      //   defectsDescribe: this.defectsDescribe
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })
    },
    modifySave() {
      let msg = {
        poleNo: this.form.poleNo,
        defectsName: this.form.defectName,
        defectsLevel: this.form.defectLevel,
        defectsDescribe: this.form.defectsDescribe
      }

      // 判断数组是否存在（之前保存过）
      var  flag = false;
      if(this.temps.length==0) {
        this.temps.push(msg);
      } else {
        for(var i in this.temps) {
          if(this.temps[i].poleNo == this.form.poleNo) {
            this.temps.splice(i, 1, msg);
            flag=true;
          }
        }

        if(flag==false) {
          this.temps.push(msg);
        }
      }


      // this.axios.post('http://192.168.6.184:8080/updateRecord',{
      //   poleId: this.lines[0].children.poleId,
      //   defectsId: this.form.typeOptions.defectsId,
      //   defectsLevel: this.defectLevel,
      //   findDate: this.findDate,
      //   defectsDescribe: this.defectsDescribe
      // })
      // .then((res) => {
      //   window.console.log(res.data);
      // })
      // .catch((err) => {
      //   window.console.log("错误",err)
      // })
    },
    // 注意在vue实例销毁前，清除我们的定时器。
    destroyed () {
      if (this.timer) { 
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.execute-enter {
  padding: 0 30px 0;

  .title {
    font-weight: 600;
    margin: 15px 0;
  }

  .info-details {
    width: 100%;
    display: flex;
    height: 500px;
    margin-bottom: 10px;
    justify-content: space-between;

    .lines {
      width: 20%;
      height: 100%;
      padding: 0 22px 10px;
      overflow: auto;
      box-sizing: border-box;
      border: 1px solid #000;

      .el-tree {
        margin-top: 10px;
        height: 450px;
        text-align: center;

        &>div:first-child {
          height: 100%;
        }
      }

      .el-tree-node:focus > .el-tree-node__content {
        color: red !important;
      }
    }

    .details {
      width: 75%;
      height: 100%;
      padding: 20px 50px;
      box-sizing: border-box;

      border: 1px solid #000;

      .el-form {

        .el-form-item {
          margin-bottom: 10px;

          .el-input {
            width: 220px;
            height: 30px;
          }

          .area {
            width: 220px;
          }

        }
      }
    }
  }
}



</style>