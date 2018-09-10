import {Component} from "react";

import GeometryInstance from "cesium-tsunamilab/Source/Core/GeometryInstance";
import Rectangle from "cesium-tsunamilab/Source/Core/Rectangle";
import RectangleGeometry from "cesium-tsunamilab/Source/Core/RectangleGeometry";
import EllipsoidSurfaceAppearance from "cesium-tsunamilab/Source/Scene/EllipsoidSurfaceAppearance";
import MaterialAppearance from "cesium-tsunamilab/Source/Scene/MaterialAppearance";
import Primitive from "cesium-tsunamilab/Source/Scene/Primitive";
import Material from "cesium-tsunamilab/Source/Scene/Material";



export default class CesiumBillboard extends Component {
    componentDidMount() {
        const {billboards, simulationVideo, simulationCanvas} = this.props;

        let instance = new GeometryInstance({
            geometry : new RectangleGeometry({
                rectangle : Rectangle.fromDegrees(-180, -80.0, 180.0, 80.0),
                vertexFormat : EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
        });
          
        let stream = simulationCanvas.captureStream();
        simulationVideo.srcObject = stream;

        if(billboards) {

            var material = Material.fromType('Image');
            material.uniforms.image = simulationVideo;
            

            this.billboard = billboards.add(new Primitive({
                geometryInstances : instance,
                appearance : new MaterialAppearance({
                    material : material
                })
            }));

        }
    }

    componentWillUnmount() {
        const {billboards} = this.props;

        if(billboards && !billboards.isDestroyed() && this.billboard) {
            billboards.remove(this.billboard);
        }
    }

    render() {
        return null;
    }
}
