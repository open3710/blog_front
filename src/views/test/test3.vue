<!-- 测试三 -->
<template>
  <div>
    <h1>我是第三个组件</h1>
  </div>
</template>

<script>
import { request } from "../../network/request";

export default {
  data() {
    return {
      userInfo:[
        {id:1,name:'小布'},
        {id:2,name:'小蝉'},
      ]
    };
  },
  methods:{
   
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>