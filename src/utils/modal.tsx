import MapComp from "@/components/MapComp";
import { LngLat } from "react-amap";
import { Modal } from "antd";
import { IScenicRegionInfo } from "@/models/scenic-region.model";
const confirm = Modal.confirm;
const info = Modal.info;

export function showSelectLocationModal(defaultCoodirate?: LngLat, onSelect?: (coordinate: LngLat) => void): void {
    let location: LngLat;
    info({
        title: "坐标选择",
        width: "930px",
        content: (
            <MapComp
                showInput={false}
                onCoordinateChange={(locationInner) => {
                    location = locationInner;
                }}
            />
        ),
        okText: "选择",
        cancelText: "取消",
        onOk() {
            onSelect && onSelect(location);
        },
        onCancel() {},
    });
}
