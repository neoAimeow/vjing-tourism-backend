import { showError, showLoading } from "@/utils/message.config";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Modal, PageHeader, Radio, Switch } from "antd";
import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { changePasswordGql } from "../../request/gql";
const { confirm } = Modal;

interface Props {}

const UpdatePassword = (props: Props) => {
    const [changePasswordMutation, { loading: mutationLoading, error: mutationError }] = useMutation(changePasswordGql, { onError: (ex) => {} });
    const history = useHistory();

    useEffect(() => {
        mutationError && showError(mutationError.message);
    }, [mutationError]);

    useEffect(() => {
        showLoading(mutationLoading);
    }, [mutationLoading]);

    const onFinish = useCallback((result) => {
        changePasswordMutation({
            variables: {
                data: {
                    oldPassword: result.oldPassword,
                    newPassword: result.password,
                },
            },
        });
    }, []);

    const onFinishFailed = useCallback((error) => {
        const { errorFields = [] } = error || {};
        showError(`${errorFields[0]?.errors}`);
    }, []);

    return (
        <div>
            <PageHeader ghost={false} onBack={() => history.goBack()} title="修改密码" />
            <Form
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
