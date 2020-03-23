<!-- 测试2 -->
<template>
  <div>
    <h1>我是第二个组件</h1>
  </div>
</template>

<script>
import { request } from "../../network/request";

export default {
  data() {
    return {};
  },
  created() {
    request({
      uri: "/selectUser"
    }).then(res => {
      console.log(res);
    });
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>