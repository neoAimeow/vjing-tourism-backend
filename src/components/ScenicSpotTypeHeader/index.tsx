import { Descriptions } from "antd";

import { IScenicRegion } from "@/models/scenic-region.model";
import { IScenicSpotType } from "@/models/scenic-spot-type.model";

interface Props {
    scenicSpotType: IScenicSpotType | undefined;
}

const ScenicSpotTypeHeader = (props: Props) => {
    const { scenicSpotType } = props || {};
    return (
        <div>
            <Descriptions labelStyle={{ fontWeight: 600 }} size="small" column={1}>
                <Descriptions.Item label="景区id">{scenicSpotType?.id}</Descriptions.Item>
                <Descriptions.Item label="景区名字">{scenicSpotType?.displayName}</Descriptions.Item>
                <Descriptions.Item label="景区icon">{scenicSpotType?.icon}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ScenicSpotTypeHeader;
