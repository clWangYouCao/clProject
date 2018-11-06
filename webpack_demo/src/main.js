import './main.less';

import Vue from 'vue'; // node_modules 下的vue 没有模板编译
import App from './App.vue';

new Vue({
  el: "#app",
  // components: {
  //   app: App
  // },
  // template: `<app />`,
  render: c => c(App) 
});