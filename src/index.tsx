import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Main from "./pages/Main/index";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./config/request.config";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Map } from "react-amap";

import "./index.scss";
import "antd/dist/antd.css";
import { NEED_LOGIN_EVENT_KEY } from "./models/constant";
import Emitter from "./utils/emitter";

class App extends React.Component {
    componentWillMount() {
        console.error(11123123123);

        Emitter.on(NEED_LOGIN_EVENT_KEY, this.aaa);
    }
    aaa = () => {
        console.error(11123123123);
        let history = useHistory();
        history.push({ pathname: "/user/login" });
    };

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
