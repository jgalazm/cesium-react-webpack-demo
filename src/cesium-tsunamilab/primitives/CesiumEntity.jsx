import {Component} from "react";

import Cartesian3 from "cesium-tsunamilab/Source/Core/Cartesian3";
import HorizontalOrigin from "cesium-tsunamilab/Source/Scene/HorizontalOrigin";
import VerticalOrigin from "cesium-tsunamilab/Source/Scene/VerticalOrigin";
import Color from "cesium-tsunamilab/Source/Core/Color";
import Rectangle from "cesium-tsunamilab/Source/Core/Rectangle";

// import {shallowEqual} from "utils/utils";


export default class CesiumBillboard extends Component {
    componentDidMount() {
        const {entities} = this.props;

        if(entities) {
            
            let color = Color.RED.withAlpha(0.5);
            let rectangle = Rectangle.fromDegrees(5, -80, 10, 80);

            this.entities = entities.add({
                rectangle: {
                    coordinates: rectangle,
                    material: color,
                //   material: this.props.videoElement,
                    asynchronous: true
                }
            });

        }
        
        this.updateIcon();
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
        const {rectangle} = this.props;

        if(rectangle && !rectangle.isDestroyed() && this.rectangle) {
            rectangle.remove(this.billboard);
        }
    }

    render() {
        return null;
    }
}
