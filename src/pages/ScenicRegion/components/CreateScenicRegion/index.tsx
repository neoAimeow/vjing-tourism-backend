import { Button, Descriptions, Form, Input, PageHeader, Select, Switch } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

interface Props {}

const CreateScenicRegion = (props: Props) => {
    console.warn(`create`);
    const history = useHistory();
    return (
        <div>
            <PageHeader ghost={false} onBack={() => history.goBack()} title="创建景区" subTitle="景区名字" />
            <Form
                name="control-hooks"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
            >
                <Form.Item name="name" label="景区名字" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="zoom" label="zoom" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="minZoom" label="minZoom" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="maxZoom" label="maxZoom" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="enableNavigation">
                    <Switch />
                </Form.Item>{" "}
                <Form.Item label="enablePoiLanguageSwitch">
                    <Switch />
                </Form.Item>
                <Form.Item name="name" label="景区标题" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="景区layer" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="景区layer展示名字" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="vr链接" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="门票链接" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button htmlType="button">重置</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateScenicRegion;
