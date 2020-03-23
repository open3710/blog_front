<!-- 测试的 -->
<template>
  <div class="tabZujian">
    <el-tabs v-model="activeName">
      <el-tab-pane label="tab1" name="first" :key="'first'">
        <child1></child1>
      </el-tab-pane>

      <el-tab-pane label="tab2" name="second" :key="'second'">
        <child2></child2>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tset2 from './test2.vue'
import Tset3 from './test3.vue'
export default {
  components: {
    child1: Tset2,
    child2: Tset3
  },
  data() {
    return {
      //默认第一个选项卡
      activeName: "first",
    };
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>