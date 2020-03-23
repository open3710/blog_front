<!-- 新增或者修改角色组件 -->
<template>
  <div id="content">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入名称"></el-input>
        <el-input v-model="form.roleGuid" v-if="1==2"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="roleDescription">
        <el-input type="textarea" v-model="form.roleDescription" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { request } from "../../../network/request";

export default {
  props: {
    updateData: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        roleGuid:this.updateData.roleGuid,
        roleName: this.updateData.roleName,
        roleDescription:this.roleDescription
      },
      rules: {
        roleName: [
          { required: true, message: "角色名不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    updateData(val) {
      // 监听父组件传递的数据是否发生改变，改变的话把改变后的赋值给updatData
      this.form = val;
    }
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          request({
            url: "/blogRole/addOrUpdate",
            method: "post",
            params: this.form
          })
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: res.data.message
                });
                // 新增或修改成功清空
                this.$refs[form].resetFields();
                this.$emit("isShow", false);
              }
            })
            .catch(err => {
              this.$mesasge.error("操作失败！！" + err);
            });
        }
      });
    },
    resetForm(from) {
      console.log(12323);
      this.$refs[from].resetFields();
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>