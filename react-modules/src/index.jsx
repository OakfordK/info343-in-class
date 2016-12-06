
// Without ./ it looks in the node-modules
import React from "react";
import {render} from "react-dom";

// Assumes./ leads to local path
import App from "./app.jsx";

render(<App/>, document.getElementById("app"));
