<!-- tabs -->
<template>
  <div>
    <el-tabs type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in $store.state.editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >{{item.content}}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.$store.state.editableTabs;
      let activeName = this.$store.state.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.$store.state.editableTabsValue = activeName;
      this.$store.state.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>