import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import "cesium-tsunamilab/Source/Widgets/widgets.css";

import buildModuleUrl from "cesium-tsunamilab/Source/Core/buildModuleUrl";
buildModuleUrl.setBaseUrl('./cesium-tsunamilab/');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
