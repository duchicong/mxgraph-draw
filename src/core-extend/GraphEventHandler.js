import { mxConnectionHandler } from "./factory";

export default class GraphEventHandler extends mxConnectionHandler {
    constructor (graph, factoryMethod) {
        super(graph, factoryMethod);
        this.init();
    }

    init = () => {

    }

    /**
     * Overide createEdgeState in mxConnectionHandler
     */
    createEdgeState = (me) => {
        return null
    }
}
