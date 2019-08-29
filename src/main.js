// import Vue from 'vue'
// import App from './App.vue'
//
// Vue.config.productionTip = false
//
// new Vue({
//   render: h => h(App),
// }).$mount('#app')


new Vue({
  el: '#app',
  data: {
    query: ''
  },
  methods: {
    onSubmit(e){

    },
    onKeyup(){
      if(!this.query.length) this.onReset();
    },
    onReset(){
      this.query = '';
      // todo 검색결과를 숨기는 ...
      debugger;
    }
  }
})
