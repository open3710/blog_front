<template>
  <div>
    <crud @add="add" @del="del" />
    <!-- 新增画面位置 -->
    <el-dialog :title="addOrUpdateTitle" :visible.sync="dialogVisible" width="30%">
      <AddOrUpd @isShow="isShow" :updateData="updateData"></AddOrUpd>
    </el-dialog>

    <el-row :gutter="20">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%" stripe @selection-change="selsChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="roleName" label="名称" width="80"></el-table-column>
              <el-table-column prop="roleDescription" label="描述" width="180"></el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="updateBlogRole(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteBlogRole(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="padding: 14px;">
            <span>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page.currentPage"
                  :page-sizes=" [10, 20, 30, 50]"
                  :page-size="page.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="page.total"
                ></el-pagination>
              </div>
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="13">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>权限列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%" stripe>
              <el-table-column prop="roleName" label="日期" width="180"></el-table-column>
              <el-table-column prop="roleDescription" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crud from "../../../components/sys/crud/Crud.vue";
import AddOrUpd from "./AddOrUpdRole.vue";
import { request } from "../../../network/request";

export default {
  data() {
    return {
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      dialogVisible: false,
      tableData: [],
      addOrUpdateTitle: "新增角色",
      updateData: [],
      guid: ""
    };
  },
  methods: {
    selsChange(sels) {
      // 获取多选按钮选中数据
      let guids = "";
      for (let val of sels) {
        guids += val.roleGuid + ",";
      }
      this.guid = guids.substring(0, guids.length - 1);
    },
    isShow(flag) {
      // 获取子组件传递过来的值，是否隐藏新增修改页面
      setTimeout(() => {
        this.dialogVisible = flag;
        this.initTable();
      }, 500);
    },
    initTable() {
      // 初始化表格
      request({
        url: "/blogRole/selectPageResult",
        method: "get",
        params: {
          pageSize: this.page.pageSize,
          pageNum: this.page.currentPage
        }
      }).then(res => {
        this.tableData = res.data.data.list;
        this.page.total = res.data.data.total;
      });
    },
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.initTable();
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.initTable();
    },
    add(data) {
      this.dialogVisible = true;
      this.addOrUpdateTitle = "新增角色";
      // 新增是清空对象数据
      this.updateData = {};
    },
    del(data) {
      this.deleteBlogRole(0, 0, this.guid);
    },
    deleteBlogRole(index, row, guid) {
      let ids ="";
      if(row ==""){
        ids = guid;
      }else{
        ids =row.roleGuid
      }
      if(ids == ""){
        this.$message.error("请选择要删除的角色！！！")
        return ;
      }
      
      this.$confirm("你确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "blogRole/deleteBlogRole",
            method: "post",
            params: {
              guids: ids
            }
          })
            .then(res => {
              if (res.data.code == 200 && res.data.data == true) {
                this.$message({
                  type: "success",
                  message: res.data.message
                });
                this.initTable();
              }
            })
            .catch(err => {
              this.$message.error("操作失败，原因是：" + err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你取消了"
          });
        });
    },
    updateBlogRole(index, row) {
      this.dialogVisible = true;
      this.addOrUpdateTitle = "修改角色";
      this.updateData = row;
    }
  },
  components: {
    crud,
    AddOrUpd
  },
  created() {
    this.initTable();
  }
};
</script>
