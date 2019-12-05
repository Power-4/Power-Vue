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
      <el-submenu index="1" :disabled="list[2]">
        <template slot="title">
          <i class="el-icon-user-solid myIc"></i>
          <span slot="title">个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/a" :disabled="list[3]">待办列表</el-menu-item>
          <el-menu-item index="/a/selfmsg" :disabled="list[4]">个人资料修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2" :disabled="list[5]">
        <template slot="title">
          <i class="el-icon-s-tools myIc"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system" :disabled="list[6]">角色管理</el-menu-item>
          <el-menu-item index="/system/users" :disabled="list[7]">用户管理</el-menu-item>
          <el-menu-item index="/system/power" :disabled="list[8]">角色权限管理</el-menu-item>
          <el-menu-item index="/system/config" :disabled="list[9]">系统配置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="3" route="/towar" :disabled="list[10]">
        <i class="el-icon-s-flag myIc"></i>
        <span slot="title">杆塔管理</span>
      </el-menu-item>

      <el-menu-item index="4" route="/line" :disabled="list[11]">
        <i class="el-icon-guide myIc"></i>
        <span slot="title" >线路管理</span>
      </el-menu-item>

      <el-submenu index="5" :disabled="list[12]">
        <template slot="title">
          <i class="el-icon-s-release myIc"></i>
          <span slot="title">缺陷管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/defect?name=type" :disabled="list[13]">缺陷类型名称</el-menu-item>
          <el-menu-item index="/defectLevel?name=level" :disabled="list[14]">缺陷等级确认</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="6" :disabled="list[15]">
        <template slot="title">
          <i class="el-icon-position myIc"></i>
          <span slot="title">巡检管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/inspect" :disabled="list[16]">巡检任务制定与分配</el-menu-item>
          <el-menu-item index="/inspect/insexecute" :disabled="list[17]">巡检任务执行与回执</el-menu-item>
          <el-menu-item index="/inspect/insdefect" :disabled="list[18]">缺陷查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="7" :disabled="list[19]">
        
        <template slot="title">
          <i class="el-icon-suitcase-1 myIc"></i>
          <span slot="title">消缺管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/repair" :disabled="list[20]">消缺任务制定与分配</el-menu-item>
          <el-menu-item index="/repairperform" :disabled="list[21]">消缺任务执行与回执</el-menu-item>
          <el-menu-item index="/repairquery" :disabled="list[22]">消缺查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="8" :disabled="list[23]">
        <template slot="title">
          <i class="el-icon-tickets myIc"></i>
          <span slot="title">信息统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/total?name=xun" :disabled="list[24]">巡检记录</el-menu-item>
          <el-menu-item index="/total?name=xiao" :disabled="list[25]">消缺记录</el-menu-item>
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
.myIc::before {
  color: rgb(255, 255, 255);
}
.color {
  color: red
}
</style>

<script>

export default {
  data() {
    return {
      isCollapse: false,
      quan: 5,
      list: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    }
  },
  created() {

      for(var i=0;i<30;i++)
      {
        this.list.push(true)
      }
    
    
    
    this.axios.get("/permission/getResources")
     .then((res)=>{
      
       window.console.log("权限判断的",res)

        res.data.data.resourceList.forEach((item)=>{
             if(item.systemPropertiesValue.sysProValueName=="启用")
             {     
                 
                  this.list.splice(item.resourcesId,1,false)
             }  
             
        }) 

      window.console.log( "这是我家的",this.list)

     })
     .catch((err)=>{
       window.console.log(err)
     })
  }
};
</script>