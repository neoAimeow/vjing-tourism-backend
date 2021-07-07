import React from "react";

interface Props {}
import { Table, Tag, Space } from "antd";
import { gql, useQuery } from "@apollo/client";

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
    console.error(`loading`, loading);
    console.error(`error`, error);
    console.error(`data`, data);

    console.error(`totalCount`, totalCount);
    return loading ? (
        <div></div>
    ) : (
        <div>
            <Table
                dataSource={edges || []}
                rowKey={(item) => item.node.id}
                pagination={{ position: ["bottomLeft"] }}
            >
                <Column title="景区id" dataIndex="id" key="id" />
                <Column
                    title="景区名字"
                    dataIndex="node.displayName"
                    key="node.displayName"
                />
            </Table>
        </div>
    );
};

export default ScenicRegionList;
