import { Language } from "@/models/common";
import { IScenicRegion, IScenicRegionInfo } from "@/models/scenic-region.model";
import { createScenicRegionInfoGql } from "@/pages/ScenicRegion/request/gql";
import { showError, showLoading } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Card, Col, Descriptions, Form, Input, PageHeader, Radio, Row, Switch } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { $enum } from "ts-enum-util";

interface Props {
    scenicRegion?: IScenicRegion;
    onDataChange?: (scenicRegion: IScenicRegion) => void;
}

const ScenicRegionInfoView = (props: Props) => {
    const { scenicRegion, onDataChange } = props;
    const [inputData = scenicRegion, setInput] = useState<IScenicRegion>();
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
                    enableNavigation: inputData?.enableNavigation,
                    enablePoiLanguageSwitch: inputData?.enablePoiLanguageSwitch,
                    zoom: inputData?.zoom,
                    maxZoom: inputData?.maxZoom,
                    minZoom: inputData?.minZoom,
                }}
            >
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item
                            name="displayName"
                            label="景区名字(唯一)"
                            rules={[{ required: true, message: "请输入景区名字" }]}
                        >
                            <Input
                                placeholder="请输入景区名字"
                                onChange={(e) => {
                                    setInput({ ...inputData, displayName: e?.target?.value });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="zoom" label="zoom" rules={[{ required: true, message: "请输入zoom" }]}>
                            <Input
                                placeholder="请输入zoom"
                                onChange={(e) => {
                                    setInput({ ...inputData, zoom: Number(e?.target?.value) });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item
                            name="minZoom"
                            label="minZoom"
                            rules={[{ required: true, message: "请输入minZoom" }]}
                        >
                            <Input
                                placeholder="请输入minZoom"
                                onChange={(e) => {
                                    setInput({ ...inputData, minZoom: Number(e?.target?.value) });
                                }}
                            />
                        </Form.Item>
                    </Col>{" "}
                    <Col span={10}>
                        <Form.Item
                            name="maxZoom"
                            label="maxZoom"
                            rules={[{ required: true, message: "请输入maxZoom" }]}
                        >
                            <Input
                                placeholder="请输入maxZoom"
                                onChange={(e) => {
                                    setInput({ ...inputData, maxZoom: Number(e?.target?.value) });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item
                            name="enableNavigation"
                            label="enableNavigation"
                            rules={[{ required: true, message: "请选择enableNavigation" }]}
                        >
                            <Switch
                                onChange={(e) => {
                                    setInput({ ...inputData, enableNavigation: e });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="enablePoiLanguageSwitch"
                            label="enablePoiLanguageSwitch"
                            rules={[{ required: true, message: "请选择enablePoiLanguageSwitch" }]}
                        >
                            <Switch
                                onChange={(e) => {
                                    setInput({ ...inputData, enablePoiLanguageSwitch: e });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ScenicRegionInfoView;
