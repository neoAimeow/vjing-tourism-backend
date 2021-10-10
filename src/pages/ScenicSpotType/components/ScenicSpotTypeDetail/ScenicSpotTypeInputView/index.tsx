import { Language } from "@/models/common";
import { IScenicSpotType, IScenicSpotTypeInfo } from "@/models/scenic-spot-type.model";
import { Card, Col, Descriptions, Form, Input, PageHeader, Radio, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { $enum } from "ts-enum-util";

interface Props {
    scenicSpotType?: IScenicSpotType;
    onDataChange?: (scenicSpotType: IScenicSpotType) => void;
}

const ScenicSpotTypeInputView = (props: Props) => {
    const { scenicSpotType, onDataChange } = props;
    const [inputData = scenicSpotType, setInput] = useState<IScenicSpotType>();
    const languages = $enum(Language).getEntries();
    useEffect(() => {
        if (inputData) {
            onDataChange && onDataChange(inputData);
        }
    }, [inputData]);

    return (
        <div>
            <Form
                layout="vertical"
                hideRequiredMark
                initialValues={{
                    displayName: inputData?.displayName,
                    icon: inputData?.icon,
                }}
            >
                <Row gutter={20}>
                    <Form.Item name="name" label="景点类型名字" rules={[{ required: true, message: "请输入景区名字" }]}>
                        <Input
                            placeholder="请输入景点类型名字"
                            onChange={(e) => {
                                setInput({ ...inputData, displayName: e?.target?.value });
                            }}
                        />
                    </Form.Item>
                </Row>

                <Row gutter={20}>
                    <Form.Item name="icon" label="景点类型图标" rules={[{ required: true, message: "请输入景区名字" }]}>
                        <Input
                            placeholder="请输入景点类型图标地址"
                            onChange={(e) => {
                                setInput({ ...inputData, icon: e?.target?.value });
                            }}
                        />
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );
};

export default ScenicSpotTypeInputView;
