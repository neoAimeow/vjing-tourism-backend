import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useLocation,
    withRouter,
} from "react-router-dom";

import "./index.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { menus } from "../../config/menu.config";
import { router } from "../../config/router.config";
const { Header, Sider, Content, Footer } = Layout;

interface Props {}

const Main = (props: Props) => {
    console.warn("page2");
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

    useEffect(() => {
        console.log(location.pathname);
        setSelectedKeys([location.pathname]);
    }, [location]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={false}>
                <div className="logo">未景科技</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["/"]}
                    selectedKeys={selectedKeys}
                >
                    {menus.map((item, index) => {
                        return (
                            <Menu.Item key={item.path}>
                                <Link to={item.path}>{item.title}</Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                ></Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        {router.map((item, index) => {
                            return (
                                <Route
                                    exact
                                    key={item.path}
                                    path={item.path}
                                    component={item.component}
                                />
                            );
                        })}
                    </Switch>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    ©2021 Created by 未景科技
                </Footer>
            </Layout>
        </Layout>
    );
};

export default withRouter(Main);
