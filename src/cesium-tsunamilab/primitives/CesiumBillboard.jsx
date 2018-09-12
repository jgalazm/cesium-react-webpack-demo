import {Component} from "react";

import Cartesian3 from "cesium-tsunamilab/Source/Core/Cartesian3";
import HorizontalOrigin from "cesium-tsunamilab/Source/Scene/HorizontalOrigin";
import VerticalOrigin from "cesium-tsunamilab/Source/Scene/VerticalOrigin";
import NearFarScalar from "cesium-tsunamilab/Source/Core/NearFarScalar";

import {shallowEqual} from "utils/utils";

import pin from "./pin.svg";


export default class CesiumBillboard extends Component {
    componentDidMount() {
        const {billboards} = this.props;

        if(billboards) {
            this.billboard = billboards.add({
                eyeOffset : new Cartesian3(0.0, 0.0, 0.0),
                horizontalOrigin : HorizontalOrigin.CENTER,
                verticalOrigin : VerticalOrigin.CENTER,
            });

        }
        
        this.updateIcon();
    }

    componentDidUpdate(prevProps) {
        if(!shallowEqual(this.props, prevProps)) {
            this.updateIcon();
        }
    }

    updateIcon() {
        const { show = true, width} = this.props;

        if(this.billboard) {
            console.log(pin,NearFarScalar,'asdf');
            const newLocation = Cartesian3.fromDegrees(180, 0, 1000);
            this.billboard.position = newLocation;
            this.billboard.image = pin;
            this.billboard.show = show;
            this.billboard.width = 48;
            this.billboard.height = 51;
            this.billboard.scaleByDistance = new NearFarScalar(1e6,1.0,1e6*18,0.0);

            // this.billboard.scale = scale;

            if(width) {
                this.billboard.width = width;
            }
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