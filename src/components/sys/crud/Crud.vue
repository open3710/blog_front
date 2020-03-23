<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="4" :sm="6" :md="11" :lg="7" :xl="11">
        <div class="grid-content bg-purple">
          <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button class="filter-item" type="danger" icon="el-icon-delete" size="mini"  @click="del">删除</el-button>
          <el-button class="filter-item" size="mini" type="warning" icon="el-icon-download">导出</el-button>
        </div>
      </el-col>
      <el-col :xs="80" :sm="6" :md="4" :lg="15" :xl="1">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="2" :xl="1">
        <div class="grid-content bg-purple-light">
          <el-button-group class="crud-opts-right">
            <el-button size="mini" plain type="info" icon="el-icon-search" />
            <el-button size="mini" icon="el-icon-refresh" />
          </el-button-group>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      crud: {
        add: "add",
        del: "del",
        exp: "exp",
        sel: "sel"
      }
    };
  },
  methods: {
    add() {
      this.$emit("add", this.crud.add);
    },
    del() {
      this.$emit("del", this.crud.del);
    },
    exp() {
      this.$emit("exp", this.crud.exp);
    },
    sel() {
      this.$emit("sel", this.crud.sel);
    }
  }
};
</script>

<style>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
