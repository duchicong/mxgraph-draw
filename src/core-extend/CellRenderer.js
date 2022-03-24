import { mxCellRenderer } from './factory';

/**
 * Class: mxCellRenderer
 * 
 * Renders cells into a document object model. The <defaultShapes> is a global
 * map of shapename, constructor pairs that is used in all instances. You can
 * get a list of all available shape names using the following code.
 * 
 * In general the cell renderer is in charge of creating, redrawing and
 * destroying the shape and label associated with a cell state, as well as
 * some other graphical objects, namely controls and overlays. The shape
 * hieararchy in the display (ie. the hierarchy in which the DOM nodes
 * appear in the document) does not reflect the cell hierarchy. The shapes
 * are a (flat) sequence of shapes and labels inside the draw pane of the
 * graph view, with some exceptions, namely the HTML labels being placed
 * directly inside the graph container for certain browsers.
 * 
 * (code)
 * mxLog.show();
 * for (var i in mxCellRenderer.defaultShapes)
 * {
 *   mxLog.debug(i);
 * }
 * (end)
 *
 * Constructor: mxCellRenderer
 * 
 * Constructs a new cell renderer with the following built-in shapes:
 * arrow, rectangle, ellipse, rhombus, image, line, label, cylinder,
 * swimlane, connector, actor and cloud.
 */
export default class CellRenderer extends mxCellRenderer {
    constructor () {
        super();
        this.defaultShapes = new Object();
    }

    getTextScale = (state) => {
        console.log('state ', state)
        return state.view.scale;
    }
    
}
