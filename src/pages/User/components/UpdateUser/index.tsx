import { useMutation } from "@apollo/client";
import { Button, Form, Input, Modal, PageHeader, Radio, Switch } from "antd";
import React, { useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { showError, showLoading } from "../../../../utils/message.config";
import { IUser } from "../../model/user.model";
import { createUserGql } from "../../request/gql";
const { confirm } = Modal;

interface Props {}

const UpdateUser = (props: Props) => {
    const [createUser, { loading: mutationLoading, error: mutationError, data }] = useMutation(createUserGql, { onError: (ex) => {} });
    const history = useHistory();

    useEffect(() => {
        mutationError && showError(mutationError.message);
    }, [mutationError]);

    useEffect(() => {
        showLoading(mutationLoading);
    }, [mutationLoading]);

    const onFinish = useCallback((result) => {
        createUser({
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

    const { state } = useLocation<IUser>();
    const { id, name, email, role } = state || {};

    return (
        <div>
            <PageHeader ghost={false} onBack={() => history.goBack()} title="修改用户" subTitle={email} />
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
                <Form.Item name="name" label="用户名字" rules={[{ required: false }, { type: "string", min: 2, max: 5, message: "名字需要控制在2到5个字符内" }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="权限" rules={[{ required: false }]}>
                    <Radio.Group size="large">
                        <Radio.Button value="admin">管理员</Radio.Button>
                        <Radio.Button value="user">普通用户</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUser;
