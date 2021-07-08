import React from "react";
import { Route } from "react-router-dom";
import Welcome from "../pages/Welcome/index";
import UserList from "../pages/User/UserList/index";
import Register from "../pages/User/Register/index";
import Login from "../pages/User/Login/index";
import ScenicRegionList from "../pages/ScenicRegion/ScenicRegionList";
import CreateScenicRegion from "../pages/ScenicRegion/CreateScenicRegion";
import UpdateScenicRegion from "../pages/ScenicRegion/UpdateScenicRegion";
import ScenicRegionDetail from "../pages/ScenicRegion/ScenicRegionDetail";

export interface Router {
    name: string;
    path: string;
    // routes?: Router[];
    component?: any;
}

export const router: Router[] = [
    {
        name: "根目录",
        path: "/",
        // component: React.createElement(TestPage),
        component: Welcome,
    },
    {
        name: "用户列表",
        path: "/user/userList",
        component: UserList,
    },
    {
        name: "用户注册",
        path: "/user/register",
        component: Register,
    },
    {
        name: "用户登录",
        path: "/user/login",
        component: Login,
    },
    {
        name: "景点列表",
        path: "/scenic-region/list",
        component: ScenicRegionList,
    },
    {
        name: "景点创建",
        path: "/scenic-region/create",
        component: CreateScenicRegion,
    },
    {
        name: "景点更新",
        path: "/scenic-region/update",
        component: UpdateScenicRegion,
    },
    {
        name: "景点详情",
        path: "/scenic-region/detail",
        component: ScenicRegionDetail,
    },
];
