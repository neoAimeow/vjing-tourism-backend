import { Language } from "@/models/common";
import { IScenicSpotTypeInfo } from "@/models/scenic-spot-type.model";
import { Card, Col, Descriptions, Form, Input, PageHeader, Radio, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { $enum } from "ts-enum-util";

interface Props {
    scenicSpotTypeInfo?: IScenicSpotTypeInfo;
    onDataChange?: (scenicSpotTypeInfo: IScenicSpotTypeInfo) => void;
}

const ScenicSpotTypeInfoInputView = (props: Props) => {
    const { scenicSpotTypeInfo, onDataChange } = props;
    const [inputData = scenicSpotTypeInfo, setInput] = useState<IScenicSpotTypeInfo>();
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
                    name: inputData?.name,
                    lang: inputData?.lang,
                }}
            >
                <Row gutter={20}>
                    <Form.Item name="name" label="景点类型名字" rules={[{ required: true, message: "请输入景区名字" }]}>
                        <Input
                            placeholder="请输入景点类型名字"
                            onChange={(e) => {
                                setInput({ ...inputData, name: e?.target?.value });
                            }}
                        />
                    </Form.Item>
                </Row>

                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item name="lang" label="语言选择" rules={[{ required: true, message: "请选择语言" }]}>
                            <Radio.Group>
                                {languages.map((value) => {
                                    return (
                                        <Radio.Button
                                            disabled={!!scenicSpotTypeInfo}
                                            value={value[0]}
                                            onChange={(e) => {
                                                setInput({ ...inputData, lang: e?.target?.value });
                                            }}
                                        >
                                            {value[1]}
                                        </Radio.Button>
                                    );
                                })}
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ScenicSpotTypeInfoInputView;
