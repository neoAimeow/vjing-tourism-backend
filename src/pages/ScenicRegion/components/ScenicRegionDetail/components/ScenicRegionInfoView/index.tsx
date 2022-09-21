import { IScenicRegion, IScenicRegionInfo } from "@/models/scenic-region.model";
import { Card, Descriptions, PageHeader } from "antd";

interface Props {
    scenicRegionInfo: IScenicRegionInfo;
}

const ScenicRegionInfoView = (props: Props) => {
    const { scenicRegionInfo } = props;
    return (
        <div>
            <Descriptions labelStyle={{ fontWeight: 600 }} size="small" column={2}>
                <Descriptions.Item label="景区名字(多语言)">{scenicRegionInfo?.name}</Descriptions.Item>
                <Descriptions.Item label="景区layer">{scenicRegionInfo?.layer}</Descriptions.Item>
                <Descriptions.Item label="景区layer展示名字">{scenicRegionInfo?.layersDisplayName}</Descriptions.Item>
                <Descriptions.Item label="景区标题">{scenicRegionInfo?.title}</Descriptions.Item>
                <Descriptions.Item label="景区门票链接">{scenicRegionInfo?.ticketUrl}</Descriptions.Item>
                <Descriptions.Item label="景区VR链接">{scenicRegionInfo?.vrUrl}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default ScenicRegionInfoView;
