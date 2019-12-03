<template>
  <div class="level">
    <div class="action">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>任务编号：</label>
            <el-input v-model="submit.taskNo" type="text" class="data" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>线路编号：</label>
            <el-input type="text" v-model="submit.circuitryNo" class="data" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>塔杆编号：</label>
            <el-input type="text" v-model="submit.poleNo" class="data" />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="grid-content bg-purple">
              <label>发现人员：</label>
              <el-input type="text" v-model="submit.findUser" class="data" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷类型：</label>
            <el-select class="data" v-model="submit.defectsName">
              <el-option lable="叉梁断裂" value="叉梁断裂"></el-option>
              <el-option lable="拦河线断裂" value="拦河线断裂"></el-option>
              <el-option lable="绝缘子爆破" value="绝缘子爆破"></el-option>
              <el-option lable="塔杆倾斜" value="塔杆倾斜"></el-option>
              <el-option lable="吊杆变形" value="吊杆变形"></el-option>
              <el-option lable="其他" value="其他"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <label>缺陷级别：</label>
            <el-select v-model="submit.defectsLevel" class="data">
              <el-option value="一般">一般</el-option>
              <el-option value="紧急">紧急</el-option>
              <el-option value="严重">严重</el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple bg-time">
            <label>发现时间：</label>
            <el-date-picker type="date" class="datas" v-model="submit.findDate" value-format="yyyy/MM/DD"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <button type="button" class="btn-query" @click="search( ischeck=false )">查 询</button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="text" class="btn-query" @click="save()">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        align="center"
      >
        <el-table-column prop="taskNo" label="任务编号" width="100" align="center"></el-table-column>
        <el-table-column prop="circuitryNo" label="线路编号" width="100" align="center"></el-table-column>
        <el-table-column prop="poleNo" label="塔杆编号" width="100" align="center"></el-table-column>
        <el-table-column prop="defectsName" label="缺陷类型" width="100" align="center"></el-table-column>
        <el-table-column prop="completionRate" label="完好率" width="100" align="center"></el-table-column>
        <el-table-column prop="defectsDescribe" label="缺陷描述" width="100" align="center"></el-table-column>
        <el-table-column prop="findDate" label="发现时间" width="100" align="center"></el-table-column>
        <el-table-column prop="findUser" label="发现人员" width="100" align="center"></el-table-column>
        <el-table-column prop="defectsLevel" label="缺陷级别" align="center">
          <template slot-scope="scope">
            <el-select class="selectOne" v-model="scope.row.selectOne">
              <el-option value="一般">一般</el-option>
              <el-option value="紧急">紧急</el-option>
              <el-option value="严重">严重</el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          class="pages"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefectLevel",
  data() {
    return {
      tableData: [],
      a: 0,
      // 分页数据 一页显示最大数，当前页数
      pagesize: 5,
      currpage:1,
      count: null,
      ischeck:false,
      // 查询所需要的数据
      submit: {taskNo: "",circuitryNo: "",poleNo: "",findUser: "",defectsName: "",defectsLevel: "",findDate: ""}
    };
  },
  methods: {
    //初始化加载函数
    Init(){
      this.axios
      .post("http://192.168.6.184:8080/defectsOrchid/getDefectsByPage", {
        currentPage: this.currpage,
        pageSize: this.pagesize
      })
      .then(res => {
        window.console.log(res.data);
        this.tableData = res.data.data.defects;
        this.count = res.data.data.count;
      })
      .catch(err => {
        window.console.log(err);
      });
    },
    //查询
    search() {
      window.console.log("所查询的信息",this.submit);
      this.ischeck = true;
    },
    //保存
    save() {
      this.tableData.forEach((item,index)=> {
        if(index < this.pagesize){
          window.console.log('当前保存',item.selectOne)
        }
      })
    },
    //分页函数  每页几条
    handleSizeChange(val) {
      this.pagesize = val;
    },
    // 当前页数
    handleCurrentChange(val) {
      window.console.log("当前页",val)
      if(this.ischeck == true) {
        window.console.log("当前是查询分页",this.ischeck)

      }else{
        window.console.log("当前是初始化分页",this.ischeck)

        this.axios.post("http://192.168.6.184:8080/selectAllDefects", {
        currentPage:val,
        pageSize:this.pagesize
        })
        .then(res => {
        window.console.log(res.data);
        this.tableData = res.data.data.defectsVO;
        this.count = res.data.data.count;
        
        })
        .catch(err => {
        window.console.log(err);
        });
      }
    }
  },
    created() {
    this.axios.post("http://192.168.6.184:8080/selectAllDefects", {
      currentPage:this.currpage, 
      pageSize:this.pagesize
    })
    .then(res => {
    window.console.log(res.data);
    this.tableData = res.data.data.defectsVO;
    this.count = res.data.data.count;
    
    })
    .catch(err => {
    window.console.log(err);
  });
  }
};
</script>


<style lang="less" scoped>
.level {
  padding: 0 20px;
}

.data {
  width: 120px;
  height: 26px;
}
.datas {
  width: 140px;
  height: 26px;
}

.el-row {
  padding: 20px 0;
}

.bg-purple {
  width: 220px;
}
.bg-time {
  width: 240px;
}

.btn-query {
  width: 120px;
  height: 30px;
  background: rgb(94, 228, 228);
  border: 0;
  border-radius: 5px;
  color: #fff;
  padding: 0 15px;
  outline: none;
  float: right;
  margin-right: 20px;
}

.btn {
  float: left;
}

.btn-query:active {
  background: rgb(31, 184, 184);
}

.selectOne {
  border-radius: 5px;
}

.pages {
  float: right;
}
</style>