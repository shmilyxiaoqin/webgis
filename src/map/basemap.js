/**
 * 加载Arcgis模块
 */
require([
  //地图
  "esri/Map",
  //图形窗口
  "esri/views/MapView",
  //动态图层
  "esri/layers/MapImageLayer",
  //影像图
  "esri/layers/ImageryLayer",
  "esri/layers/FeatureLayer",
  //小部件
  "esri/widgets/Fullscreen",
  "esri/widgets/Home",
  "esri/widgets/ScaleBar",
  "esri/widgets/Print",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  //几何服务
  "esri/tasks/GeometryService",
  "esri/geometry/geometryEngine",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/tasks/support/BufferParameters",
  "esri/Color",
  "esri/geometry/SpatialReference",
  "esri/views/2d/draw/Draw",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
  "esri/geometry/Point",
  "esri/geometry/Multipoint",
  "esri/views/2d/draw/MultipointDrawAction",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",

  "dojo/domReady!src/map/basemap"

], function (Map, MapView, MapImageLayer, ImageryLayer, FeatureLayer, Fullscreen, Home, ScaleBar, Print, Expand, Legend,
             LayerList, Search, GeometryService, geometryEngine, GraphicsLayer, Graphic, SimpleMarkerSymbol, SimpleLineSymbol,
             SimpleFillSymbol, BufferParameters, Color, SpatialReference, Draw, Polyline, Polygon, Point, Multipoint,
             MultipointDrawAction, QueryTask, Query) {

  //加载影像图
  var raster = new ImageryLayer({
    url: 'http://192.168.4.200:6080/arcgis/rest/services//DaZhou/DZImage/ImageServer',

    title: '达州影像图',
    SpatialReference: 2381,
  });
  //加载矢量图
  var vector = new MapImageLayer({
    url: 'http://192.168.4.200:6080/arcgis/rest/services//DaZhou/DXShp/MapServer',
    title: '达州地图',
    SpatialReference: 2360,
    sublayers: [
      {
        id: 11,
        title: '行政区',
        visible: true
      }, {
        id: 10,
        title: '规划基本农田保护区',
        visible: true
      }, {
        id: 9,
        title: '规划基本农田调整',
        visible: true
      }, {
        id: 8,
        title: '基期地类图斑',
        visible: true

      }, {
        id: 7,
        title: '建设用地管制区',
        visible: true
      }, {
        id: 6,
        title: '土地规划地类',
        visible: true
      }, {
        id: 5,
        title: '土地整治重点区域',
        visible: true
      }, {
        id: 4,
        title: '基期地类界线',
        visible: true
      }, {
        id: 3,
        title: '基期线状地物',
        visible: true
      }, {
        id: 2,
        title: '建设用地管制边界',
        visible: true
      }, {
        id: 1,
        visible: true,
        title: '行政区界线',
      }, {
        id: 0,
        visible: true,
        title: '地理名称注记',
      }
    ]


  });


  //加载地图
  var map = new Map({
    layers: [raster, vector]
  });


  var view = new MapView({
    map: map,
    container: "mapDiv",
    center: [107.406613, 31.107824],
    SpatialReference: 2360,
    zoom: 15,
    scale: 24000,

  });

  var search = new Search({
    view: view,
    sources: [
      {
        //查询要素的图层
        featureLayer: new FeatureLayer({
          url: "http://192.168.4.200:6080/arcgis/rest/services//DaZhou/DXShp/MapServer/11",
          outFields: ["*"]
        }),
        //一个字符串值数组，表示要搜索的要素图层中的字段名称。
        searchFields: ["XZQMC"],
        //展示字段
        displayField: "XZQMC",
        //仅返回与搜索值完全匹配的结果
        exactMatch: false,
        //随搜索结果返回的字段。
        outFields: ["*"],
        //显示源的名称
        //name: "Point FS",
        //用作源输入文本的提示。
        placeholder: "请输入行政区",
        //要返回的最大搜索结果数。
        maxResults: 6,
        //要为窗口小部件输入返回的最大建议数
        maxSuggestions: 6,
        //指示当用户在窗口小部件中输入输入文本时是否显示建议。
        suggestionsEnabled: true,
        //查询建议之前所需的最少字符数。
        minSuggestCharacters: 0,

      },

    ],
    locationEnabled:false,

  });
  var expand = new Expand({
    view: view,
    content: search,
    expandIconClass: "esri-icon-search"
  });
  view.ui.add(expand, "top-right");
  var layerlist = new LayerList({
    view: view
  });
  //移除自身的标志
  view.ui._removeComponents(["attribution"]);
  var layerListExpand = new Expand({
    autoCollapse: true,
    view: view,
    content: layerlist,
    expandIconClass: "esri-icon-layer-list"
  });
  view.ui.add(layerListExpand, "top-right");

  view.ui.add("line-button", "top-right");
  view.ui.add("area-button", "top-right");
  view.ui.add("point-button", "top-right");
  view.ui.add("multipoint-button", "top-right");



  //view.ui.remove("zoom", "top-left");
  //小部件
  var home = new Home({
    view: view,
  });
  view.ui.add(home, "top-right");

  var fullscreen = new Fullscreen({
    view: view
  });
  view.ui.add(fullscreen, "top-right");

  var scaleBar = new ScaleBar({
    view: view,
    unit: 'metric',
    style: 'ruler',

  });
  view.ui.add(scaleBar, {
    position: "bottom-left"
  });

  var print = new Print({
    view: view,
    printServiceUrl: "http://192.168.4.200:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
    container: document.createElement("div"),
    templateOptions: {
      dpi: 350
    }
  });
  var printExpand = new Expand({
    view: view,
    content: print.container,
    declaredClass: "esri-print-expand",
    expandIconClass: "esri-icon-printer",
    expandTooltip: '导出地图'
  });
  view.ui.add(printExpand, "top-right");

  var legend = new Legend({
    view: view,
    layerInfos: [{
      layer: vector,
      title: "图例"
    }],
    container: document.createElement("div")
  });
  var legendExpand = new Expand({
    view: view,
    content: legend.container,
    expandIconClass: "esri-icon-collection",
    expandTooltip: '图例'
  });
  view.ui.add(legendExpand, "top-right");



  view.when(function () {
    var draw = new Draw({
      view: view
    });
    //绑定线事件
    var drawLineButton = document.getElementById("line-button");
    drawLineButton.onclick = function () {
      view.graphics.removeAll();//清楚之前的绘制
      enableCreateLine(draw, view);
    };
    //绑定多边形事件
    var drawAreaButton = document.getElementById("area-button");
    drawAreaButton.onclick = function () {
      view.graphics.removeAll();//清楚之前的绘制
      enableCreateArea(draw, view);
    };
    //绑定点按钮绘制事件
    var drawPointButton = document.getElementById("point-button");
    drawPointButton.onclick = function () {
      view.graphics.removeAll();//清楚之前的绘制
      enableCreatePoint(draw, view);
    };
    //绑定多点按钮事件
    var drawMultipointButton = document.getElementById("multipoint-button");
    drawMultipointButton.onclick = function () {
      view.graphics.removeAll();//清楚之前的绘制
      enableCreateMultipoint(draw, view);
    };
    var hcqClick = document.getElementById("hcq");
    hcqClick.onclick = function () {
      dobuffer()
    }

  });

  /**
   * 监听绘制线
   * @param draw
   * @param view
   */
  function enableCreateLine(draw, view) {
    var action = draw.create("polyline", {
      mode: "click"
    });
    // 获取焦点
    view.focus();

    // 顶点添加事件
    action.on("vertex-add", createPolyline);


    //顶点移除事件
    action.on("vertex-remove", createPolyline);


    // 鼠标移动事件
    action.on("cursor-update", createPolyline);


    // 绘制完成事件
    action.on("draw-complete", createPolyline);

  }

  /**
   * 监听绘制多边形
   * @param draw
   * @param view
   */
  function enableCreateArea(draw, view) {
    var action = draw.create("polygon", {
      mode: "click"//点击方式加点
    });
    // 获取焦点
    view.focus();

    // 顶点添加事件
    action.on("vertex-add", createPolygon);


    //顶点移除事件
    action.on("vertex-remove", createPolygon);


    // 鼠标移动事件
    action.on("cursor-update", createPolygon);


    // 绘制完成事件
    action.on("draw-complete", createPolygon);


  }

  /**
   * 监听绘制点
   * @param draw 绘制动作
   * @param view 视图
   */
  function enableCreatePoint(draw, view) {
    var action = draw.create("point", {
      mode: "click"//点击方式加点
    });
    // 获取焦点
    view.focus();

    // 顶点添加事件
    action.on("vertex-add", createPoint);


    //顶点移除事件
    action.on("vertex-remove", createPoint);


    // 绘制完成事件
    action.on("draw-complete", createPoint);


  }

  /**
   * 监听画多点
   * @param draw 绘制动作
   * @param view 视图
   */
  function enableCreateMultipoint(draw, view) {
    var action = draw.create("multipoint", {
      mode: "click"//点击方式加点
    });
    // 获取焦点
    view.focus();

    // 顶点添加事件
    action.on("vertex-add", createMultipoint);


    //顶点移除事件
    action.on("vertex-remove", createMultipoint);


    // 绘制完成事件
    action.on("draw-complete", createMultipoint);

  }

  /**
   * 绘制线
   * @param event 鼠标事件
   */
  function createPolyline(event) {
    //获取所有顶点
    var vertices = event.vertices;
    //清除之前绘制
    view.graphics.removeAll();
    // 生成绘制的图形
    var graphic = new Graphic({
      geometry: new Polyline({
        paths: vertices,
        spatialReference: view.spatialReference
      }),
      symbol: {
        type: "simple-line",
        color: [4, 90, 141],
        width: 4,
        cap: "round",
        join: "round"
      }
    });
    // 将绘制的图形添加到view
    view.graphics.add(graphic);
  };

  /**
   * 绘制多边形
   * @param event 鼠标事件
   */
  function createPolygon(event) {
    //获取所有顶点
    var vertices = event.vertices;
    //清除之前绘制
    view.graphics.removeAll();

    // 生成绘制的图形
    var graphic = new Graphic({
      geometry: new Polygon({
        hasZ: false,
        hasM: false,
        rings: [vertices],
        spatialReference: view.spatialReference
      }),
      symbol: {
        type: "simple-fill",
        color: [51, 51, 204, 0.9],
        style: "solid",
        outline: {
          color: "white",
          width: 1
        }
      }
    });
    // 将绘制的图形添加到view
    view.graphics.add(graphic);
  }

  /**
   * 绘制点
   * @param event 鼠标事件
   */
  function createPoint(event) {
    //获取所有顶点
    var coordinates = event.coordinates;

    //生成绘制的图形
    var graphic = new Graphic({
      geometry: new Point({
        hasZ: false,
        hasM: false,
        x: coordinates[0],
        y: coordinates[1],
        spatialReference: view.spatialReference
      }),
      symbol: {
        type: "simple-marker",
        style: "square",
        color: "blue",
        size: "8px",
        outline: {
          color: [255, 255, 0],
          width: 3
        }
      }
    });
    // 将绘制的图形添加到view
    view.graphics.add(graphic);
  }

  /**
   * 绘制多点
   * @param event 鼠标事件
   */
  function createMultipoint(event) {

    //获取所有顶点
    var vertices = event.vertices;

    //生成绘制的图形
    var graphic = new Graphic({
      geometry: new Multipoint({
        hasZ: false,
        hasM: false,
        points: vertices,
        spatialReference: view.spatialReference
      }),
      symbol: {
        type: "simple-marker",
        style: "square",
        color: "red",
        size: "16px",
        outline: {
          color: [255, 255, 0],
          width: 3
        }
      }
    });
    // 将绘制的图形添加到view
    view.graphics.add(graphic);
  }


  var fea
  //空间查询
  var queryTask = new QueryTask({
    url: 'http://192.168.4.200:6080/arcgis/rest/services//DaZhou/DXShp/MapServer/5'
  });
  var query = new Query();
  query.returnGeometry = true;
  query.outFields = ['*'];
  query.where = "SM='五四乡'";

  queryTask.execute(query).then(function (results) {
    fea = results.features
  });

  /**
   * 缓冲区分析
   */
  function dobuffer() {
    var bufferParameter = fea[0].geometry;
    var geometryService = new GeometryService("http://192.168.4.200:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
    //缓冲区分析
    var params = new BufferParameters();
    params.geometries = [bufferParameter];
    params.distances = [3];
    params.unit = GeometryService.UNIT_KILOMETER;
    params.bufferSpatialReference = new SpatialReference({wkid: 2360});
    params.outSpatialReference = view.spatialReference;

    //执行缓冲区操作
    geometryService.buffer(params).then(function (features) {
      var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL,
        new SimpleLineSymbol("dash-dot", new Color([255, 0, 0]), 3),
        new Color([255, 0, 0, 1]));
      view.graphics.add(new Graphic(features[0], symbol))

    });

  }


});
