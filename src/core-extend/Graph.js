import { mxGraph, mxCell, mxGeometry } from "./factory";
import GraphEventHandler from "./GraphEventHandler";

export default class Graph extends mxGraph {
    constructor (container) {
        super(container);
        this.eventHandler = new GraphEventHandler(this);
    }

    getAllConnectionConstraints = (terminal, source) => {
        if (terminal != null && terminal.shape != null)
        {
            if (terminal.shape.stencil != null)
            {
                if (terminal.shape.stencil.constraints != null)
                {
                    return terminal.shape.stencil.constraints;
                }
            }
            else if (terminal.shape.constraints != null)
            {
                return terminal.shape.constraints;
            }
        }

        return null;
    }

    /**
     * Overide func createEdge
     * 
     * Parameters:
     * 
     * parent - <mxCell> that specifies the parent of the new edge.
     * id - Optional string that defines the Id of the new edge.
     * value - JavaScript object to be used as the user object.
     * source - <mxCell> that defines the source of the edge.
     * target - <mxCell> that defines the target of the edge.
     * style - Optional string that defines the cell style.
     */
    createEdge = function(parent, id, value, source, target, style) {
        // Creates the edge
        var edge = new mxCell(value, new mxGeometry(), style);
        edge.setId(id);
        edge.setEdge(true);
        edge.geometry.relative = true;
        
        return edge;
    };

    /**
     * Function: insertVertex
     * 
     * Adds a new vertex into the given parent <mxCell> using value as the user
     * object and the given coordinates as the <mxGeometry> of the new vertex.
     * The id and style are used for the respective properties of the new
     * <mxCell>, which is returned.
     *
     * Khi thêm các đỉnh mới từ sự kiện chuột, người ta nên đưa vào
     * tính toán độ lệch của đồ thị và tỷ lệ (scale) và dịch chuyển (translate)
     * của chế độ xem để tìm đúng tọa độ sử dụng <mxgraph.getPointForEvent> như sau:
     * 
     * (code)
     * var pt = graph.getPointForEvent(evt);
     * var parent = graph.getDefaultParent();
     * graph.insertVertex(parent, null,
     * 			'Hello, World!', x, y, 220, 30);
     * (end)
     * 
     * For adding image cells, the style parameter can be assigned as
     * 
     * (code)
     * stylename;image=imageUrl
     * (end)
     * 
     * See <mxGraph> for more information on using images.
     *
     * Parameters:
     * 
     * parent - <mxCell> that specifies the parent of the new vertex.
     * id - Optional string that defines the Id of the new vertex.
     * value - Object to be used as the user object.
     * x - Integer that defines the x coordinate of the vertex.
     * y - Integer that defines the y coordinate of the vertex.
     * width - Integer that defines the width of the vertex.
     * height - Integer that defines the height of the vertex.
     * style - Optional string that defines the cell style.
     * relative - Optional boolean that specifies if the geometry is relative.
     * Default is false.
     */

    insertVertex (parent, id, value, x, y, width, height, style, relative) {
        let vertex = this.createVertex(parent, id, value, x, y, width, height, style, relative);
    
        return this.addCell(vertex, parent);
    };

    /**
     * Function: addCell
     * 
     * Adds the cell to the parent and connects it to the given source and
     * target terminals. This is a shortcut method. Returns the cell that was
     * added.
     * 
     * Parameters:
     * 
     * cell - <mxCell> to be inserted into the given parent.
     * parent - <mxCell> that represents the new parent. If no parent is
     * given then the default parent is used.
     * index - Optional index to insert the cells at. Default is to append.
     * source - Optional <mxCell> that represents the source terminal.
     * target - Optional <mxCell> that represents the target terminal.
     */
    addCell(cell, parent, index, source, target){
        return this.addCells([cell], parent, index, source, target)[0];
    }

    /**
     * Function: setEnabled
     * 
     * Chỉ định Graph có cho phép tương tác hay không.
     * Việc triển khai sẽ cập nhật giá trị this.enable trong graph.
     * 
     * Parameters:
     * 
     * value - Boolean cho biết liệu đồ thị có nên được kích hoạt hay không.
     */
}