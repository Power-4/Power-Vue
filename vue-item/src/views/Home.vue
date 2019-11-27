<template>
  <div class="home">
    <!-- 
      nav
    -->
    <nav class="top">
      <nav class="top-body"></nav>
    </nav>
    <!-- 
      body
    -->
    <section class="body">
      <!-- 
        left
      -->
      <div class="left">
        <hover-button
          v-for="(item, index) in powerData"
          :key="index"
          :item="item"
        ></hover-button>
      </div>
      <!--
        right
      -->
      <div class="right">
        <router-view></router-view>
      </div>
    </section>
    <!-- <router-link to="/inspect">inspect</router-link>
    <router-view/> -->

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      powerData: [
        "",
        "system",
        "towar",
        "line",
        "defect",
        "inspect",
        "repair",
        "total"
      ],
    };
  },
  components: {
  
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.top {
  width: 100%;
  height: 64px;

  background-color: #5ee4e4;
  margin: 0 auto;
}
.top-body {
  width: 1200px;
  height: 64px;
}
.body {
  margin-top: 10px;
  width: 1200px;
  margin: 0 auto;
}

.left {
  width: 200px;
  line-height: 60px;
  text-align: center;
  float: left;
}
.tab {
  display: block;
}
</style>