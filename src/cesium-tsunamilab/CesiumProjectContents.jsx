import React, {Component} from "react";

import PrimitiveCollection from "cesium-tsunamilab/Source/Scene/PrimitiveCollection";
import BillboardCollection from "cesium-tsunamilab/Source/Scene/BillboardCollection.js";
import CesiumRectangle from "./primitives/CesiumRectangle";
import CesiumBillboard from "./primitives/CesiumBillboard";

export class CesiumProjectContents extends Component {
    constructor(props) {
        super(props);

        this.rectangles = new PrimitiveCollection();
        this.billboards = new BillboardCollection();

        this.primitiveCollections = [this.rectangles, this.billboards];

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
        let renderedBillboards = null;
        if( canvasIsReady ){
            renderedRectangles = <CesiumRectangle
                rectangles={this.rectangles}
                simulationCanvas={simulationCanvas}
                canvasIsReady={canvasIsReady}
                simulationVideo={simulationVideo}
            />

            renderedBillboards = <CesiumBillboard  billboards={this.billboards} />
        
        }

        return (
            <span>
                {renderedRectangles}
                {renderedBillboards}
            </span>
        );
    }
}


export default CesiumProjectContents;
