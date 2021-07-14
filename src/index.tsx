import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Main from "./pages/Main/index";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./config/request.config";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

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
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

reportWebVitals();
