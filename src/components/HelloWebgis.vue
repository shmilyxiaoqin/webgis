<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary"  @click="start()" >进入系统</el-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWebgis',
  data () {
    return {
      msg: '欢迎进入Webgis开发'
    }
  },
  methods: {
    start () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--scoped限制CSS的作用域,尽可能使用类或者元素选择器-->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
</style>
