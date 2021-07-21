import { showError, showLoading } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Button, Descriptions, Form, Input, PageHeader, Select, Switch } from "antd";
import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LngLat, LngLatPos, Map, Marker } from "react-amap";

import { createSceincRegionGql } from "../../request/gql";
import { useState } from "react";
import MapComp from "@/components/MapComp";
import PrimaryButton from "@/components/PrimaryButton";
import { showSelectLocationModal } from "@/utils/modal.config";

interface Props {}

const CreateScenicRegion = (props: Props) => {
    const [createSceincRegionMutation, { loading: mutationLoading, error: mutationError, data }] = useMutation(createSceincRegionGql, { onError: (ex) => {} });
    const history = useHistory();
    const [center, setCenter] = useState<LngLatPos>();

    useEffect(() => {
        mutationError && showError(mutationError.message);
    }, [mutationError]);

    useEffect(() => {
        showLoading(mutationLoading);
    }, [mutationLoading]);

    const onFinish = useCallback((result) => {
        console.warn(JSON.stringify(result));
        createSceincRegionMutation({
            variables: {
                regionInput: {
                    displayName: result.name,
                    enableNavigation: result.enableNavigation,
                    enablePoiLanguageSwitch: result.enablePoiLanguageSwitch,
                    locationLat: center?.lat || 0,
                    locationLng: center?.lng || 0,
                    zoom: Number(result.zoom),
                    minZoom: Number(result.minZoom),
                    maxZoom: Number(result.maxZoom),
                },
                regionInfoInput: {
                    name: result.name,
                    title: result.title,
                    layer: result.layer,
                    layerDisplayName: result.layerDisplayName,
                    vrUrl: result.vrUrl,
                    ticketUrl: result.ticketUrl,
                },
            },
        });
    }, []);

    const onFinishFailed = useCallback((error) => {
        const { values, errorFields = [] } = error || {};
        showError(`${errorFields[0]?.errors}`);
    }, []);

    return (
        <div>
            <PageHeader ghost={false} onBack={() => history.goBack()} title="创建景区" subTitle="景区名字" />
            <Form
                initialValues={{}}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 7,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    label="景区名字"
                    rules={[
                        { required: true, message: "景区名字不能为空" },
                        { type: "string", min: 2, max: 20, message: "景区名字需要控制在2到20个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="title" label="景区标题" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="layer" label="景区layer" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="layerDisplayName" label="景区layer展示名字" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="vrUrl" label="vr链接" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="ticketUrl" label="门票链接" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="enableNavigation" label="enableNavigation">
                    <Switch />
                </Form.Item>
                <Form.Item name="enablePoiLanguageSwitch" label="enablePoiLanguageSwitch">
                    <Switch />
                </Form.Item>
                <Form.Item name="zoom" label="zoom" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="minZoom" label="minZoom" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="maxZoom" label="maxZoom" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="coordinate" label="选择坐标">
                    <MapComp
                        onCoordinateChange={(coordinate) => {
                            setCenter(coordinate);
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateScenicRegion;
