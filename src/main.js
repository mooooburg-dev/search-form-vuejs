// import Vue from 'vue'
// import App from './App.vue'
//
// Vue.config.productionTip = false
//
// new Vue({
//   render: h => h(App),
// }).$mount('#app')


import SearchModel from './models/SearchModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    searchResult: []
  },
  methods: {
    onSubmit(e){
      this.search();
    },
    onKeyup(){
      if(!this.query.length) this.onReset();
    },
    search(){
      SearchModel.list().then(data =>{
        this.submitted = true;
        this.searchResult = data;
      })
    },
    onReset(){
      this.query = '';
      // todo 검색결과를 숨기는 ...
      // debugger;
    }
  }
})
