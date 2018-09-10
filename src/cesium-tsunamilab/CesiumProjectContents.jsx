import React, {Component} from "react";

import PrimitiveCollection from "cesium-tsunamilab/Source/Scene/PrimitiveCollection";
import CesiumRectangle from "./primitives/CesiumRectangle";

export class CesiumProjectContents extends Component {
    constructor(props) {
        super(props);

        this.rectangles = new PrimitiveCollection();

        this.primitiveCollections = [this.rectangles];

        const {scene} = props;

        if(scene) {
            this.primitiveCollections.forEach(primitiveCollection => scene.primitives.add(primitiveCollection));
        }
    }

    componentWillUnmount() {

        this.primitiveCollections.forEach(primitiveCollection => {
            if(!primitiveCollection.isDestroyed()) {
                primitiveCollection.destroy();
            }
        });

        const {scene} = this.props;

        if(scene && !scene.isDestroyed() && scene.primitives) {
            this.primitiveCollections.forEach(primitiveCollection => scene.primitives.remove(primitiveCollection));
        }
    }

    render() {
        let {simulationCanvas, canvasIsReady, simulationVideo} = this.props;

        let renderedRectangles = null;
        if( canvasIsReady ){
            renderedRectangles = <CesiumRectangle
                rectangles={this.rectangles}
                simulationCanvas={simulationCanvas}
                canvasIsReady={canvasIsReady}
                simulationVideo={simulationVideo}
            />
        
        }

        return (
            <span>
                {renderedRectangles}
            </span>
        );
    }
}


export default CesiumProjectContents;
