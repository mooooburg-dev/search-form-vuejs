<template>

  <!-- <div id="app">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div> -->

  <div id="app">
    <header>
      <h2 class="container">검색</h2>
    </header>

    <div class="container">
      <form v-on:submit.prevent="onSubmit">
        <input type="text" v-model="query" v-on:keyup="onKeyup" placeholder="검색어를 입력하세요" autofocus />
        <button v-show="query.length" v-on:click="onReset" type="reset" class="btn-reset"></button>
      </form>

      <div v-if="submitted">
        <div v-if="searchResult.length">
          <ul>
            <li v-for="item in searchResult">
              <img v-bind:src="item.image">{{item.name}}
            </li>
          </ul>
        </div>
        <div v-else>
          {{query}} 검색어로 찾을수 없습니다.
        </div>
      </div>
      <div v-else>
        <ul class="tabs">
          <li v-for="tab in tabs" v-bind:class="{active: tab === selectedTab}" v-on:click="onClickTab(tab)">
            {{tab}}
          </li>
        </ul>

        <div v-if="selectedTab === tabs[0]">
          <div v-if="keywords.length">
            <ul class="list">
              <li v-for="(item, index) in keywords" v-on:click="onClickKeyword(item.keyword)">
                <span class="number">{{index + 1}}</span>
                {{item.keyword}}
              </li>
            </ul>
          </div>
          <div v-else>
            추천 검색어가 없습니다.
          </div>
        </div>
        <div v-else>
          최근 검색어 목록
        </div>

      </div>

    </div>
  </div>

</template>

<script>

  import SearchModel from './models/SearchModel.js'
  import KeywordModel from './models/KeywordModel.js'

  export default {
    name: 'app',
    data() {
      return {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '추천 검색어',
        keywords: [],
        searchResult: []
      }
    },
    created(){
      this.selectedTab = this.tabs[0];
      this.fetchKeyword();
    },
    methods: {
      onSubmit(e) {
        this.search()
      },
      onKeyup() {
        if (!this.query.length) this.onReset()
      },
      onClickTab(tab) {
        this.selectedTab = tab
      },
      onClickKeyword(keyword){
        this.query = keyword;
        this.search();
      },
      fetchKeyword(){
        KeywordModel.list().then(data =>{
          this.keywords = data;
        })
      },
      search() {
        SearchModel.list().then(data => {
          this.submitted = true
          this.searchResult = data
        })
      },
      onReset() {
        this.query = ''
        // todo 검색결과를 숨기는 ...
        // debugger;
        this.submitted = false
        this.searchResult = []
      }
    }
  }

  // import SearchModel from './models/SearchModel.js'
  //
  // new Vue({
  //   el: '#app',
  //   data: {
  //     query: '',
  //     submitted: false,
  //     tabs: ['추천 검색어', '최근 검색어'],
  //     selectedTab: '추천 검색어',
  //     searchResult: []
  //   },
  //   created(){
  //     this.selectedTab = this.tabs[0];
  //   },
  //   methods: {
  //     onSubmit(e){
  //       this.search();
  //     },
  //     onKeyup(){
  //       if(!this.query.length) this.onReset();
  //     },
  //     onClickTab(tab){
  //       this.selectedTab = tab;
  //     },
  //     search(){
  //       SearchModel.list().then(data =>{
  //         this.submitted = true;
  //         this.searchResult = data;
  //       })
  //     },
  //     onReset(){
  //       this.query = '';
  //       // todo 검색결과를 숨기는 ...
  //       // debugger;
  //       this.submitted = false;
  //       this.searchResult = [];
  //     }
  //   }
  // })

</script>

<style>
/*
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */

</style>
