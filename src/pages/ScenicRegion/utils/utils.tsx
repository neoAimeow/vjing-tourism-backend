import { IScenicRegionInfo } from "@/models/scenic-region.model";
import { showError } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import ScenicRegionInfoInputView from "../components/ScenicRegionDetail/components/ScenicRegionInfoInputView";
import { createScenicRegionInfoGql } from "../request/gql";
const confirm = Modal.confirm;
const info = Modal.info;
export function showScenicRegionInfoModal(
    onMutation: (item: IScenicRegionInfo, resolve: (value: any) => void) => void,
    scenicRegionInfo?: IScenicRegionInfo
) {
    let data: IScenicRegionInfo;
    info({
        title: scenicRegionInfo ? "修改景点信息" : "创建景点信息",
        width: "930px",
        content: (
            <ScenicRegionInfoInputView
                scenicRegionInfo={scenicRegionInfo}
                onDataChange={(inner) => {
                    data = inner;
                }}
            />
        ),
        okText: scenicRegionInfo ? "修改" : "创建",
        cancelText: "取消",
        onOk() {
            return new Promise((resolve, reject) => {
                if (!data) {
                    showError("您没有填写任何参数");
                    reject();
                } else if (!data.name) {
                    showError("您没有填写必须的参数");
                    reject();
                } else {
                    return onMutation(data, resolve);
                }
            });
        },
    });
}