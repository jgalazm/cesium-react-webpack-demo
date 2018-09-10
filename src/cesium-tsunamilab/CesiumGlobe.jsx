import React, {Component} from "react";

import Viewer from "cesium-tsunamilab/Source/Widgets/Viewer/Viewer";
import BingMapsImageryProvider from "cesium-tsunamilab/Source/Scene/BingMapsImageryProvider";
import CesiumTerrainProvider from "cesium-tsunamilab/Source/Core/CesiumTerrainProvider";

const BING_MAPS_URL = "//dev.virtualearth.net";
const BING_MAPS_KEY = "ApDPY15x9lCXO5Hw89M1G5Q84_BlKalPbjor8GvKGj2UAnVtzlT5UT-zrylU1e48";
const STK_TERRAIN_URL = "//assets.agi.com/stk-terrain/world";

import CesiumProjectContents from "./CesiumProjectContents";
import CesiumClickHandler from "./CesiumClickHandler";
import CesiumCameraManager from "./CesiumCameraManager";



export default class CesiumGlobe extends Component {
    state = {
        viewerLoaded : false,
    }

    componentDidMount() {
        const imageryProvider = new BingMapsImageryProvider({
            url : BING_MAPS_URL,
            key : BING_MAPS_KEY,
        });

        const terrainProvider = new CesiumTerrainProvider({
            url : STK_TERRAIN_URL
        });

        this.viewer = new Viewer(this.cesiumContainer, {
            animation : false,
            baseLayerPicker : false,
            fullscreenButton : false,
            geocoder : false,
            homeButton : false,
            infoBox : false,
            sceneModePicker : false,
            selectionIndicator : true,
            timeline : false,
            navigationHelpButton : false,
            scene3DOnly : true,
            imageryProvider,
            terrainProvider,
        });

        // Force immediate re-render now that the Cesium viewer is created
        this.setState({viewerLoaded : true}); // eslint-disable-line react/no-did-mount-set-state
    }

    componentWillUnmount() {
        if(this.viewer) {
            this.viewer.destroy();
        }
    }

    renderContents() {
        const {viewerLoaded} = this.state;
        let contents = null;

        if(viewerLoaded) {
            const {scene} = this.viewer;
            const {icons, labels, polylines, onLeftClick, flyToLocation} = this.props;

            let {simulationCanvas, canvasIsReady, simulationVideo} = this.props;

            contents = (
                <span>
                    <CesiumProjectContents
                        scene={scene}
                        icons={icons}
                        labels={labels}
                        polylines={polylines}
                        simulationCanvas={simulationCanvas}
                        canvasIsReady={canvasIsReady}
                        simulationVideo={simulationVideo}

                    />
                    <CesiumClickHandler
                        scene={scene}
                        onLeftClick={onLeftClick}
                    />
                    <CesiumCameraManager
                        camera={scene.camera}
                        flyToLocation={flyToLocation}
                    />
                </span>
            );
        }

        return contents;
    }

    render() {
        const containerStyle = {
            width: '100%',
            height: '60%',
            display : "flex",
            alignItems : "stretch",
        };

        const widgetStyle = {
            flexGrow : 2
        }

        const contents = this.renderContents()

        return (
            <div className="cesiumGlobeWrapper" style={containerStyle}>
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}
                >
                    {contents}
                </div>
            </div>
        );
    }
}
