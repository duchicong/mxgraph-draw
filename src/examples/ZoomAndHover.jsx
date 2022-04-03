import React from 'react'
import WrapperInfomation from '../components/WrapperInfomation'
import { Graph, DivResizer, PrintPreview, GImage, CellOverlay, KeyHandler, CompactTreeLayout, LayoutManager, Point, GWindow } from '../core-extend'
import { mxEvent, mxClient, mxUtils, mxConstants, mxEdgeStyle, mxToolbar } from '../core-extend/factory'

const info = {
    author: 'CongDC',
    email: 'duconggpdg@gmail.com',
    example: 'Zoom and Hover label example',
    source: 'https://jgraph.github.io/mxgraph/javascript/examples/orgchart.html'
}
class ZoomAndHover extends React.Component {
    constructor () {
        super();
        this.containerRef = React.createRef()
    }

    main = (container) => {
        // Checks if the browser is supported
        if (!mxClient.isBrowserSupported())
        {
            // Displays an error message if the browser is not supported.
            mxUtils.error('Browser is not supported!', 200, false);
        }
        else
        {
            // Workaround for Internet Explorer ignoring certain styles
            container.style.left = '0px';
            container.style.top = '0px';

            let outline = document.getElementById('outlineContainer');
            mxEvent.disableContextMenu(container);
            if (mxClient.IS_QUICKS) {
                // document.body.style.overflow = 'hidden';
                new DivResizer(container);
                new DivResizer(outline);
            }

            // Sets a gradient background
            if (mxClient.IS_GC || mxClient.IS_SF)
            {
                container.style.background = '-webkit-gradient(linear, 0% 0%, 0% 100%, from(#FFFFFF), to(#E7E7E7))';
            }
            else if (mxClient.IS_NS)
            {
                container.style.background = '-moz-linear-gradient(top, #FFFFFF, #E7E7E7)';  
            }
            else if (mxClient.IS_IE)
            {
                container.style.filter = 'progid:DXImageTransform.Microsoft.Gradient('+
                        'StartColorStr=\'#FFFFFF\', EndColorStr=\'#E7E7E7\', GradientType=0)';
            }

            // document.body.appendChild(container);
            // Cretes the graph inside the given container
            let graph = new Graph(container);

            // Enables automatic sizing for vertices after editing and
            // panning by using the left mouse button.
            graph.setCellsMovable(false);
            graph.setAutoSizeCells(true);
            graph.setPanning(true);
            graph.centerZoom = false;
            graph.setTooltips(!mxClient.IS_TOUCH);

            // Set some stylesheet options for the visual appearance of vertices
            let style = graph.getStylesheet().getDefaultVertexStyle();
            style[mxConstants.STYLE_SHAPE] = 'label';
				
            style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
            style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
            style[mxConstants.STYLE_SPACING_LEFT] = 54;
            
            style[mxConstants.STYLE_GRADIENTCOLOR] = '#7d85df';
            style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';
            style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff';
            
            style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';
            style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';
            style[mxConstants.STYLE_FONTSIZE] = '12';
            style[mxConstants.STYLE_FONTSTYLE] = '1';
            
            style[mxConstants.STYLE_SHADOW] = '1';
            style[mxConstants.STYLE_ROUNDED] = '1';
            style[mxConstants.STYLE_GLASS] = '1';
            
            style[mxConstants.STYLE_IMAGE] = 'images/icons/dude3.png';
            style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
            style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
            style[mxConstants.STYLE_SPACING] = 8;

            // Sets the default style for edges
            style = graph.getStylesheet().getDefaultEdgeStyle();
            style[mxConstants.STYLE_ROUNDED] = true;
            style[mxConstants.STYLE_STROKEWIDTH] = 3;
            style[mxConstants.STYLE_EXIT_X] = 0.5; // center
            style[mxConstants.STYLE_EXIT_Y] = 1.0; // bottom
            style[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled
            style[mxConstants.STYLE_ENTRY_X] = 0.5; // center
            style[mxConstants.STYLE_ENTRY_Y] = 0; // top
            style[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled
            
            // Disable the following for straight lines
            style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;

            // Stops editing on enter or escape keypress
            new KeyHandler(graph);

            // Enables automatic layout on the graph and installs
            // a tree layout for all groups who's children are
            // being changed, added or removed.
            let layout = new CompactTreeLayout(graph, false);
            layout.useBoundingBox = false;
            layout.edgeRouting = false;
            layout.levelDistance = 60;
            layout.nodeDistance = 16;

            // Allows the layout to move cells even though cells
            // aren't movable in the graph
            layout.isVertexMovable = function(cell)
            {
                return true;
            };

            var layoutMgr = new LayoutManager(graph);

            layoutMgr.getLayout = function(cell)
            {
                if (cell.getChildCount() > 0)
                {
                    return layout;
                }
            };

            // Installs a popupmenu handler using local function (see below).
            graph.popupMenuHandler.factoryMethod = function(menu, cell, evt)
            {
                return this.createPopupMenu(graph, menu, cell, evt);
            };

            // Fix for wrong preferred size
            var oldGetPreferredSizeForCell = graph.getPreferredSizeForCell;
            graph.getPreferredSizeForCell = function(cell)
            {
                var result = oldGetPreferredSizeForCell.apply(this, arguments);

                if (result != null)
                {
                    result.width = Math.max(120, result.width - 40);
                }

                return result;
            };
            
            // Sets the maximum text scale to 1
            graph.cellRenderer.getTextScale = function(state)
            {
                console.log('state ', state.view.scale)
                return Math.min(1, state.view.scale);
            };

            // Dynamically adds text to the label as we zoom in
            // (without affecting the preferred size for new cells)
            graph.cellRenderer.getLabelValue = function(state)
            {
                var result = state.cell.value;
                
                if (state.view.graph.getModel().isVertex(state.cell))
                {
                    if (state.view.scale > 1)
                    {
                        result += '\nDetails 1';
                    }
                    
                    if (state.view.scale > 1.3)
                    {
                        result += '\nDetails 2';
                    }
                }
                
                return result;
            };

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();

            // Adds the root vertex of the tree
            graph.getModel().beginUpdate();
            try
            {
                var w = graph.container.offsetWidth;
                var v1 = graph.insertVertex(parent, 'treeRoot',
                    'Organization', w/2 - 30, 20, 140, 60, 'image=images/icons/house.png');
                graph.updateCellSize(v1);
                this.addOverlays(graph, v1, false);
            }
            finally
            {
                // Updates the display
                graph.getModel().endUpdate();
            }

            var content = document.createElement('div');
            content.style.padding = '4px';
            content.style.width = '200px';
            content.style.height = '66px';
            content.style.position = 'absolute';
            content.style.top = '56px';
            content.style.left = '0px';

            var tb = new mxToolbar(content);

            tb.addItem('Zoom In', 'images/icons/zoom_in32.png',function(evt)
            {
                graph.zoomIn();
            });

            tb.addItem('Zoom Out', 'images/icons/zoom_out32.png',function(evt)
            {
                graph.zoomOut();
            });
            
            tb.addItem('Actual Size', 'images/icons/view_1_132.png',function(evt)
            {
                graph.zoomActual();
            });

            tb.addItem('Print', 'images/icons/print32.png',function(evt)
            {
                var preview = new PrintPreview(graph, 1);
                preview.open();
            });

            tb.addItem('Poster Print', 'images/icons/press32.png',function(evt)
            {
                var pageCount = mxUtils.prompt('Enter maximum page count', '1');

                if (pageCount != null)
                {
                    var scale = mxUtils.getScaleForPageCount(pageCount, graph);
                    var preview = new PrintPreview(graph, scale);
                    preview.open();
                }
            });

            let wnd = new GWindow(null, content, 0, 49, null, null, false);
            wnd.setMaximizable(false);
            wnd.setScrollable(false);
            wnd.setResizable(false);
            wnd.setVisible(true);

        }
    }

    addOverlays = (graph, cell, addDeleteIcon) => {
        var overlay = new CellOverlay(new GImage('images/icons/add.png', 24, 24), 'Add child');
        overlay.cursor = 'hand';
        overlay.align = mxConstants.ALIGN_CENTER;
        overlay.addListener(mxEvent.CLICK, mxUtils.bind(this, function(sender, evt)
        {
            this.addChild(graph, cell);
        }));
        
        graph.addCellOverlay(cell, overlay);
    
        if (addDeleteIcon)
        {
            overlay = new CellOverlay(new GImage('images/icons/close.png', 30, 30), 'Delete');
            overlay.cursor = 'hand';
            overlay.offset = new Point(-4, 8);
            overlay.align = mxConstants.ALIGN_RIGHT;
            overlay.verticalAlign = mxConstants.ALIGN_TOP;
            overlay.addListener(mxEvent.CLICK, mxUtils.bind(this, function(sender, evt)
            {
                this.deleteSubtree(graph, cell);
            }));
        
            graph.addCellOverlay(cell, overlay);
        }
    }

    createPopupMenu = (graph, menu, cell, evt) => {
        var model = graph.getModel();

        if (cell != null)
        {
            if (model.isVertex(cell))
            {
                menu.addItem('Add child', 'editors/images/icons/overlays/check.png', function()
                {
                    this.addChild(graph, cell);
                });
            }

            menu.addItem('Edit label', 'editors/images/icons/text.gif', function()
            {
                graph.startEditingAtCell(cell);
            });

            if (cell.id != 'treeRoot' &&
                model.isVertex(cell))
            {
                menu.addItem('Delete', 'editors/images/icons/delete.gif', function()
                {
                    this.deleteSubtree(graph, cell);
                });
            }

            menu.addSeparator();
        }

        menu.addItem('Fit', 'editors/images/icons/zoom.gif', function()
        {
            graph.fit();
        });

        menu.addItem('Actual', 'editors/images/icons/zoomactual.gif', function()
        {
            graph.zoomActual();
        });

        menu.addSeparator();

        menu.addItem('Print', 'editors/images/icons/print.gif', function()
        {
            var preview = new PrintPreview(graph, 1);
            preview.open();
        });

        menu.addItem('Poster Print', 'editors/images/icons/print.gif', function()
        {
            var pageCount = mxUtils.prompt('Enter maximum page count', '1');

            if (pageCount != null)
            {
                var scale = mxUtils.getScaleForPageCount(pageCount, graph);
                var preview = new PrintPreview(graph, scale);
                preview.open();
            }
        });
    }

    addChild(graph, cell)
    {
        var model = graph.getModel();
        var parent = graph.getDefaultParent();
        var vertex;

        model.beginUpdate();
        try
        {
            vertex = graph.insertVertex(parent, null, 'Double click to set name');
            var geometry = model.getGeometry(vertex);

            // Updates the geometry of the vertex with the
            // preferred size computed in the graph
            var size = graph.getPreferredSizeForCell(vertex);
            geometry.width = size.width;
            geometry.height = size.height;

            // Adds the edge between the existing cell
            // and the new vertex and executes the
            // automatic layout on the parent
            var edge = graph.insertEdge(parent, null, '', cell, vertex);

            // Configures the edge label "in-place" to reside
            // at the end of the edge (x = 1) and with an offset
            // of 20 pixels in negative, vertical direction.
            edge.geometry.x = 1;
            edge.geometry.y = 0;
            edge.geometry.offset = new Point(0, -20);

            this.addOverlays(graph, vertex, true);
        }
        finally
        {
            model.endUpdate();
        }
        
        return vertex;
    };

    deleteSubtree = (graph, cell) => {
        // Gets the subtree from cell downwards
        var cells = [];
        graph.traverse(cell, true, function(vertex)
        {
            cells.push(vertex);
            
            return true;
        });

        graph.removeCells(cells);
    };

    componentDidMount () {
        this.main(this.containerRef.current);
    }

    render () {
        return (
            <WrapperInfomation info={info}>
                <div
                    className='ZoomAndHover'
                    ref={this.containerRef}
                    id="outlineContainer"
                    style={{
                        zIndex: 0,
                        top: 0,
                        left: 0,
                        width: 'inherit',
                        height: 'inherit',
                        background: 'transparent',
                        borderStyle: 'solid',
                        borderColor: 'lightgray'
                    }}
                />
            </WrapperInfomation>
        )
    }
}

export default ZoomAndHover
