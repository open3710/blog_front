<!--  -->
<template>
  <div>
    <el-row :gutter="0">
      <el-col :xs="80" :sm="60" :md="40" :lg="6" :xl="1">
        <div class="grid-content bg-purple">
            <slot name="logo"></slot>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple">
            <slot name="home"></slot>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1">
        <div class="grid-content bg-purple">
            <slot name="seach"></slot>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple">
            <slot name="login"></slot>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple">
            <slot name="register"></slot>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light">
            <slot name="logout"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 400px;
  display: flex;
  text-align: center;
 
}

.grid-content {
  border-radius: 4px;
  min-height: 60px;
  background-color: 99a9bf;
  align-items: center;
  display: flex;
  text-align: center;
  
}

</style>