import { Button, Descriptions, Form, Input, PageHeader, Select } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

interface Props {}

const CreateScenicRegion = (props: Props) => {
    console.warn(`create`);
    const history = useHistory();
    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => history.goBack()}
                title="创建景区"
                subTitle="景区名字"
            />
            <Form name="control-hooks">
                <Form.Item
                    name="note"
                    label="Note"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
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
