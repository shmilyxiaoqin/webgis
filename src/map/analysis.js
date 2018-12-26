import esriLoader from 'esri-loader'

let analysis = function () {
  const options = {
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  return {
    // 缓冲区分析
    buffer: function (feature) {
      esriLoader.loadModules([
        'esri/tasks/GeometryService',
        'esri/tasks/support/BufferParameters',
        'esri/geometry/geometryEngine'
      ], options)
        .then(([
          GeometryService,
          BufferParameters,
          geometryEngine
        ]) => {
          // 如果有多个特征图层需要循环读取所有的几何
          let bufferParameter = feature[0].geometry // 特征图层
          let geometryService = new GeometryService('') // 服务地址
          // 缓冲参数设置
          let params = new BufferParameters({
            // 缓冲区空间参考
            bufferSpatialReference: '2360',
            // 缓冲距离
            distance: 3,
            // 发生缓冲的几何
            geometries: [bufferParameter],
            // 输出缓冲区的空间参考
            outSpatialRefence: '4544',
            // 计算每个缓冲距离的单位。
            unit: GeometryService.UNIT_KILOMETER
          })
          // 执行缓冲区操作
          geometryService.buffer(params).then(function (features) {
            // 对缓冲区结果进行渲染
            console.log(features)
          })
        })
    },
    // 叠加分析
    b: function () {

    },
    // 附近设施分析
    c: function () {

    },
    // 路线分析
    d: function () {

    }
  }
}
export default analysis
