import {Component} from "react";

import Cartesian3 from "cesium/Source/Core/Cartesian3";
import HorizontalOrigin from "cesium/Source/Scene/HorizontalOrigin";
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin";


import {shallowEqual} from "utils/utils";

import GeometryInstance from "cesium/Source/Core/GeometryInstance";
import Rectangle from "cesium/Source/Core/Rectangle";
import RectangleGeometry from "cesium/Source/Core/RectangleGeometry";
import EllipsoidSurfaceAppearance from "cesium/Source/Scene/EllipsoidSurfaceAppearance";
import Primitive from "cesium/Source/Scene/Primitive";
import Material from "cesium/Source/Scene/Material";



export default class CesiumBillboard extends Component {
    componentDidMount() {
        const {billboards} = this.props;

        var instance = new GeometryInstance({
            geometry : new RectangleGeometry({
                rectangle : Rectangle.fromDegrees(0, -20.0, 20.0, 30.0),
                vertexFormat : EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
        });
          
        // scene.primitives.add(new Cesium.Primitive({
        // geometryInstances : instance,
        // appearance : new EllipsoidSurfaceAppearance({
        //     material : Cesium.Material.fromType('Stripe')
        // })
        // }));


        if(billboards) {
            this.billboard = billboards.add(new Primitive({
                geometryInstances : instance,
                appearance : new EllipsoidSurfaceAppearance({
                    material : Material.fromType('Stripe')
                })
            }));

        }
        
        // this.updateIcon();
    }

    // componentDidUpdate(prevProps) {
    //     if(!shallowEqual(this.props, prevProps)) {
    //         this.updateIcon();
    //     }
    // }

    // updateIcon() {
    //     const {image, scale = 1.0, lat, lon, alt, show = true, width} = this.props;

    //     if(this.billboard) {
    //         const newLocation = Cartesian3.fromDegrees(lon, lat, alt);

    //         this.billboard.position = newLocation;
    //         if(image) {
    //             this.billboard.image = image;
    //         }
    //         this.billboard.show = show;
    //         this.billboard.scale = scale;

    //         if(width) {
    //             this.billboard.width = width;
    //         }
    //     }
    // }

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
