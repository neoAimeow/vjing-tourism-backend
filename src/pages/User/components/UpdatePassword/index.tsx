import { Button, Form, Input, Modal, PageHeader, Radio, Switch } from "antd";
import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
const { confirm } = Modal;

interface Props {}

const UpdatePassword = (props: Props) => {
    const onFinish = useCallback((result) => {
        console.warn(JSON.stringify(result));
    }, []);

    const onFinishFailed = useCallback((error) => {
        const { values, errorFields = [] } = error || {};
        confirm({
            title: `温馨提醒您`,
            content: `${errorFields[0]?.errors}`,
            onOk() {},
        });
    }, []);
    const history = useHistory();

    return (
        <div>
            <PageHeader ghost={false} onBack={() => history.goBack()} title="修改密码" />
            <Form
                initialValues={{ role: "user", name }}
                name="control-hooks"
                labelCol={{
                    span: 2,
                }}
                wrapperCol={{
                    span: 5,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="oldPassword"
                    label="密码"
                    rules={[
                        { required: true, message: "密码不能为空" },
                        { type: "string", min: 6, max: 30, message: "密码需要控制在6到30个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        { required: true, message: "密码不能为空" },
                        { type: "string", min: 6, max: 30, message: "密码需要控制在6到30个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="passwordAgain"
                    label="再次输入"
                    rules={[
                        { required: true, message: "密码不能为空" },
                        { type: "string", min: 6, max: 30, message: "密码需要控制在6到30个字符内" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("两次输入的密码不相同"));
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        修改密码
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdatePassword;
