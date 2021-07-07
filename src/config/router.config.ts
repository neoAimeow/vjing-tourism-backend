import React from "react";
import { Route } from "react-router-dom";

import TestPage from "../pages/testPage/index";
import TestPage2 from "../pages/testPage2/index";
import Welcome from "../pages/Welcome/index";
import UserList from "../pages/User/UserList/index";
import Register from "../pages/User/Register/index";
import Login from "../pages/User/Login/index";
import ScenicRegionList from "../pages/ScenicRegion/ScenicRegionList";
import CreateScenicRegion from "../pages/ScenicRegion/CreateScenicRegion";
import UpdateScenicRegion from "../pages/ScenicRegion/UpdateScenicRegion";
import ScenicRegionDetail from "../pages/ScenicRegion/ScenicRegionDetail";

export interface Router {
    path: string;
    routes?: Router[];
    component?: any;
}

export const router: Router[] = [
    {
        path: "/",
        // component: React.createElement(TestPage),
        component: Welcome,
    },
    {
        path: "/user",
        component: UserList,
        routes: [
            {
                path: "/user/register",
                component: Register,
            },
            {
                path: "/user/login",
                component: Login,
            },
        ],
    },
    {
        path: "/scenic-region",
        component: ScenicRegionList,
        routes: [
            {
                path: "/scenic-region/create",
                component: CreateScenicRegion,
            },
            {
                path: "/scenic-region/update",
                component: UpdateScenicRegion,
            },
            {
                path: "/scenic-region/detail",
                component: ScenicRegionDetail,
            },
        ],
    },
];
