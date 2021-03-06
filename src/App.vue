<template>
<div id="app">
  <header>
    <h2 class="container">검색</h2>
  </header>

  <div class="container">
    <search-form v-bind:value="query" v-on:@submit="onSubmit" v-on:@reset="onReset"></search-form>
    <div v-if="submitted">
      <search-result v-bind:data="searchResult" v-bind:query="query"></search-result>
    </div>
    <div v-else>
      <tabs v-bind:tabs="tabs" v-bind:selected-tab="selectedTab" v-on:@change="onClickTab"></tabs>

      <div v-if="selectedTab === tabs[0]">
        <list v-bind:data="keywords" type="keyword" v-on:@click="onClickKeyword"></list>
      </div>
      <div v-else>
        <list v-bind:data="history" type="history" v-on:@click="onClickKeyword" v-on:@remove="onClickRemoveHistory"></list>
      </div>

    </div>

  </div>
</div>
</template>

<script>
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import ListComponent from './components/ListComponent.vue'
import TabComponent from './components/TabComponent.vue'

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
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
    'tabs': TabComponent
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(query) {
      this.query = query;
      this.search()
    },
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search();
    },
    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword);
      this.fetchHistory();
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data;
      })
    },
    fetchHistory() {
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
body,
ul {
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
  padding: 15px 0 15px 0;
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

.list li .number {
  margin-right: 15px;
  color: #ccc;
}

.list li .date {
  position: absolute;
  right: 50px;
  top: 15px;
  margin-right: 15px;
  color: #ccc;
}

.list li .btn-remove {
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
