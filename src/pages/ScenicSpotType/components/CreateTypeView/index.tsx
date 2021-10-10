import { showError, showLoading, showSuccess } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, PageHeader } from "antd";
import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LngLatPos } from "react-amap";

import { useState } from "react";
import MapComp from "@/components/MapComp";
import { IScenicRegion } from "@/models/scenic-region.model";
import ScenicRegionHeader from "@/components/ScenicRegionHeader";
import { createScenicSpotTypeGql } from "../../request/gql";

interface Props {}

const CreateScenicSpotType = (props: Props) => {
    const [
        CreateScenicSpotTypeMutation,
        { loading: mutationLoading, error: mutationError, data },
    ] = useMutation(createScenicSpotTypeGql, { onError: (ex) => {} });

    const history = useHistory();

    useEffect(() => {
        mutationError && showError(mutationError.message);
    }, [mutationError]);

    useEffect(() => {
        showLoading(mutationLoading);
    }, [mutationLoading]);

    useEffect(() => {
        if (data) {
            console.error(1111, JSON.stringify(data));
            const { createScenicSpotType = {} } = data;
            if (createScenicSpotType.id) {
                showSuccess("创建景点分类成功", () => {
                    history.goBack();
                });
            }
        }
    }, [data]);

    const onFinish = useCallback((result) => {
        console.warn(JSON.stringify(result));
        CreateScenicSpotTypeMutation({
            variables: {
                spotTypeInput: {
                    displayName: result.name || "",
                    icon: result.icon || "",
                },
                spotTypeInfoInput: {
                    name: result.name || "",
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
            <PageHeader onBack={() => history.goBack()} ghost={false} title="创建景点类型" />
            <Form
                initialValues={{}}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 9,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="name"
                    label="景点分类名字"
                    rules={[
                        { required: true, message: "景点分类名字不能为空" },
                        { type: "string", min: 2, max: 8, message: "景点分类名字需要控制在2到8个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="icon" label="景点分类icon地址" rules={[{ required: false }]}>
                    <Input />
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

export default CreateScenicSpotType;
