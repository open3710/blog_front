<template>
  <div id="backstage">
    <el-container>
      <el-header>
        <Header>
          <template v-slot:logo>
            <img src="../../assets/img1.png" style="width:50px;height:50px;border-radius: 50px;" />
          </template>
          <template v-slot:logout>
            <el-col :span="12">
              <el-dropdown  @command="persion">
                <span class="el-dropdown-link" style=" color:white">
                  {{user.username}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="psersion">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </template>
        </Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu />
        </el-aside>
        <el-main>
          <Breadcrumb />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "../../components/sys/Menu.vue";
import Breadcrumb from "../../components/sys/Breadcrumb.vue";
import Header from "./Header.vue";
import {request} from "../../network/request";
export default {
  name: "Backstage",
  data() {
    return {
      dynamicTags: [],
      tagsUrl: [],
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  methods: {
    persion(command){
      let logout = "logout";
      let psersion="psersion";
      if(command == logout){
        console.log(logout);
        request({
          url:'logout',
        }).then(res =>{
          if(res.status == 200){
            this.$message({
              type:'info',
              message:"退出成功"
            })
            this.$router.push("/")
          }
        }).catch(err =>{
          this.$message.err("退出失败！原因是"+err)
        })
      } 
    }
  },
  components: {
    Menu,
    Breadcrumb,
    Header
  }
};
</script>

<style>
.dropdown {
  background-color: #f84f4f;
}
.el-header,
.el-footer {
  background-color: #f84f4f;
  color: #fbfbfb;
  text-align: center;
  font-size: 20px;
 
}

.el-aside {
  background-color: #000000;
  color: #fbfbfb;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 670px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 2060px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 3200px;
}
</style>
