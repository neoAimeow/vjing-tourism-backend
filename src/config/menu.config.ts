import React from "react";
import { Route } from "react-router-dom";

import TestPage from "../pages/testPage/index";
import TestPage2 from "../pages/testPage2/index";
export interface Menu {
    title: string;
    path: string;
    subMenus?: Menu[];
    role?: string[];
}

export const menus: Menu[] = [
    {
        title: "首页",
        path: "/",
        role: ["admin"],
    },
    {
        title: "页面2",
        path: "/path1",

        // subMenus: [
        //     {
        //         title: "subtitle1",
        //         path: "/path1",
        //         component: TestPage,
        //     },
        //     {
        //         title: "subtitle2",
        //         path: "/path2",
        //         component: TestPage,
        //     },
        //     {
        //         title: "subtitle3",
        //         path: "/path3",
        //     },
        //     {
        //         title: "subtitle4",
        //         path: "/path4",
        //     },
        // ],
    },
    {
        title: "页面3",
        path: "/path2",
    },
    {
        title: "页面4",
        path: "/path3",
    },
    {
        title: "页面5",
        path: "/path4",
    },
];
