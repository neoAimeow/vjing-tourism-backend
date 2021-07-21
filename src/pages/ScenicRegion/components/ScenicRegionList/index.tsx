import React, { useEffect, useState } from "react";
import "./index.scss";

interface Props {}
import { Table, Tag, Space, Button, Typography, Modal, PageHeader } from "antd";
import { gql, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import DeleteButton from "@/components/DeleteButton";
import PrimaryButton from "@/components/PrimaryButton";
import { deleteSceincRegionGql, scenicRegionGql } from "../../request/gql";
import { changePageVariable, initialPageVariable } from "@/config/pagination.config";
import { PaginationArgs } from "@/models/common";
import { IScenicRegionNode } from "@/models/scenic-region.model";

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;
const { Column } = Table;

const pageSize: number = 10;
const ScenicRegionList = (props: Props) => {
    const [scenicRegionList, setScenicRegion] = useState<IScenicRegionNode[]>();
    const [total, setTotal] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [variables = initialPageVariable(), setVariables] = useState<PaginationArgs>();

    const { loading, data, refetch } = useQuery(scenicRegionGql, { variables });

    let history = useHistory();

    useEffect(() => {
        if (data) {
            console.warn(data);
            const { scenicRegions } = data;
            const { totalCount, edges = [] } = scenicRegions || {};
            setScenicRegion(edges);
            setTotal(totalCount);
        }
    }, [data]);

    const fetchList = useCallback(
        (currentPage, isNextPage: boolean) => {
            setCurrentPage(currentPage);

            setVariables(
                changePageVariable(isNextPage, scenicRegionList, pageSize, (item) => {
                    return item?.node?.id;
                })
            );
        },
        [variables, scenicRegionList]
    );

    return (
        <div className="scenic-region-list">
            <PageHeader
                ghost={false}
                title="景区管理"
                subTitle="景区列表"
                extra={[
                    <PrimaryButton
                        buttonTitle="创建景区"
                        onClick={() => {
                            history.push("/scenic-region/create");
                        }}
                    />,
                ]}
            />

            <Table
                loading={loading}
                dataSource={scenicRegionList || []}
                rowKey={(item) => item.node?.id || 0}
                pagination={{
                    position: ["bottomLeft"],
                    current: currentPage,
                    total: total,
                    onChange: (page) => {
                        fetchList(page, page > (currentPage || 0));
                    },
                }}
            >
                <Column title="景区id" dataIndex={["node", "id"]} width="350px" />
                <Column title="景区名字" dataIndex={["node", "displayName"]} width="350px" />
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
                                buttonTitle="删除景区"
                                deleteGql={deleteSceincRegionGql}
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

export default ScenicRegionList;
