<template>
  <div>
 
    <el-menu
      background-color="#000000"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="menuClick"
      unique-opened
      router
     
    >
      <el-submenu  :index="index+item.permissionName" v-for="(item,index) in this.permisssions" :key="index" v-if="item.permissionEnabled==1" >
        <template slot="title">
          <i :class="item.permissionIconcls"></i>
          <span>{{item.permissionName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="child.permissionUrl" v-for="(child,j) in item.permissions" :key="j" vue-router >{{child.permissionName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
import { request } from "../../network/request";

export default {
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      permisssions:[]
    };
  },
  methods: {
    // 点击菜单跳转页面
    menuClick(index, indexPath) {
      let newTabName = ++this.$store.state.tabIndex + "";
      let tabs = {
        title: index,
        name: newTabName,
        content: "BlogUser"
      };
      this.$store.commit("addTab", tabs);
      // this.$router.push(index);
    }
  },
  created() {
    request({
      url: "blogPermission/getByNameUserPermission",
      method: "post",
      params: {
        userName: this.user.username
      }
    }).then(res => {
      if(res.status == 200){
        this.permisssions=res.data
      }

    });
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>