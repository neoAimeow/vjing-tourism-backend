import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Main from "./pages/Main/index";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./config/request.config";
import { BrowserRouter as Router } from "react-router-dom";
import { Map } from "react-amap";

import "./index.scss";
import "antd/dist/antd.css";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Main />
            </Router>
        );
    }
}

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <Map amapkey="b98dbc2b45db68137151f3b19e6bb128" />
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

reportWebVitals();
