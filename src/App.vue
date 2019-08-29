<template>
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
          <div v-if="history.length">
            <ul class="list">
              <li v-for="item in history" v-on:click="onClickKeyword(item.keyword)">
                {{item.keyword}}
                <span class="date">{{item.date}}</span>
                <button class="btn-remove" v-on:click.stop="onClickRemoveHistory(item.keyword)"></button>
              </li>
            </ul>
          </div>
          <div v-else>
            최근 검색어가 없습니다.
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

  import SearchModel from './models/SearchModel.js'
  import KeywordModel from './models/KeywordModel.js'
  import HistoryModel from './models/HistoryModel.js'

  export default {
    name: 'app',
    data() {
      return {
        query: '',
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
        selectedTab: '추천 검색어',
        keywords: [],
        history: [],
        searchResult: []
      }
    },
    created(){
      this.selectedTab = this.tabs[0];
      this.fetchKeyword();
      this.fetchHistory();
    },
    methods: {
      onSubmit() {
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
      onClickRemoveHistory(keyword){
        HistoryModel.remove(keyword);
        this.fetchHistory();
      },
      fetchKeyword(){
        KeywordModel.list().then(data => {
          this.keywords = data;
        })
      },
      fetchHistory(){
        HistoryModel.list().then(data => {
          this.history = data;
        })
      },
      search() {
        SearchModel.list().then(data => {
          this.submitted = true
          this.searchResult = data
        })
        HistoryModel.add(this.query);
        this.fetchHistory();
      },
      onReset() {
        this.query = ''
        this.submitted = false
        this.searchResult = []
      }
    }
  }
</script>

<style>
  body, ul {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  img {
    width: 100%;
  }

  .container {
    margin: 0 15px 0 15px;
  }
  header {
    border-bottom: 1px #ccc solid;
    padding: 15px 0  15px 0;
    text-align: center;
  }
  input[type=text] {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 15px 0 15px 0;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #cccccc;

  }
  .content {
    border: 1px solid #ccc;
  }
  ul.tabs {
    display: flex;
  }
  .tabs li {
    display: inline-block;
    width: 50%;
    padding: 15px;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    background-color: #eee;
    color: #999;
  }
  .tabs li.active {
    background-color: #2ac1bc;
    color: #fff;
  }
  .list li {
    box-sizing: border-box;
    display: block;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    position: relative;
  }
  .list li:last-child {
    border-bottom: none;
  }
  .list li .number{
    margin-right: 15px;
    color: #ccc;
  }
  .list li .date{
    position: absolute;
    right: 50px;
    top: 15px;
    margin-right: 15px;
    color: #ccc;
  }
  .list li .btn-remove{
    position: absolute;
    right: 0px;
    top: 15px;
    margin-right: 15px;
  }

  form {
    position: relative;
  }
  .btn-reset,
  .btn-remove {
    border-radius: 50%;
    background-color: #ccc;
    color: white;
    border: none;
    padding: 2px 5px;
  }
  .btn-reset {
    position: absolute;
    top: 12px;
    right: 10px;
  }
  .btn-reset::before,
  .btn-remove::before {
    content: 'X'
  }

  #search-result li {
    display: flex;
    margin-bottom: 15px;
  }
  #search-result img {
    width: 30%;
    height: 30%;
  }
</style>
