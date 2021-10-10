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
    const [scenicSpotTypeList, setScenicSpotTypes] = useState<IScenicSpotType[]>();

    const { loading, data, refetch } = useQuery(scenicSpotTypesGql, {});

    let history = useHistory();

    useEffect(() => {
        if (data) {
            const { scenicSpotTypes } = data;
            setScenicSpotTypes(scenicSpotTypes);
        }
    }, [data]);

    return (
        <div className="scenic-region-list">
            <PageHeader
                ghost={false}
                title="景点分类"
                subTitle="列表"
                extra={[
                    <PrimaryButton
                        buttonTitle="创建分类"
                        onClick={() => {
                            history.push("/scenic-spot-type/create");
                        }}
                    />,
                ]}
            />

            <Table loading={loading} dataSource={scenicSpotTypeList || []} rowKey={(item) => item.id || 0}>
                <Column title="景点类型id" dataIndex="id" width="100px" />
                <Column title="类型名字" dataIndex="displayName" width="150px" />
                <Column title="景点类型Icon地址" dataIndex="icon" width="250px" />
                <Column
                    title="操作"
                    width="300px"
                    render={(edge) => (
                        <div className="column-opertaion">
                            <PrimaryButton
                                buttonTitle="查看详请"
                                onClick={() => {
                                    history.push({ pathname: "/scenic-spot-type/detail", state: edge });
                                }}
                            />
                            <DeleteButton
                                buttonTitle="删除景点类型"
                                deleteGql={deleteScenicSpotTypeGql}
                                deleteId={edge?.id}
                                alertContent={`是否确定要删除${edge?.displayName}这个景点类型?`}
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
