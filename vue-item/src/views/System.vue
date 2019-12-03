<template>
  <div class="system">
    <nav>
      <router-link to="/system" @click.native="isCheck=1" :class="[isCheck==1 ? c1 : c2]">角色管理</router-link>


      <router-link @click.native="isCheck=2" :class="[isCheck==2 ? c1 : c2]" to="/system/users">用户管理</router-link>


      <router-link
        @click.native="isCheck=3"
        :class="[isCheck==3 ? c1 : c2]"
        to="/system/power"
      >角色权限管理</router-link>


      <router-link
        @click.native="isCheck=4"
        :class="[isCheck==4 ? c1 : c2]"
        to="/system/config"
      >系统配置</router-link>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      c1: "checked",
      c2: "sec-butt",
      isCheck: 1
    };
  }
};
</script>

<style lang="less" scoped>
.system {
  float: left;
  width: 980px;
  padding: 10px;
}
nav {
  width: 80%;
  margin: 0 auto;
  border: 1px solid rgb(112, 30, 15);
}
.a {
  text-decoration: none;
  display: inline-block;
  text-align: center;
  line-height: 25px;
  width: 120px;
  margin: 5px 10px;
  border-radius: 5px;
}
.sec-butt {
  .a();
  background-color: rgb(224, 224, 224);
  color: rgb(153, 153, 153);
}
.checked {
  .a();
  background-color: #5ee4e4;
  color: white;
}
</style>