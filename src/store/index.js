import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tabs
    editableTabs: [
      {
        title: "Tab 1",
        name: "1",
        content: "Tab 1 content"
      },
      {
        title: "Tab 2",
        name: "2",
        content: "Tab 2 content"
      }
    ],
    editableTabsValue: "2",
    tabIndex: 2,
    // menus
    menuList:[
      {name:'系统管理',path:''},
      {name:'系统管理',path:''},
    ]
  },
  mutations: {
    addTab(state,tabs) {
      // 判断tabs名字是否存在存在则不新增
      let length = state.editableTabs.filter(val =>{
        return val.title == tabs.title
      }).length
      if(length == 0){
        let newTabName = ++this.tabIndex + "";
        state.editableTabs.push(tabs);
        state.editableTabsValue = newTabName;
      }
      
    }
  },
  actions: {
  },
  modules: {
  }
})
