import esriLoader from 'esri-loader'

let search = function (view) {
  const options = {
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  return {
    // 空间查询
    query: function () {
      esriLoader.loadModules([
        'esri/tasks/QueryTask',
        'esri/tasks/support/Query',
        'esri/geometry/SpatialReference',
        'esri/layers/GraphicsLayer',
        'esri/Graphic'
      ], options)
        .then(([
          QueryTask,
          Query,
          SpatialReference
        ]) => {
          let queryTask = new QueryTask({
            url: '' // 查询的特征图层
          })
          let query = new Query()
          query.returnGeometry = true
          query.outFields = ['*']
          query.where = 'pop &gt; 1000000'
          query.outSpatialRefence = new SpatialReference({wkid: 2360})
          queryTask.execute(query)
            .then(search.showResults())
        })
    },
    // 属性和空间查询
    identify: function () {
      esriLoader.loadModules([
        'esri/tasks/IdentifyTask',
        'esri/tasks/support/IdentifyParameters'
      ], options)
        .then(([
          IdentifyTask,
          IdentifyParameters
        ]) => {
          let identifyTask = new IdentifyTask({
            url: '' // 查询的图层
          })
          // 待嵌入模板小部件
          let identify = new IdentifyParameters({
            layerIds: [], // 输入要查询的图层ID
            returnGeometry: true,
            outSpatialReference: '2360'
          })
          identifyTask.execute(identify).then(function (results) {
            // 将显示结果显示在模板上
            console.log(results)
          })
        })
    },
    // 属性查询
    find: function () {
      esriLoader.loadModules([
        'esri/tasks/FindTask',
        'esri/tasks/support/FindParameters'
      ], options)
        .then(([
          FindTask,
          FindParameters,
          SpatialReference
        ]) => {
          let find = new FindTask({
            url: '' // 需要查询的图层
          })
          let findParameters = new FindParameters({
            container: true, // 是否完全匹配
            layerIds: [], // 查询的某一个或者某几个图层
            searchFields: ['*'], // 查询的字段
            returnGeometry: true,
            outSpatialReference: '2360',
            searchText: ['*'] // 跨层搜索字段搜索文本
          })
          find.execute(findParameters)
            .then(function (results) {
              // 处理查询结果
              console.log(results)
            })
        })
    },
    // 处理查询结果
    showResults: function (results) {
      esriLoader.loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic'
      ], options)
        .then(([
          GraphicsLayer,
          Graphic
        ]) => {
          let tempGraphic = new Graphic({
            geometry: '', // 查询结果的图形化表达
            symbol: '', // 将结果进行符号化表达
            popupTemplate: { // 添加模板小部件
              title: '{Name}',
              content: [{
                type: 'fields',
                fieldInfos: [{
                  fieldName: 'Name'
                }, {
                  fieldName: 'Owner'
                }, {
                  fieldName: 'Length'
                }]
              }]
            }
          })
          // 将临时图层添加到地图视图中
          view.graphics.add(tempGraphic)
        })
    }
  }
}
export default search
