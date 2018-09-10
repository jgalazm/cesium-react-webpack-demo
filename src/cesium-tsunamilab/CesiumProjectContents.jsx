import React, {Component} from "react";

import BillboardCollection from "cesium-tsunamilab/Source/Scene/BillboardCollection";
import PrimitiveCollection from "cesium-tsunamilab/Source/Scene/PrimitiveCollection";
import CesiumBillboard from "./primitives/CesiumBillboard";

export class CesiumProjectContents extends Component {
    constructor(props) {
        super(props);

        this.billboards = new PrimitiveCollection();

        this.primitiveCollections = [this.billboards];

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
        const {icons = []} = this.props;
        let {simulationCanvas, canvasIsReady, simulationVideo} = this.props;

        let renderedBillboards = null;
        if( canvasIsReady ){
            renderedBillboards = icons.map( (icon, index) =>
                <CesiumBillboard
                    {...icon}
                    billboards={this.billboards}
                    key={index}
                    simulationCanvas={simulationCanvas}
                    canvasIsReady={canvasIsReady}
                    simulationVideo={simulationVideo}
                />
            );
        }

        return (
            <span>
                {renderedBillboards}
            </span>
        );
    }
}


export default CesiumProjectContents;
