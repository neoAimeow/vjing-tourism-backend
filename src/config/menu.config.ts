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
        path: "/scenic-region",
    },
];
