import {Component} from "react";

import Cartesian3 from "cesium/Source/Core/Cartesian3";
import HorizontalOrigin from "cesium/Source/Scene/HorizontalOrigin";
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin";


import {shallowEqual} from "utils/utils";

import GeometryInstance from "cesium/Source/Core/GeometryInstance";
import Rectangle from "cesium/Source/Core/Rectangle";
import RectangleGeometry from "cesium/Source/Core/RectangleGeometry";
import EllipsoidSurfaceAppearance from "cesium/Source/Scene/EllipsoidSurfaceAppearance";
import MaterialAppearance from "cesium/Source/Scene/MaterialAppearance";
import Primitive from "cesium/Source/Scene/Primitive";
import Material from "cesium/Source/Scene/Material";



export default class CesiumBillboard extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const {billboards, simulationVideo, simulationCanvas} = this.props;

        console.log(simulationVideo);
        debugger;

        var instance = new GeometryInstance({
            geometry : new RectangleGeometry({
                rectangle : Rectangle.fromDegrees(-180, -80.0, 180.0, 80.0),
                vertexFormat : EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
        });
          
        var stream = simulationCanvas.captureStream();
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
