import React from "react";
import "./index.scss";

interface Props {}
import { Table, Tag, Space, Button, Typography, PageHeader, Modal } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { IUser } from "../../model/user.model";
const { Title, Paragraph, Text, Link } = Typography;
const { confirm } = Modal;
const { Column } = Table;

const str = gql`
    query User {
        users(first: 10, skip: 10) {
            totalCount
            edges {
                node {
                    id
                    name
                    email
                    role
                }
            }
        }
    }
`;

const UserList = (props: Props) => {
    const { loading, error, data = {} } = useQuery(str);
    const { totalCount = 0, edges } = data.users || {};
    let history = useHistory();

    const createButtonClicked = useCallback(() => {
        console.warn(`111`);
        history.push("/user/create");
    }, []);

    const updateButtonClicked = useCallback((user: IUser) => {
        history.push({ pathname: "/user/update", state: user });
    }, []);

    const deleteButtonClicked = useCallback((user: IUser) => {
        confirm({
            title: `再次提醒`,
            content: `是否确定要删除${user.name}这个用户?`,
            onOk() {
                console.log("OK");
            },
        });
    }, []);
    return (
        <div className="scenic-region-list">
            <PageHeader
                ghost={false}
                title="用户管理"
                subTitle="用户列表"
                extra={[
                    <Button className="create-button" type="primary" shape="round" size="large" onClick={createButtonClicked}>
                        创建用户
                    </Button>,
                ]}
            />

            <Table loading={loading} dataSource={edges || []} rowKey={(item) => item.node.id} pagination={{ position: ["bottomLeft"] }}>
                <Column title="用户id" dataIndex={["node", "id"]} width="350px" />
                <Column title="用户名字" dataIndex={["node", "name"]} />
                <Column title="用户邮箱" dataIndex={["node", "email"]} />
                <Column title="用户规则" dataIndex={["node", "role"]} />
                <Column
                    title="操作"
                    width="230px"
                    render={(edges) => (
                        <div className="column-opertaion">
                            <Button
                                className="column-opration-edit"
                                type="primary"
                                onClick={() => {
                                    updateButtonClicked(edges?.node);
                                }}
                            >
                                编辑
                            </Button>
                            <Button
                                className="column-opration-delete"
                                type="default"
                                danger
                                onClick={() => {
                                    deleteButtonClicked(edges?.node);
                                }}
                            >
                                删除
                            </Button>
                        </div>
                    )}
                />
            </Table>
        </div>
    );
};

export default UserList;
