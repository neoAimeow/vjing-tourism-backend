import { Button, Form, Input } from "antd";
import React from "react";

interface Props {}

const Login = (props: Props) => {
    return (
        <Form
            initialValues={{ role: "USER" }}
            labelCol={{
                span: 2,
            }}
            wrapperCol={{
                span: 5,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >
            <Form.Item name="name" label="登陆帐号" rules={[{ required: true, message: "帐号名不能为空" }]}>
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
