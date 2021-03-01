import TestPage from "../pages/testPage/index";
export interface Menu {
    title: string;
    path: string;
    subMenus?: Menu[];
    component?: any;
}

export const menus: Menu[] = [
    {
        title: "title1",
        path: "path1",
        subMenus: [
            {
                title: "subtitle1",
                path: "path1",
                component: TestPage,
            },
            {
                title: "subtitle2",
                path: "path2",
                component: TestPage,
            },
            {
                title: "subtitle3",
                path: "path3",
            },
            {
                title: "subtitle4",
                path: "path4",
            },
        ],
    },
    {
        title: "title2",
        path: "path2",
        component: TestPage,
    },
    {
        title: "title3",
        path: "path3",
    },
    {
        title: "title4",
        path: "path4",
    },
];
