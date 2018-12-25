<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: #eee">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组1</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <div id="mapView"></div>
          <div class="tol-bar" style="display: none">
            <div id="line-button" class="esri-widget esri-widget--button esri-interactive" title="画线">
              <span class="esri-icon-polyline"></span>
            </div>
            <div id="area-button" class="esri-widget esri-widget--button esri-interactive" title="画面">
              <span class="esri-icon-polygon"></span>
            </div>
            <div id="point-button" class="esri-widget esri-widget--button esri-interactive" title="画点">
              <span class="esri-icon-radio-checked"></span>
            </div>
            <div id="multipoint-button" class="esri-widget esri-widget--button esri-interactive" title="画多点">
              <span class="esri-icon-handle-horizontal"></span>
            </div>
          </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import createMap from '../map/creatMap.js'
import widgets from '../map/widgets.js'
import editTool from '../map/editTool'

export default {
  data () {
    return {
      map: {}
    }
  },
  methods: {
    createMap () {
      this.map.create()
      let t = setInterval(() => {
        if (this.map.view) {
          widgets(this.map.view)
          editTool(this.map.view)
          clearInterval(t)
        }
      }, 200)
    }
  },
  mounted () {
    this.map = createMap
    this.createMap()
  }
}

</script>

<style scoped>
  @import url('https://js.arcgis.com/4.7/dijit/themes/tundra/tundra.css');
  @import url('https://js.arcgis.com/4.7/esri/css/main.css');

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-menu, .el-menu-item {
    background-color: #eeeeee;
  }

  .el-aside {
    color: #545c64;
  }

  #mapView {
    margin: 0;
    padding: 0;
    width: 951px;
    height: 736px;
  }
  .esri-widget--button{
    font-size: 14px;
    background-color: #fff;
    color: #6e6e6e;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition: background-color 125ms ease-in-out;

  }
</style>
