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
                <Descriptions.Item label="景区latitude">{scenicRegion?.locationLat}</Descriptions.Item>
                <Descriptions.Item label="景区longitude">{scenicRegion?.locationLng}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ScenicRegionHeader;
