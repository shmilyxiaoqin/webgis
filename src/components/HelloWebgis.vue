<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>请选择组件</h2>
    <ul>
      <li>
        <a
          href="#">
          基本地图加载和操作
        </a>
      </li>
      <li>
        <a href="#">
          地图查询
        </a>
      </li>
      <li>
        <a
          href="#"
          target="_blank"
        >
          地图编辑
        </a>
      </li>
      <li>
        <a
          href="#"
          target="_blank"
        >
          地图分析
        </a>

      </li>
      <br>
      <li>
        <a
          href="#"
          target="_blank"
        >
          地图渲染
        </a>
      </li>
      <li>
        <a
          href="#"
          target="_blank"
        >
          专题图制作
        </a>
      </li>
    </ul>
    <router-view></router-view>
    <!-- <h2>Ecosystem</h2>
     <ul>
       <li>
         <a
           href="http://router.vuejs.org/"
           target="_blank"
         >
           vue-router
         </a>
       </li>
       <li>
         <a
           href="http://vuex.vuejs.org/"
           target="_blank"
         >
           vuex
         </a>
       </li>
       <li>
         <a
           href="http://vue-loader.vuejs.org/"
           target="_blank"
         >
           vue-loader
         </a>
       </li>
       <li>
         <a
           href="https://github.com/vuejs/awesome-vue"
           target="_blank"
         >
           awesome-vue
         </a>
       </li>
     </ul>-->
  </div>
</template>

<script>
export default {
  name: 'HelloWebgis',
  data () {
    return {
      msg: '欢迎进入Webgis开发'
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

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
