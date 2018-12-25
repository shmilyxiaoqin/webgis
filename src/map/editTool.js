import esriLoader from 'esri-loader'

let editTool = function (view) {
  const options = {
    url: 'https://js.arcgis.com/4.7/init.js'
  }
  esriLoader.loadModules([
    'esri/geometry/geometryEngine',
    'esri/geometry/Polyline',
    'esri/geometry/Polygon',
    'esri/geometry/Point',
    'esri/geometry/Multipoint',
    'esri/geometry/Geometry',
    'esri/views/2d/draw/Draw',
    'esri/layers/GraphicsLayer',
    'esri/Graphic'
  ], options)
    .then(([
      geometryEngine,
      Polyline,
      Polygon,
      Point,
      Multipoint,
      Geometry,
      Draw,
      GraphicsLayer,
      Graphic
    ]) => {
      view.ui.add('line-button', 'top-left')
      view.ui.add('area-button', 'top-left')
      view.ui.add('point-button', 'top-left')
      view.ui.add('multipoint-button', 'top-left')
      view.when(function () {
        let draw = new Draw({
          view: view
        })
        // 绑定画线事件
        let drawLineButton = document.getElementById('line-button')
        drawLineButton.onclick = function () {
          view.graphics.removeAll()
          enableCreateLine(draw, view)
        }
        // 绑定画多边形事件
        let drawAreaButton = document.getElementById('area-button')
        drawAreaButton.onclick = function () {
          view.graphics.removeAll()// 清除之前的绘制
          enableCreateArea(draw, view)
        }
        // 绑定画点按钮绘制事件
        let drawPointButton = document.getElementById('point-button')
        drawPointButton.onclick = function () {
          view.graphics.removeAll() // 清除之前的绘制
          enableCreatePoint(draw, view)
        }
        // 绑定多点按钮事件
        let drawMultipointButton = document.getElementById('multipoint-button')
        drawMultipointButton.onclick = function () {
          view.graphics.removeAll()// 清除之前的绘制
          enableCreateMultipoint(draw, view)
        }
      })

      /**
       * 监听绘制线
       * @param draw
       * @param view
       */
      function enableCreateLine (draw, view) {
        let action = draw.create('polyline', {
          mode: 'click'
        })
        // 获取焦点
        view.focus()
        // 顶点添加事件
        action.on('vertex-add', createPolyline)
        // 顶点移除事件
        action.on('vertex-remove', createPolyline)
        // 鼠标移动事件
        action.on('cursor-update', createPolyline)
        // 绘制完成事件
        action.on('draw-complete', createPolyline)
      }

      /**
       * 监听绘制多边形
       * @param draw
       * @param view
       */
      function enableCreateArea (draw, view) {
        let action = draw.create('polygon', {
          mode: 'click'// 点击方式加点
        })
        // 获取焦点
        view.focus()

        // 顶点添加事件
        action.on('vertex-add', createPolygon)
        // 顶点移除事件
        action.on('vertex-remove', createPolygon)
        // 鼠标移动事件
        action.on('cursor-update', createPolygon)
        // 绘制完成事件
        action.on('draw-complete', createPolygon)
      }

      /**
       * 监听绘制点
       * @param draw 绘制动作
       * @param view 视图
       */
      function enableCreatePoint (draw, view) {
        let action = draw.create('point', {
          mode: 'click'// 点击方式加点
        })
        // 获取焦点
        view.focus()
        // 顶点添加事件
        action.on('vertex-add', createPoint)
        // 顶点移除事件
        action.on('vertex-remove', createPoint)
        // 绘制完成事件
        action.on('draw-complete', createPoint)
      }

      /**
       * 监听画多点
       * @param draw 绘制动作
       * @param view 视图
       */
      function enableCreateMultipoint (draw, view) {
        let action = draw.create('multipoint', {
          mode: 'click'// 点击方式加点
        })
        // 获取焦点
        view.focus()
        // 顶点添加事件
        action.on('vertex-add', createMultipoint)
        // 顶点移除事件
        action.on('vertex-remove', createMultipoint)
        // 绘制完成事件
        action.on('draw-complete', createMultipoint)
      }

      /**
       * 绘制线
       * @param event 鼠标事件
       */
      function createPolyline (event) {
        // 获取所有顶点
        let vertices = event.vertices
        // 清除之前绘制
        view.graphics.removeAll()
        // 生成绘制的图形
        let graphic = new Graphic({
          geometry: new Polyline({
            paths: vertices,
            spatialReference: view.spatialReference
          }),
          symbol: {
            type: 'simple-line',
            color: [4, 90, 141],
            width: 4,
            cap: 'round',
            join: 'round'
          }
        })
        // 将绘制的图形添加到view
        view.graphics.add(graphic)
      }

      /**
       * 绘制多边形
       * @param event 鼠标事件
       */
      function createPolygon (event) {
        // 获取所有顶点
        let vertices = event.vertices
        // 清除之前绘制
        view.graphics.removeAll()

        // 生成绘制的图形
        let graphic = new Graphic({
          geometry: new Polygon({
            hasZ: false,
            hasM: false,
            rings: [vertices],
            spatialReference: view.spatialReference
          }),
          symbol: {
            type: 'simple-fill',
            color: [51, 51, 204, 0.9],
            style: 'solid',
            outline: {
              color: 'white',
              width: 1
            }
          }
        })
        // 将绘制的图形添加到view
        view.graphics.add(graphic)
      }

      /**
       * 绘制点
       * @param event 鼠标事件
       */
      function createPoint (event) {
        // 获取所有顶点
        let coordinates = event.coordinates

        // 生成绘制的图形
        let graphic = new Graphic({
          geometry: new Point({
            hasZ: false,
            hasM: false,
            x: coordinates[0],
            y: coordinates[1],
            spatialReference: view.spatialReference
          }),
          symbol: {
            type: 'simple-marker',
            style: 'square',
            color: 'blue',
            size: '8px',
            outline: {
              color: [255, 255, 0],
              width: 3
            }
          }
        })
        // 将绘制的图形添加到view
        view.graphics.add(graphic)
      }

      /**
       * 绘制多点
       * @param event 鼠标事件
       */
      function createMultipoint (event) {
        // 获取所有顶点
        let vertices = event.vertices
        // 生成绘制的图形
        let graphic = new Graphic({
          geometry: new Multipoint({
            hasZ: false,
            hasM: false,
            points: vertices,
            spatialReference: view.spatialReference
          }),
          symbol: {
            type: 'simple-marker',
            style: 'square',
            color: 'red',
            size: '16px',
            outline: {
              color: [255, 255, 0],
              width: 3
            }
          }
        })
        // 将绘制的图形添加到view
        view.graphics.add(graphic)
      }
    })
}
export default editTool
