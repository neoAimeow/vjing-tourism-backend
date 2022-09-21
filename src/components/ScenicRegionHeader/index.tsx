import { Descriptions } from "antd";

import { IScenicRegion } from "@/models/scenic-region.model";

interface Props {
    scenicRegion: IScenicRegion | undefined;
}

const ScenicRegionHeader = (props: Props) => {
    const { scenicRegion } = props || {};
    return (
        <div>
            <Descriptions labelStyle={{ fontWeight: 600 }} size="small" column={2}>
                <Descriptions.Item label="景区id">{scenicRegion?.id}</Descriptions.Item>
                <Descriptions.Item label="景区名字">{scenicRegion?.displayName}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{scenicRegion?.createdAt}</Descriptions.Item>
                <Descriptions.Item label="修改时间">{scenicRegion?.updatedAt}</Descriptions.Item>
                <Descriptions.Item label="景区坐标">
                    ({scenicRegion?.locationLng}，{scenicRegion?.locationLat})
                </Descriptions.Item>
                <Descriptions.Item label="zoom">{scenicRegion?.zoom}</Descriptions.Item>
                <Descriptions.Item label="最大缩放">{scenicRegion?.maxZoom}</Descriptions.Item>
                <Descriptions.Item label="最小缩放">{scenicRegion?.minZoom}</Descriptions.Item>
                <Descriptions.Item label="图片状态">{scenicRegion?.sliceState}</Descriptions.Item>
                <Descriptions.Item label="enableNavigation">
                    {scenicRegion?.enableNavigation ? "打开" : "关闭"}
                </Descriptions.Item>
                <Descriptions.Item label="enablePoiLanguageSwitch">
                    {scenicRegion?.enablePoiLanguageSwitch ? "打开" : "关闭"}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ScenicRegionHeader;
