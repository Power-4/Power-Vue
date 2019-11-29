<template>
  <div class="right-type">
    <div class="defect">
    <section>
    <router-link to="/defectType" >缺陷类型名称</router-link> |
    <router-link to="/defectLevel">缺陷等级确认</router-link> 
      <router-view></router-view>
    </section>
   </div>
  </div> 
</template>

<script>
  export default {
    name:"defect"
  }
</script>

<style lang="less" scoped>
.defect {
  overflow: hidden;
}

.right-type {
  overflow: hidden;
}

a {
  display: inline-block;
  width: 150px;
  height:30px;  
  line-height: 30px;
  text-decoration: none;
  text-align: center;
  color: #CCC;
}
a:active {
  color:rgb(94,228,228);  
}
  
 .router-link-active {
  color:rgb(94,228,228);
}


</style>