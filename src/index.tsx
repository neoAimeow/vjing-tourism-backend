import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import "./index.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { menus } from "./config/menu.config";

const { Header, Sider, Content, Footer } = Layout;

class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">未景科技</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["0"]}
                    >
                        {menus &&
                            menus.map((item, index) => {
                                if (item.subMenus) {
                                    return (
                                        <Menu.ItemGroup
                                            title={item.title}
                                            key={index}
                                        >
                                            {item.subMenus &&
                                                item.subMenus.map(
                                                    (subItem, subIndex) => {
                                                        return (
                                                            <Menu.Item
                                                                key={`${index}-${subIndex}`}
                                                            >
                                                                {subItem.title}
                                                            </Menu.Item>
                                                        );
                                                    }
                                                )}
                                        </Menu.ItemGroup>
                                    );
                                } else {
                                    return (
                                        <Menu.Item key={index}>
                                            {item.title}
                                        </Menu.Item>
                                    );
                                }
                            })}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{ padding: 0 }}
                    >
                        {React.createElement(
                            this.state.collapsed
                                ? MenuUnfoldOutlined
                                : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: this.toggle,
                            }
                        )}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        ©2021 Created by 未景科技
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
