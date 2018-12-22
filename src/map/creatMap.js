import esriLoader from 'esri-loader'
import widgets from './widgets'
let protoMap = function(){

}
let createMap = new protoMap()
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
        basemap: 'streets'
      })
      let view = new MapView({
        container: 'mapView',
        map: map,
        zoom: 12,
        center: [102.7346125, 25.0563901]
      })
      console.log(createMap)
      console.log(createMap.prototype)
      console.log(protoMap)
      console.log(protoMap.prototype)
      protoMap.prototype.view = view
      console.log('获取到值')
      // widgets(view)
    }, reason => {
      console.log(reason)
    })
}
/*let createMap=function () {
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
        basemap: 'streets'
      })
      const view = new MapView({
        container: 'mapView',
        map: map,
        zoom: 12,
        center: [102.7346125, 25.0563901]
      })
    }, reason => {
      console.log(reason)
    })
}*/
export default createMap
