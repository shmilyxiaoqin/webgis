import esriLoader from 'esri-loader'
let widgets = function (view) {

  console.log(view)
  const options = {
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  esriLoader.loadModules([
    'esri/widgets/BasemapGallery',
    'esri/widgets/Home',
    'esri/widgets/Fullscreen',
    'esri/widgets/ScaleBar',
    'esri/widgets/LayerList',
    'esri/widgets/Search'
  ],options)
    .then(([
      BasemapGallery,
      Home,
      Fullscreen,
      ScaleBar,
      LayerList,
      Search
    ]) => {
      // 基础图层集合
      const basemapGallery = new BasemapGallery({
        view: view
      })
      view.ui.add(basemapGallery,'top-right')
      // 回到初始地图
      const home =new Home({
        view: view
      })
      view.ui.add(home,'top-left')
      // 全屏显示
      const fullScreen = new Fullscreen({
        view: view
      })
      view.ui.add(fullScreen,'top-left')
      // 比例尺
      const scaleBar= new ScaleBar({
        view: view
      })
      view.ui.add(scaleBar,'top-left')
      // 图层列表
      const layerList = new LayerList({
        view:view
      });
      view.ui.add(layerList,'top-left')
      // 搜索
      const search = new Search({
        view:view
      })
      view.ui.add(search,'top-left')
    })
}
export default widgets
