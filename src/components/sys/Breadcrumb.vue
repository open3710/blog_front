<template>
  <div class="example-container" style="padding-bottom:10px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >{{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    data() {
      return {
        breadList: [] // 路由集合
      };
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },
    methods: {
      isHome(route) {
        return route.name === '首页';
      },
      getBreadcrumb() {
        let matched = this.$route.matched;
        //如果不是首页
        if (!this.isHome(matched[0])) {
          matched = [{path: '/backstage'}].concat(matched);
        }
        this.breadList = matched;
      }
    },
    created() {
      this.getBreadcrumb();
    }
  }
</script>
