export interface Menu {
    title: string;
    path: string;
    subMenus?: Menu[];
}

export const menus: Menu[] = [
    {
        title: "title1",
        path: "path1",
        subMenus: [
            {
                title: "subtitle1",
                path: "path1",
            },
            {
                title: "subtitle2",
                path: "path2",
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
