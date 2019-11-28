<template>
  <div id="hoverButton">
    <router-link
      :class="[boolset ? c1 : c2]"
      :to="'/' + item"
      id="butt"
    > <span class="aaa">{{ wordsValue }}<span class="eng"> {{ item == 'a' ? 'PERSON' : item.toUpperCase() }}</span></span></router-link>
  </div>
</template>

<script>
export default {
  name: "hoverButton",
  props: {
    item: String
  },
  data() {
    return {
      wordsValue: "请传入值",
      c1: "butt-click",
      c2: "SlowAlterBac",
      boolset: false
    };
  },
  methods: {
    initWords() {
      switch (this.item) {
        case "a":
          this.wordsValue = "个人信息";
          break;
        case "system":
          this.wordsValue = "系统管理";
          break;
        case "towar":
          this.wordsValue = "杆塔管理";
          break;
        case "line":
          this.wordsValue = "线路管理";
          break;
        case "defect":
          this.wordsValue = "缺陷管理";
          break;
        case "inspect":
          this.wordsValue = "巡检管理";
          break;
        case "repair":
          this.wordsValue = "消缺管理";
          break;
        case "total":
          this.wordsValue = "信息统计";
          break;

        default:
          break;
      }
    }
  },
  created() {
    this.initWords();
  }
};
</script>

<style lang="less" scoped>
#hoverButton {
  height: 60px;
}
.aaa {
  float: left;
  margin-left: 15px;
  line-height: 60px;
}
.eng {

  font-size: 14px;
}
.butt-click {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  background: #5ee4e4;
  color: white;
  margin: 0;
  width: 200px;
  font-size: 20px;
  text-decoration: none;
  border: none;
}
.SlowAlterBac {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  background: #e1e1e1;
  color: #999;
  margin: 0;
  width: 200px;
  font-size: 20px;
  text-decoration: none;
  border: none;

  transform: translateZ(0);
  position: relative;
  transition-property: color;
  transition-duration: 0.3s;
}
.SlowAlterBac:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #5ee4e4;
  transform-origin: 0 50%;
  transform: scaleX(0);
  transition: transform 0.5s ease-out;
}
.SlowAlterBac:hover,
.SlowAlterBac:focus,
.SlowAlterBac:active {
  color: white;
}
.SlowAlterBac:hover:before,
.SlowAlterBac:focus:before,
.SlowAlterBac:active:before {
  transform: scaleX(1);
}
</style>