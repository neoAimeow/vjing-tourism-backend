import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
    <React.StrictMode>
        <Layout>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, textAlign: "center" }}
                    ></div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
