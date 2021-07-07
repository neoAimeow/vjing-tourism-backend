import React from "react";
import "./index.scss";

interface Props {}
import { Table, Tag, Space, Button, Typography } from "antd";
import { gql, useQuery } from "@apollo/client";
const { Title, Paragraph, Text, Link } = Typography;

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

    return (
        <div className="scenic-region-list">
            <div className="scenic-region-list-header">
                <Title level={2}>景区管理</Title>
                <Button
                    className="create-button"
                    type="primary"
                    shape="round"
                    size="large"
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
                    render={() => (
                        <div className="column-opertaion">
                            <Button
                                className="column-opration-edit"
                                type="primary"
                            >
                                编辑
                            </Button>
                            <Button
                                className="column-opration-delete"
                                type="default"
                                danger
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
