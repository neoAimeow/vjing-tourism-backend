import { ApolloError, useMutation } from "@apollo/client";
import { Button, Form, Input, Modal, PageHeader, Radio, Switch, notification, message } from "antd";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { hideLoading, showError, showLoading, showSuccess } from "@/utils/message.config";
import { createUserGql } from "../../request/gql";
const { confirm } = Modal;

interface Props {}

const CreateUser = (props: Props) => {
    const [createUserMutation, { loading: mutationLoading, error: mutationError, data }] = useMutation(createUserGql, {
        onError: (ex) => {},
    });
    const history = useHistory();

    useEffect(() => {
        mutationError && showError(mutationError.message);
    }, [mutationError]);

    useEffect(() => {
        showLoading(mutationLoading);
    }, [mutationLoading]);

    useEffect(() => {
        if (data) {
            if (data.createUser && data.createUser.id) {
                showSuccess("创建用户成功", () => {
                    history.goBack();
                });
            }
        }
    }, [data]);

    const onFinish = useCallback((result) => {
        createUserMutation({
            variables: {
                data: {
                    name: result.name,
                    email: result.email,
                    role: result.role,
                    password: result.password,
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
            <PageHeader ghost={false} onBack={() => history.goBack()} title="创建用户" />
            <Form
                initialValues={{ role: "USER" }}
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
                    name="name"
                    label="用户名字"
                    rules={[
                        { required: true, message: "名字不能为空" },
                        { type: "string", min: 2, max: 5, message: "名字需要控制在2到5个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="用户邮箱"
                    rules={[
                        { required: true, message: "用户邮箱不能为空" },
                        {
                            type: "email",
                            message: "邮箱输入不合法",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        { required: true, message: "密码不能为空" },
                        { type: "string", min: 8, max: 30, message: "密码需要控制在6到30个字符内" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="passwordAgain"
                    label="再次输入"
                    rules={[
                        { required: true, message: "密码不能为空" },
                        { type: "string", min: 8, max: 30, message: "密码需要控制在6到30个字符内" },
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
                <Form.Item name="role" label="权限" rules={[{ required: false }]}>
                    <Radio.Group size="large">
                        <Radio.Button value="ADMIN">管理员</Radio.Button>
                        <Radio.Button value="USER">普通用户</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        创建
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateUser;
