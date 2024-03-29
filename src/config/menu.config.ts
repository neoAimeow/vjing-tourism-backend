import React from "react";
import { Route } from "react-router-dom";
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
        title: "景区管理",
        path: "/scenic-region/list",
    },
    {
        title: "景点类型管理",
        path: "/scenic-spot-type/list",
    },
    {
        title: "用户管理",
        path: "/user/list",
    },
];
