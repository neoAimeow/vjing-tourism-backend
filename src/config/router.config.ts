import Welcome from "../pages/Welcome/index";
import UserList from "../pages/User/components/UserList/index";
import Register from "../pages/User/components/Register/index";
import Login from "../pages/User/components/Login/index";
import ScenicRegionList from "../pages/ScenicRegion/components/ScenicRegionList";
import CreateScenicRegion from "../pages/ScenicRegion/components/CreateScenicRegion";
import UpdateScenicRegion from "../pages/ScenicRegion/components/UpdateScenicRegion";
import ScenicRegionDetail from "../pages/ScenicRegion/components/ScenicRegionDetail";

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
        component: Welcome,
    },
    {
        name: "用户列表",
        path: "/user/list",
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
