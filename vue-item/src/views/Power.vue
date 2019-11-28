<template>
  <div class="power">
    <div class="slec">
      <span>选择角色：</span>
      <el-select v-model="slecRole" @change="getPower" placeholder="--请选择要修改的权限--">
        <el-option v-for="item in roles" :label="item.name" :value="item.roleId" :key="item.roleId"></el-option>
      </el-select>
    </div>
    <div class="abc">
      <el-checkbox class="cBox" v-model="power.role">角色管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">用户管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">角色权限管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">杆塔管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">线路管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">缺陷管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">线路管理</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">信息统计</el-checkbox>
      <el-checkbox class="cBox" v-model="power.role">消缺管理</el-checkbox>
      <div class="elbtnel">
        <el-button class="elb" @click="cancel">取消修改</el-button>
        <el-button class="elb" @click="saveBtn">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 根据角色id roleId加载权限
    getPower(slecRole) {
      window.console.log(slecRole);
    },
    // 取消按钮
    cancel() {
      this.power.role = this.power2.role;
    },
    // 弹出成功提示
    ok(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: "success"
      });
    },
    // 完成提示
    saveBtn() {
      this.ok("修改成功");
    }
  },
  data() {
    return {
      // select 选择的角色
      slecRole: "",
      // 角色列表，需要包括名字和Id
      roles: [
        {
          name: "王波管理员",
          roleId: "1"
        },
        {
          name: "管理员",
          roleId: "2"
        },
        {
          name: "员",
          roleId: "3"
        }
      ],
      // 获取的用户权限信息
      power: {
        role: true
      },
      // 获取的用户权限信息
      power2: {
        role: true
      }
    };
  }
};
</script>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #5ee4e4;
  border-color: #5ee4e4;
}
.power {
  width: 980px;
  margin: 0 auto;
}
.slec {
  margin-top: 25px;
  margin-left: 45px;
}
.abc {
  padding-top: 30px;
  width: 800px;
  margin: 0 auto;
}
.cBox {
  margin-top: 20px;
  padding: 0 60px;
}
.elb {
  float: right;
  margin-left: 30px;
}
.elbtnel {
  margin-top: 30px;
}
</style>