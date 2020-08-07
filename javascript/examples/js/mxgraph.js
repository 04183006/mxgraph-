// 禁止页面右键复制行为
document.onselectstart = new Function("event.returnValue=false");

function main() {
    mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);


    if (!mxClient.isBrowserSupported()) {

        mxUtils.error('Browser is not supported!', 200, false);
    } else {

        var tbContainer = document.getElementById('graphBar');


        var toolbar = new mxToolbar(tbContainer);
        toolbar.enabled = false


        var container = document.getElementById('mxgraph');
        container.style.background = 'url("editors/images/grid.gif")';




        if (mxClient.IS_QUIRKS) {
            document.body.style.overflow = 'hidden';
            new mxDivResizer(tbContainer);
            new mxDivResizer(container);
        }


        var model = new mxGraphModel();
        var graph = new mxGraph(container, model);
        graph.dropEnabled = true;

        //禁止在mxgraph图中使用鼠标右键
        mxEvent.disableContextMenu(document.getElementById('mxgraph'));


        //设置这个属性后节点之间才可以连接
        graph.setConnectable(true)

        //开启节点不可改变大小
        graph.setCellsResizable(true)

        //边被拖时，始终保持连接
        graph.setDisconnectOnMove(false)

        //开启tooptip提示
        graph.setTooltips(true)

        // 启用对齐线帮助定位
        mxGraphHandler.prototype.guidesEnabled = true

        //设置节点可连接
        graph.setConnectable(true);
        graph.setTooltips(true);
        graph.setAllowDanglingEdges(false);
        graph.setMultigraph(false);

        mxDragSource.prototype.getDropTarget = function (graph, x, y) {
            var cell = graph.getCellAt(x, y);

            if (!graph.isValidDropTarget(cell)) {
                cell = null;
            }

            return cell;
        };


        graph.setConnectable(true);
        graph.setMultigraph(false);

        //定义操作栏函数
        document.getElementById('btn1').appendChild(
            mxUtils.button('放大', function () {
                graph.zoomIn()
            })
        )

        document.getElementById('btn2').appendChild(
            mxUtils.button('缩小', function () {
                graph.zoomOut()
            })
        )

        document.getElementById('btn3').appendChild(
            mxUtils.button('还原', function () {
                graph.zoomActual()
            })
        )

        document.getElementById('btn4').appendChild(
            mxUtils.button('删除', function () {
                var cells = graph.getSelectionCells()
                graph.removeCells(cells)
            })
        )

        document.getElementById('btn5').appendChild(
            mxUtils.button('清空', function () {
                graph.removeCells(graph.getChildVertices(graph.getDefaultParent()))
            })
        )




        var keyHandler = new mxKeyHandler(graph);
        var rubberband = new mxRubberband(graph);

        var addVertex = function (icon, w, h, style) {
            var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
            vertex.setVertex(true);

            addToolbarItem(graph, toolbar, vertex, icon);
        };

        //三角形
        addVertex('editors/images/juxing.png', 100, 40,
            'shape=rectangle;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;'
        );

        //椭圆
        addVertex('editors/images/tuoyuanxing.png', 100, 40,
            'shape=ellipse;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;'
        );

        //菱形
        addVertex('editors/images/tubiao.png', 100, 40,
            'shape=rhombus;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;'
        );

        //箭头
        addVertex('editors/images/xingzhuang-sanjiaoxing.png', 100, 40,
            'shape=triangle;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;'
        );

        //六边形
        addVertex('editors/images/tx-liubianxing.png', 100, 40,
            'shape=hexagon;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;'
        );

        //actor
        addVertex('editors/images/ren-.png', 40, 60,
            'shape=actor;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;');

        //云
        addVertex('editors/images/cloud.png', 100, 40,
            'shape=cloud;fillColor=#3CAEA3;strokeColor=white;fontStyle=1;fontColor=white;rounded=1;fontSize=12;');

        //线段
        addVertex('editors/images/line.png', 40, 60, 'shape=line;');

        // 				rectangle  ellipse doubleEllipse  rhombus line image arrow 
        // arrowConnector label cylinder swimlane connector actor triangle hexagon

    }
}

function addToolbarItem(graph, toolbar, prototype, image) {
    var funct = function (graph, evt, cell) {
        graph.stopEditing(false);

        var pt = graph.getPointForEvent(evt);
        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;

        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    }

    var img = toolbar.addMode(null, image, funct);
    mxUtils.makeDraggable(img, graph, funct);
}