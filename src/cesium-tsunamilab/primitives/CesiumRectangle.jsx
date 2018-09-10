import {Component} from "react";

import GeometryInstance from "cesium-tsunamilab/Source/Core/GeometryInstance";
import Rectangle from "cesium-tsunamilab/Source/Core/Rectangle";
import RectangleGeometry from "cesium-tsunamilab/Source/Core/RectangleGeometry";
import EllipsoidSurfaceAppearance from "cesium-tsunamilab/Source/Scene/EllipsoidSurfaceAppearance";
import MaterialAppearance from "cesium-tsunamilab/Source/Scene/MaterialAppearance";
import Primitive from "cesium-tsunamilab/Source/Scene/Primitive";
import Material from "cesium-tsunamilab/Source/Scene/Material";



export default class CesiumRectangle extends Component {
    componentDidMount() {
        const {rectangles, simulationVideo, simulationCanvas} = this.props;

        let instance = new GeometryInstance({
            geometry : new RectangleGeometry({
                rectangle : Rectangle.fromDegrees(-180, -80.0, 180.0, 80.0),
                vertexFormat : EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
        });
          
        let stream = simulationCanvas.captureStream();
        simulationVideo.srcObject = stream;

        if(rectangles) {

            var material = Material.fromType('Image');
            material.uniforms.image = simulationVideo;
            

            this.rectangle = rectangles.add(new Primitive({
                geometryInstances : instance,
                appearance : new MaterialAppearance({
                    material : material
                })
            }));

        }
    }

    componentWillUnmount() {
        const {rectangles} = this.props;

        if(rectangles && !rectangles.isDestroyed() && this.rectangle) {
            rectangles.remove(this.rectangle);
        }
    }

    render() {
        return null;
    }
}
