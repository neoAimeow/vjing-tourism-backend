import { Language } from "@/models/common";
import { IScenicRegion, IScenicRegionInfo } from "@/models/scenic-region.model";
import { createScenicRegionInfoGql } from "@/pages/ScenicRegion/request/gql";
import { showError, showLoading } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Card, Col, Descriptions, Form, Input, PageHeader, Radio, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { $enum } from "ts-enum-util";

interface Props {
    scenicRegionInfo?: IScenicRegionInfo;
    onDataChange?: (scenicRegionInfo: IScenicRegionInfo) => void;
}

const ScenicRegionInfoView = (props: Props) => {
    const { scenicRegionInfo, onDataChange } = props;
    const [inputData = scenicRegionInfo, setInput] = useState<IScenicRegionInfo>();
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
                    title: inputData?.title,
                    layersDisplayName: inputData?.layersDisplayName,
                    layer: inputData?.layer,
                    vrUrl: inputData?.vrUrl,
                    ticketUrl: inputData?.ticketUrl,
                    lang: inputData?.lang,
                }}
            >
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item name="name" label="景区名字" rules={[{ required: true, message: "请输入景区名字" }]}>
                            <Input
                                placeholder="请输入景区名字"
                                onChange={(e) => {
                                    setInput({ ...inputData, name: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="title"
                            label="景区标题"
                            rules={[{ required: true, message: "请输入景区标题" }]}
                        >
                            <Input
                                placeholder="请输入景区标题"
                                onChange={(e) => {
                                    setInput({ ...inputData, title: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item
                            name="layersDisplayName"
                            label="景区layer展示名字"
                            rules={[{ required: true, message: "请输入景区标题" }]}
                        >
                            <Input
                                placeholder="请输入景区layer展示名字"
                                onChange={(e) => {
                                    setInput({ ...inputData, layersDisplayName: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="layer" label="景区layer" rules={[{ required: true, message: "景区门票链接" }]}>
                            <Input
                                placeholder="请输入景区门票链接"
                                onChange={(e) => {
                                    setInput({ ...inputData, layer: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item
                            name="vrUrl"
                            label="景区VR链接"
                            rules={[{ required: true, message: "请输入景区VR链接" }]}
                        >
                            <Input
                                placeholder="请输入景区VR链接"
                                onChange={(e) => {
                                    setInput({ ...inputData, vrUrl: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="ticketUrl"
                            label="景区门票链接"
                            rules={[{ required: true, message: "景区门票链接" }]}
                        >
                            <Input
                                placeholder="请输入景区门票链接"
                                onChange={(e) => {
                                    setInput({ ...inputData, ticketUrl: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>{" "}
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item name="lang" label="语言选择" rules={[{ required: true, message: "请选择语言" }]}>
                            <Radio.Group>
                                {languages.map((value) => {
                                    return (
                                        <Radio.Button
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

export default ScenicRegionInfoView;
