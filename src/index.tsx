//require('file-loader?name=[name].[ext]!./index.html')
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./App.scss"
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);