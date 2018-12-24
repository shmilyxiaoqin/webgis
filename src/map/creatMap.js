import esriLoader from 'esri-loader'

let ProtoMap = function () {

}
let createMap = new ProtoMap()
createMap.create = function () {
  const options = {
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  esriLoader.loadModules([
    'esri/Map',
    'esri/views/MapView'
  ], options)
    .then(([
      Map,
      MapView
    ]) => {
      const map = new Map({
        basemap: 'streets',
        ground: 'world-elevation'
      })
      let view = new MapView({
        container: 'mapView',
        map: map,
        zoom: 12,
        center: [102.7346125, 25.0563901]
      })
      // 移除自身的标志
      view.ui._removeComponents(['attribution'])
      ProtoMap.prototype.view = view
    }, reason => {
      console.log(reason)
    })
}
export default createMap
