import { IScenicSpotType, IScenicSpotTypeInfo } from "@/models/scenic-spot-type.model";
import { Card, Descriptions, PageHeader } from "antd";

interface Props {
    scenicSpotTypeInfo: IScenicSpotTypeInfo;
}

const ScenicSpotTypeInfoView = (props: Props) => {
    const { scenicSpotTypeInfo } = props;
    return (
        <div>
            <Descriptions labelStyle={{ fontWeight: 600 }} size="small" column={2}>
                <Descriptions.Item label="景点类型id">{scenicSpotTypeInfo?.id}</Descriptions.Item>
                <Descriptions.Item label="景点类型名字">{scenicSpotTypeInfo?.name}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ScenicSpotTypeInfoView;
