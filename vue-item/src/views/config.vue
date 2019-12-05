<template>
  <div class="config">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="lu">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="config-type">
      <el-row>
        <el-button type="primary" @click="add()">新增</el-button>
        <el-button type="primary" @click="seave()">保存</el-button>
        <el-button type="primary" @click="quite()">取消</el-button>
      </el-row>
    </div>
    <div class="type-connect">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column width="55" type="selection" :class="{ischeck:check}"></el-table-column>
        <el-table-column prop="sysProTypeCode" label="配置类型编码" width="150" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sysProTypeCode" style="width:150"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sysProName" label="配置类型名称" width="150" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sysProName" style="width:150"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sysProDescribe" label="描述" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sysProDescribe" style="width:150"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sysProState" label="是否启用" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sysProState" style="width:150"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="icon" @click="icon(one)">
      <i class="el-icon-caret-right" :class="{on:one}"></i>
    </div>

    <div class="child-icon" v-show="isShow">
      <div class="config-parameter">
        <el-row>
          <el-button type="primary" @click="adds()">新增</el-button>
          <el-button type="primary" @click="seaves()">保存</el-button>
          <el-button type="primary" @click="quite()">取消</el-button>
        </el-row>
      </div>
      <div class="parameter-connect">
        <el-table
          :data="tableConnect"
          stripe
          style="width: 100%"
          @selection-change="SelectionChange"
          ref="multipleTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="sysProValueId" label="配置参数ID" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sysProValueId" style="width:250"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="sysProValueName" label="配置参数名称" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sysProValueName" style="width:150"></el-input>
            </template>
          </el-table-column>
          <el-table-column></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableConnect: [],
      Data: [], //父集
      Connect: [], //子集
      one: false,
      isShow: false,
      check: false
    };
  },
  methods: {
    //初始化函数
    Init() {
      this.axios
        .post("/syspro/getAllSysProl")
        .then(res => {
          window.console.log(res.data);
          this.tableData = res.data.data.sysPro;

          res.data.data.sysPro.forEach(item => {
            // window.console.log(item.sysProValues)

            item.sysProValues.forEach(i => {
              i.sysProId;
            });

            if (item.sysProState == 1) {
              item.sysProState = "启用";
            } else {
              item.sysProState = "停用";
            }
          });
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    //子页面选择框
    SelectionChange(val) {
      this.multipleSelection = val;
      // window.console.log(val);
    },
    //父页面选择框
    handleSelectionChange(val) {
      this.check = !this.check;
      // window.console.log(this.check,"点击父集")

      if (this.check == true) {
        this.isShow = true;
        this.one = true;
        // window.console.log(this.isShow,"子打开")
      } else {
        this.isShow = false;
        this.one = false;
        this.tableConnect = [];
        // window.console.log(this.isShow,"子关闭")
      }

      this.multipleSelection = val;
      // window.console.log(val);
      this.Data = [];
      this.Connect = [];

      val.forEach(item => {
        // window.console.log("父集id", item.sysProId);
        // window.console.log("子集", item.id);
        this.Data.push(item.sysProId);
        // this.Connect.push(item.ids);
      });

      // window.console.log("子集", this.Connect);
      // window.console.log("父集id", this.Data[0]);
      // window.console.log("父集", this.tableData);

      this.tableData.forEach(item => {
        // window.console.log("子集信息", item.sysProValues);

        if (item.sysProValues != undefined) {
          item.sysProValues.forEach(i => {
            // window.console.log("子集的id",i.sysProId);
            if (i.sysProId == this.Data[0]) {
              this.tableConnect = item.sysProValues;
              // window.console.log( this.tableConnect);
            }
          });
        } else {
          this.tableConnect = [];
        }
      });
    },
    //父集添加数组
    add() {
      var item = {};
      this.tableData.push(item);
    },
    //子集集添加数组
    adds() {
      var item = {};
      this.tableConnect.push(item);
    },
    //取消
    quite() {
      this.Init();
      window.console.log(1);
    },
    //保存父集信息 - 修改信息
    seave() {
      // window.console.log(this.Data);
      this.Data.forEach(item => {
        window.console.log("保存当前id", item);
        var massage = this.multipleSelection;
        window.console.log("信息", massage);
        // window.console.log(massage[0].sysProDescribe);

        this.axios
          .get("/syspro/addchangeSysPro", {
            params: {
              sysProId: item,
              sysProName: massage[0].sysProName,
              sysProTypeCode: massage[0].sysProTypeCode,
              sysProDescribe: massage[0].sysProDescribe,
              sysProState: massage[0].sysProState == "启用" ? "1" : "0"
            }
          })
          .then(res => {
            window.console.log(res.data);
            this.Init();
          })
          .catch(err => {
            window.console.log(err);
          });
      });
    },
    //保存子集信息 - 修改信息
    seaves() {
      // window.console.log("父集id数组",this.Data);
      this.Data.forEach(item => {
        window.console.log("父集id", item);
        var massage = this.multipleSelection;
        window.console.log("子集信息", massage);
        // window.console.log(massage[0].sysProDescribe);

        this.axios
          .get("/syspro/addSysProValue", {
            params: {
              sysProId: item,
              sysProValueName: massage[0].sysProValueName
            }
          })
          .then(res => {
            window.console.log(res.data);
            this.Init();
            this.check == false;
          })
          .catch(err => {
            window.console.log(err);
          });
      });
    },
    icon() {
      this.isShow = !this.isShow;
      this.one = !this.one;
      window.console.log(this.isShow, "子集打开");
    }
  },
  created() {
    this.axios
      .post("/syspro/getAllSysProl")

      .then(res => {
        window.console.log(res.data);
        this.tableData = res.data.data.sysPro;

        res.data.data.sysPro.forEach(item => {
          // window.console.log(item.sysProValues)

          item.sysProValues.forEach(i => {
            i.sysProId;
          });

          if (item.sysProState == 1) {
            item.sysProState = "启用";
          } else {
            item.sysProState = "停用";
          }
        });
      })
      .catch(err => {
        window.console.log(err);
      });
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

.config-type {
  margin: 60px 0 5px 50px;
}
.config-parameter {
  margin: 30px 0 5px 50px;
}

.type-connect,
.parameter-connect {
  margin-left: 60px;
}

.height {
  height: 20px;
}

.icon {
  width: 80px;
  height: 40px;
  font-size: 26px;
  line-height: 40px;
  margin: 10px 0 0 30px;
  cursor: pointer;
  color: rgb(94, 228, 228);
  text-align: center;
  background: #ffff;
  border: 1px solid rgb(94, 228, 228);
  border-radius: 15px;
}

.on {
  transform: rotate(90deg);
}
</style>