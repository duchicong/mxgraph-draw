import { mxGraph } from "./factory";

export default class Graph extends mxGraph {
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
}