import { showError, showLoading, showSuccess } from "@/utils/message";
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
import UploadImage from "@/components/UploadImage";

interface Props {}

const CreateScenicSpotType = (props: Props) => {
    const [icon, setIcon] = useState<string>("");
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
            const { createScenicSpotType = {} } = data;
            if (createScenicSpotType.id) {
                showSuccess("创建景点分类成功", () => {
                    history.goBack();
                });
            }
        }
    }, [data]);

    const onFinish = useCallback(
        (result) => {
            if (!icon) {
                showError("图片未上传");
                return;
            }
            CreateScenicSpotTypeMutation({
                variables: {
                    spotTypeInput: {
                        displayName: result.name || "",
                        icon: icon || "",
                    },
                    spotTypeInfoInput: {
                        name: result.name || "",
                    },
                },
            });
        },
        [icon]
    );

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
                    <UploadImage
                        imageUploadedCallback={(imageUrl) => {
                            console.error(2222, imageUrl);
                            setIcon(imageUrl);
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

export default CreateScenicSpotType;
