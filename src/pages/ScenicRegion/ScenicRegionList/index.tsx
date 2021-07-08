import React from "react";
import "./index.scss";

interface Props {}
import { Table, Tag, Space, Button, Typography, Modal } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";

const { Title, Paragraph, Text, Link } = Typography;
const { confirm } = Modal;
const { Column } = Table;

const str = gql`
    query ScenicRegion {
        scenicRegions(first: 10, skip: 10) {
            totalCount
            edges {
                node {
                    id
                    displayName
                    location
                }
            }
        }
    }
`;

const ScenicRegionList = (props: Props) => {
    const { loading, error, data = {} } = useQuery(str);
    const { totalCount = 0, edges } = data.scenicRegions || {};

    const createButtonClicked = useCallback(() => {
        console.error(`clicked`);
    }, []);

    const editButtonClicked = useCallback((id: string) => {
        console.error(`delete button, ${JSON.stringify(id)}`);
    }, []);

    const deleteButtonClicked = useCallback((id: string, name: string) => {
        confirm({
            title: `再次提醒`,
            content: `是否确定要删除${name}这个景区?`,
            onOk() {
                console.log("OK");
            },
        });
    }, []);

    return (
        <div className="scenic-region-list">
            <div className="scenic-region-list-header">
                <Title level={2}>景区管理</Title>
                <Button
                    className="create-button"
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={createButtonClicked}
                >
                    创建景区
                </Button>
            </div>
            <Table
                loading={loading}
                dataSource={edges || []}
                rowKey={(item) => item.node.id}
                pagination={{ position: ["bottomLeft"] }}
            >
                <Column
                    title="景区id"
                    dataIndex={["node", "id"]}
                    width="350px"
                />
                <Column title="景区名字" dataIndex={["node", "displayName"]} />
                <Column
                    title="操作"
                    width="230px"
                    render={(edges) => (
                        <div className="column-opertaion">
                            <Button
                                className="column-opration-edit"
                                type="primary"
                                onClick={() => {
                                    editButtonClicked(edges?.node?.id);
                                }}
                            >
                                编辑
                            </Button>
                            <Button
                                className="column-opration-delete"
                                type="default"
                                danger
                                onClick={() => {
                                    deleteButtonClicked(
                                        edges?.node?.id,
                                        edges?.node?.displayName
                                    );
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

export default ScenicRegionList;
