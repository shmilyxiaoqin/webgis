import esriLoader from 'esri-loader'

let widgets = function (view) {
  const options = {
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  esriLoader.loadModules([
    'esri/widgets/BasemapGallery',
    'esri/widgets/Home',
    'esri/widgets/Fullscreen',
    'esri/widgets/ScaleBar',
    'esri/widgets/LayerList',
    'esri/widgets/Search',
    'esri/widgets/Expand',
    'esri/widgets/Legend',
    'esri/widgets/BasemapToggle',
    'esri/widgets/Print'
  ], options)
    .then(([
      BasemapGallery,
      Home,
      Fullscreen,
      ScaleBar,
      LayerList,
      Search,
      Expand,
      Legend,
      BasemapToggle,
      Print
    ]) => {
      // 基础图层集合
      const baseMapGallery = new BasemapGallery({
        view: view
      })
      const baseMapGalleryExpand = new Expand({
        expandIconClass: 'esri-icon-basemap',
        view: view,
        content: baseMapGallery
      })
      view.ui.add(baseMapGalleryExpand, 'top-right')
      // 回到初始地图
      const home = new Home({
        view: view
      })
      view.ui.add(home, 'top-left')
      // 全屏显示
      const fullScreen = new Fullscreen({
        view: view
      })
      view.ui.add(fullScreen, 'top-left')

      // 图层列表
      const layerList = new LayerList({
        view: view
      })
      const layerListExpand = new Expand({
        expandIconClass: 'esri-icon-layer-list',
        view: view,
        content: layerList.domNode
      })
      view.ui.add(layerListExpand, 'top-right')
      // 搜索
      const search = new Search({
        view: view
      })
      const searchExpand = new Expand({
        expandIconClass: 'esri-icon-search',
        view: view,
        content: search
      })
      view.ui.add(searchExpand, 'top-right')
      // 比例尺
      const scaleBar = new ScaleBar({
        view: view
      })
      view.ui.add(scaleBar, 'bottom-left')
      // 图例
      const legend = new Legend({
        view: view
      })
      view.ui.add(legend, 'bottom-right')
      // 底图转换
      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: 'hybrid'
      })
      view.ui.add(basemapToggle, 'bottom-right')
      const print = new Print({
        view: view,
        printServiceUrl: 'http://localhost:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
        container: document.createElement('div'),
        templateOptions: {
          dpi: 350
        }
      })
      const printExpand = new Expand({
        view: view,
        content: print.container,
        declaredClass: 'esri-print-expand',
        expandIconClass: 'esri-icon-printer',
        expandTooltip: '导出地图'
      })
      view.ui.add(printExpand, 'top-left')
    })
}
export default widgets
