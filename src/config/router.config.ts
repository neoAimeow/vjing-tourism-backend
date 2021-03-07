import React from "react";
import { Route } from "react-router-dom";

import TestPage from "../pages/testPage/index";
import TestPage2 from "../pages/testPage2/index";
import Welcome from "../pages/Welcome/index";
import UserList from "../pages/User/UserList/index";
import Register from "../pages/User/Register/index";
import Login from "../pages/User/Login/index";

export interface Router {
    path: string;
    routes?: Router[];
    component?: any;
}

export const router: Router[] = [
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
        path: "/path2",
        component: TestPage2,
    },
    {
        path: "/path3",
        component: TestPage2,
    },
    {
        path: "/path4",
        component: TestPage2,
    },
    {
        path: "/",
        // component: React.createElement(TestPage),
        component: Welcome,
    },
];
