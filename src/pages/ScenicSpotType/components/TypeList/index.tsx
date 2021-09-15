import React, { useEffect, useState } from "react";
import "./index.scss";

interface Props {}
import { Table, Tag, Space, Button, Typography, Modal, PageHeader } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import DeleteButton from "@/components/DeleteButton";
import PrimaryButton from "@/components/PrimaryButton";
import { changePageVariable, initialPageVariable } from "@/config/pagination.config";
import { PaginationArgs } from "@/models/common";
import { IScenicRegionNode } from "@/models/scenic-region.model";
import { IScenicSpotType } from "@/models/scenic-spot-type.model";
import { deleteScenicSpotTypeGql, deleteScenicSpotTypeInfoGql, scenicSpotTypesGql } from "../../request/gql";

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;
const { Column } = Table;

const pageSize: number = 10;
const ScenicSpotTypeList = (props: Props) => {
    const [scenicSpotTypes, setScenicSpotTypes] = useState<IScenicSpotType[]>();
    const [total, setTotal] = useState<number>();

    const { loading, data, refetch } = useQuery(scenicSpotTypesGql);

    let history = useHistory();

    useEffect(() => {
        if (data) {
            console.warn(data);
            const { scenicRegionType } = data;
            setScenicSpotTypes(scenicRegionType);
        }
    }, [data]);

    return (
        <div className="scenic-region-list">
            <PageHeader
                ghost={false}
                title="景点分类管理"
                subTitle="景点分类列表"
                extra={[
                    <PrimaryButton
                        buttonTitle="创建分类"
                        onClick={() => {
                            history.push("/scenic-region/create");
                        }}
                    />,
                ]}
            />

            <Table loading={loading} dataSource={scenicSpotTypes || []} rowKey={(item) => item.id || 0}>
                <Column title="景区类型id" dataIndex={["node", "id"]} width="350px" />
                <Column title="景区类型名字" dataIndex={["node", "displayName"]} width="350px" />
                <Column title="景区类型图标地址" dataIndex={["node", "displayName"]} width="350px" />
                <Column
                    title="操作"
                    width="350px"
                    render={(edge) => (
                        <div className="column-opertaion">
                            <PrimaryButton
                                buttonTitle="查看详请"
                                onClick={() => {
                                    history.push({ pathname: "/scenic-region/detail", state: edge?.node });
                                }}
                            />
                            <DeleteButton
                                buttonTitle="删除类型"
                                deleteGql={deleteScenicSpotTypeGql}
                                deleteId={edge?.node?.id}
                                alertContent={`是否确定要删除${edge?.node?.displayName}这个景区?`}
                                refetch={() => {
                                    refetch();
                                }}
                            />
                        </div>
                    )}
                />
            </Table>
        </div>
    );
};

export default ScenicSpotTypeList;
