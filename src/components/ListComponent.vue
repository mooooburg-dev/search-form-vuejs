<template id="List">
  <div v-if="data.length">
    <ul class="list">
      <li v-for="(item, index) in data" v-on:click="onClickList(item.keyword)">
        <span v-if="type === 'keyword'" class="number">{{index + 1}}</span>
        {{item.keyword}}
        <span v-if="type === 'history'" class="date">{{item.date}}</span>
        <button v-if="type === 'history'" class="btn-remove" v-on:click.stop="onRemoveList(item.keyword)"></button>
      </li>
    </ul>
  </div>
  <div v-else>
    추천 검색어가 없습니다.
  </div>
</template>

<script>
  export default{
    template: '#list',
    props: ['data', 'type'],
    methods: {
      onClickList(keyword){
        this.$emit('@click', keyword);
      },
      onRemoveList(keyword){
        this.$emit('@remove', keyword);
      }
    }
  }
</script>

<style>

</style>
