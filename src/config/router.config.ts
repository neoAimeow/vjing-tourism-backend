import Welcome from "../pages/Welcome/index";
import UserList from "../pages/User/components/UserList/index";
import CreateUser from "../pages/User/components/CreateUser/index";
import UpdateUser from "../pages/User/components/UpdateUser/index";
import Login from "../pages/User/components/Login/index";
import ScenicRegionList from "../pages/ScenicRegion/components/ScenicRegionList";
import CreateScenicRegion from "../pages/ScenicRegion/components/CreateScenicRegion";
import UpdateScenicRegion from "../pages/ScenicRegion/components/UpdateScenicRegion";
import ScenicRegionDetail from "../pages/ScenicRegion/components/ScenicRegionDetail";
import UpdatePassword from "../pages/User/components/UpdatePassword";
import ScenicSpotList from "@/pages/ScenicSpot/components/ScenicSpotList";
import CreateScenicSpot from "@/pages/ScenicSpot/components/CreateScenicSpot";

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
        name: "创建用户",
        path: "/user/create",
        component: CreateUser,
    },
    {
        name: "更新用户",
        path: "/user/update",
        component: UpdateUser,
    },
    {
        name: "修改密码",
        path: "/user/updatePassword",
        component: UpdatePassword,
    },
    {
        name: "用户登录",
        path: "/user/login",
        component: Login,
    },
    {
        name: "景区列表",
        path: "/scenic-region/list",
        component: ScenicRegionList,
    },
    {
        name: "景区创建",
        path: "/scenic-region/create",
        component: CreateScenicRegion,
    },
    {
        name: "景区更新",
        path: "/scenic-region/update",
        component: UpdateScenicRegion,
    },
    {
        name: "景区详情",
        path: "/scenic-region/detail",
        component: ScenicRegionDetail,
    },

    {
        name: "景点列表",
        path: "/scenic-spot/list",
        component: ScenicSpotList,
    },
    {
        name: "创建景点",
        path: "/scenic-spot/create",
        component: CreateScenicSpot,
    },
];
