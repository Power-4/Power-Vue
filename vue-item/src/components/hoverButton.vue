<template>
  <div>

    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
      :unique-opened="true"

       background-color="#5ee4e4"
       text-color="#fff"
       active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid myIc"></i>
          <span slot="title">个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/a">待办列表</el-menu-item>
          <el-menu-item index="/a/selfmsg">个人资料修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-tools myIc"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system">角色管理</el-menu-item>
          <el-menu-item index="/system/users">用户管理</el-menu-item>
          <el-menu-item index="/system/power">角色权限管理</el-menu-item>
          <el-menu-item index="/system/config">系统配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="3" route="/towar">
        <i class="el-icon-s-flag myIc"></i>
        <span slot="title" >杆塔管理</span>
      </el-menu-item>

      <el-menu-item index="4" route="/line">
        <i class="el-icon-guide myIc"></i>
        <span slot="title" >线路管理</span>
      </el-menu-item>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-release myIc"></i>
          <span slot="title">缺陷管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/defect">缺陷类型名称</el-menu-item>
          <el-menu-item index="/defectLevel">缺陷等级确认</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-position myIc"></i>
          <span slot="title">巡检管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/inspect">巡检任务制定与分配</el-menu-item>
          <el-menu-item index="/inspect/insexecute">巡检任务执行与回执</el-menu-item>
           <el-menu-item index="/inspect/insdefect">缺陷查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-suitcase-1 myIc"></i>
          <span slot="title">消缺管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/repair">消缺任务制定与分配</el-menu-item>
          <el-menu-item index="/repairperform">消缺任务执行与回执</el-menu-item>
           <el-menu-item index="/repairquery">消缺查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="8" :disabled="quan<4">
        <template slot="title">
          <i class="el-icon-tickets myIc"></i>
          <span slot="title">信息统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/total?name=xun">巡检记录</el-menu-item>
          <el-menu-item index="/total?name=xiao">消缺记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.myIc::before{
  color: rgb(255, 255, 255);
}

</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      quan:5,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    }
  }
};
</script>