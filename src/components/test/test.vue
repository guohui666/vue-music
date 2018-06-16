<template>
  <div style="text-align: center">
    <div>{{test}}</div>
    <button type="button" @click="test1">测试原生应用js注入</button>
    <p>{{test2}}</p>
  </div>
</template>

<script>
  // import JsBridge from 'common/js/jsBridge'

  export default {
    name: 'test',
    data () {
      return {
        test: '',
        test2: ''
      }
    },
    mounted () {
      this.test = window['token'] + 'mounted'
    },
    methods: {
      test1 () {
        this.test2 = navigator.userAgent
        this.test = window['token']
      }
    }
  }
</script>

<style scoped>
  button {
    height: 35px;
    background: #fefefe;
    border: none;
    margin: 0 auto;
  }
</style>
