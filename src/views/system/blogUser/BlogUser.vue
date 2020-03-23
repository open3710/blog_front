<template>
  <div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="2">
          <el-button type="danger" @click="batchDel">批量删除</el-button>
        </el-col>
        <el-form-item>
          <el-col :span="5" label-width="50px">
            <el-input v-model="form.name" placeholder="輸入名称"></el-input>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-col>
          <el-col :span="14">
            <el-button type="success" @click="reset">重置</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button plain @click="dialogFormVisibles">新增</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <!-- Form -->
      <el-dialog :title="addEditTitle" width="30%" :visible.sync="dialogFormVisible">
        <el-form
          :model="saveFrom"
          label-width="60px"
          ref="saveFrom"
          :rules="rules"
          class="demo-saveFrom"
        >
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="saveFrom.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="userPwd">
            <el-input type="password" v-model="saveFrom.userPwd" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="userSex">
            <el-radio-group v-model="saveFrom.userSex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="生日" required>
            <el-col :span="100">
              <el-form-item prop="userBirthday">
                <el-date-picker
                  v-model="saveFrom.userBirthday"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="电话" prop="userPhone">
            <el-input v-model="saveFrom.userPhone" placeholder="请输入电话"></el-input>
          </el-form-item>

          <el-form-item
            label="邮箱"
            prop="userEmail"
            :rules="[
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"
          >
            <el-input v-model="saveFrom.userEmail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('saveFrom')">提交</el-button>
            <el-button @click="resetForm('saveFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- .filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      border
      max-height="535"
      v-loading="loading"
      @selection-change="selsChange"
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180" sortable></el-table-column>
      <el-table-column prop="userSex" label="性别" width="180" sortable></el-table-column>
      <el-table-column prop="userBirthday" label="生日" width="180" sortable :formatter="formatDate"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" sortable></el-table-column>
      <el-table-column prop="userPhone" label="电话" sortable></el-table-column>
      <el-table-column align="left" width="200" label="操作" fixed="right">
        <!-- <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>-->
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 10, 20,30,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
const moment = require("moment");
import { request } from "../../../network/request";
import test from "../../test/test3.vue";
export default {
  // stripe显示斑马纹，border显示边框，height="250"固定表头，fixed固定列,max-height最大高度
  data() {
    return {
      guid: "",
      addEditTitle: "",
      saveFrom: {
        userGuid: "",
        userName: "",
        userSex: "男",
        userBirthday: "",
        userPhone: "",
        userPwd: "",
        userEmail: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userPhone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度必须是11位", trigger: "blur" }
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      tableData: [],
      multipleSelection: [],
      search: "",
      form: {
        name: ""
      },
      loading: false,
      // 当前页
      currentPage: 1,
      // 总条数
      total: 0,
      // 每页显示条数
      pageSize: 10,
      dialogFormVisible: false
    };
  },
  methods: {
    batchDel() {
      // 批量删除方法
      if (this.guid.length == 0) {
        this.$message.error("请选择需要删除的用户");
      } else {
        this.$confirm("你确定删除吗？", "提示", {
          confirmButtonText: "确定",
          cancleButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            request({
              url: "/blogUser/delUser",
              method: "post",
              params: {
                guid: this.guid
              }
            })
              .then(res => {
                if (res.data.code == 200 && res.data.data == true) {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  // 重新刷新表格
                  this.getPageResult();
                }
              })
              .catch(error => {
                this.$message.error("删除失败！！");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "你取消了"
            });
          });
      }
    },
    selsChange(sels) {
      // 获取多选按钮选中数据
      let guids = "";
      for (let val of sels) {
        guids += val.userGuid + ",";
      }
      this.guid = guids.substring(0, guids.length - 1);
    },
    formatDate(row, column) {
      // 格式化时间格式方法
      return moment(row.userBirthday).format("YYYY-MM-DD");
    },
    dialogFormVisibles(saveFrom) {
      this.addEditTitle = "新增用户";
      this.dialogFormVisible = true;
      this.$refs[saveFrom].resetFields();
    },
    submitForm(saveFrom) {
      this.$refs[saveFrom].validate(valid => {
        if (valid) {
          request({
            url: "blogUser/addOrUpd",
            params: this.saveFrom,
            method: "post"
          }).then(res => {
            this.dialogFormVisible = false;
            // 重新刷新表格
            this.getPageResult();
            if (res.data.code == 200) {
              if (this.saveFrom.userGuid == '') {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              }
            } else {
              this.$message.error("添加失败！！！" + res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(saveFrom) {
      // 重置表单
      this.$refs[saveFrom].resetFields();
    },
    reset() {
      // 重置
      this.getPageResult();
    },
    getPageResult() {
      // 分页查询数据
      request({
        url: "/blogUser/queryAllByLimit",
        methods: "get",
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        let pageInfo = res.data.data;
        this.total = pageInfo.total;
        this.tableData = res.data.data.list;
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPageResult();
    },
    handleCurrentChange(val) {
      // 当前页方法
      this.currentPage = val;
      this.getPageResult();
    },
    onSubmit() {
      request({
        url: "/blogUser/queryAllByLimit",
        methods: "get",
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          userName: this.form.name
        }
      }).then(res => {
        let pageInfo = res.data.data;
        this.total = pageInfo.total;
        this.tableData = res.data.data.list;
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.addEditTitle = "编辑用户";
      this.saveFrom.userName = row.username;
      this.saveFrom.userSex = row.userSex;
      this.saveFrom.userBirthday = moment(row.userBirthday).format(
        "YYYY-MM-DD"
      );
      this.saveFrom.userPhone = row.userPhone;
      this.saveFrom.userEmail = row.userEmail;
      this.saveFrom.userPwd = row.userPwd;
      this.saveFrom.userGuid = row.userGuid;
    },
    handleDelete(index, row) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "/blogUser/delUser",
            method: "post",
            params: {
              guid: row.userGuid
            }
          }).then(res => {
            if (res.data.code == 200 && res.data.data == true) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getPageResult();
            } else {
              this.$message.error("删除失败！");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你取消了"
          });
        });
    }
  },
  created() {
    // 创建vue实例加载数据
    this.getPageResult();
  },
  components:{
    test
  }
};
</script>