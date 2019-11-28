<template>
  <div class="self">
    <nav>
      <router-link @click.native="isCheck=true" :class="[isCheck ? c1 : c2]" to="/a">代办列表</router-link>
      <router-link @click.native="isCheck=false" :class="[isCheck ? c2 : c1]" to="/a/selfmsg">个人资料修改</router-link>
    </nav>
    <!-- 代办事件流程图 -->
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
      isCheck: true
    };
  }
};
</script>


<style lang="less" scoped>
.self {
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