import { IScenicSpotType, IScenicSpotTypeInfo } from "@/models/scenic-spot-type.model";
import { showError } from "@/utils/message";
import { Modal } from "antd";
import ScenicSpotTypeInfoInputView from "../components/ScenicSpotTypeDetail/ScenicSpotTypeInfoInputView";
import ScenicSpotTypeInputView from "../components/ScenicSpotTypeDetail/ScenicSpotTypeInputView";

const info = Modal.info;
export function showScenicSpotTypeInfoModal(
    onMutation: (item: IScenicSpotTypeInfo, resolve: (value: any) => void) => void,
    scenicSpotTypeInfo?: IScenicSpotTypeInfo
) {
    let data: IScenicSpotTypeInfo;
    info({
        title: scenicSpotTypeInfo ? "修改景区信息" : "创建景区信息",
        width: "930px",
        closable: true,
        content: (
            <ScenicSpotTypeInfoInputView
                scenicSpotTypeInfo={scenicSpotTypeInfo}
                onDataChange={(inner) => {
                    data = inner;
                }}
            />
        ),
        okText: scenicSpotTypeInfo ? "修改" : "创建",
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

export function showEditScenicSpotTypeModal(
    onMutation: (item: IScenicSpotType, resolve: (value: any) => void) => void,
    scenicSpotType?: IScenicSpotType
) {
    let data: IScenicSpotType;
    info({
        title: "修改景点类型信息",
        width: "930px",
        closable: true,
        content: (
            <ScenicSpotTypeInputView
                scenicSpotType={scenicSpotType}
                onDataChange={(inner) => {
                    data = inner;
                }}
            />
        ),
        okText: "修改",
        cancelText: "取消",
        onOk() {
            return new Promise((resolve, reject) => {
                if (!data) {
                    showError("您没有填写任何参数");
                    reject();
                } else if (!data.displayName) {
                    showError("您没有填写必须的参数");
                    reject();
                } else {
                    return onMutation(data, resolve);
                }
            });
        },
    });
}
