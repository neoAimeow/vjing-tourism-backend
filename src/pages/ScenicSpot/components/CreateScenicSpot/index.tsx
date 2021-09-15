import { showError, showLoading } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, PageHeader } from "antd";
import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LngLatPos } from "react-amap";

import { createSceincSpotGql } from "../../request/gql";
import { useState } from "react";
import MapComp from "@/components/MapComp";
import { IScenicRegion } from "@/models/scenic-region.model";
import ScenicRegionHeader from "@/components/ScenicRegionHeader";

interface Props {}

const CreateScenicSpot = (props: Props) => {
    const [
        createSceincRegionMutation,
        { loading: mutationLoading, error: mutationError, data },
    ] = useMutation(createSceincSpotGql, { onError: (ex) => {} });
    const history = useHistory();
    const { state } = useLocation<IScenicRegion>();

    const [center = { lat: state.locationLat, lng: state.locationLng }, setCenter] = useState<LngLatPos>();

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
                scenicRegionId: state.id,
                input: {
                    displayName: result.name,
                    locationLat: center?.lat || 0,
                    locationLng: center?.lng || 0,
                },
                infoInput: {
                    name: result.name,
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
            <PageHeader onBack={() => history.goBack()} ghost={false} title="创建景点" subTitle={state.displayName}>
                <ScenicRegionHeader scenicRegion={state} />
            </PageHeader>
            <Form
                initialValues={{}}
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 9,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    label="景点名字"
                    rules={[
                        { required: true, message: "景点名字不能为空" },
                        { type: "string", min: 2, max: 20, message: "景点名字需要控制在2到20个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="scenicSpotTypeId" label="选择景点类型" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="introduction" label="景点介绍" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="iconUri" label="景点图标地址" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="audioUri" label="景点音频地址" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="imageUri" label="景点图片地址" rules={[{ required: false }]}>
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

export default CreateScenicSpot;
