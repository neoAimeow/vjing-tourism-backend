import DeleteButton from "@/components/DeleteButton";
import PrimaryButton from "@/components/PrimaryButton";
import { changePageVariable, initialPageVariable } from "@/config/pagination.config";
import { PaginationArgs } from "@/models/common";
import { IScenicRegion } from "@/models/scenic-region.model";
import { IScenicSpotNode } from "@/models/scenic-spot.model";
import { deleteSceincRegionGql } from "@/pages/ScenicRegion/request/gql";
import { useQuery } from "@apollo/client";
import { Descriptions, PageHeader, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { scenicSpotGql } from "../../request/gql";

interface Props {}
const pageSize = 10;
const ScenicSpotList = (props: Props) => {
    const [scenicSpotList, setScenicSpot] = useState<IScenicSpotNode[]>();
    const [total, setTotal] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [variables = initialPageVariable(), setVariables] = useState<PaginationArgs>();
    let history = useHistory();
    const { state } = useLocation<IScenicRegion>();
    //www.apollographql.com/docs/react/pagination/core-api/
    const { loading, data, refetch } = useQuery(scenicSpotGql, {
        variables: { ...variables, scenicRegionId: state.id || 0 },
    });

    useEffect(() => {
        if (data) {
            console.warn(data);
            const { scenicSpots } = data;
            const { totalCount, edges = [] } = scenicSpots || {};
            setScenicSpot(edges);
            setTotal(totalCount);
        }
    }, [data]);

    const fetchList = useCallback(
        (currentPage, isNextPage: boolean) => {
            setCurrentPage(currentPage);

            setVariables(
                changePageVariable(isNextPage, scenicSpotList, pageSize, (item) => {
                    return item?.node?.id;
                })
            );
        },
        [variables, scenicSpotList]
    );

    return (
        <div className="scenic-region-list">
            <PageHeader
                onBack={() => history.goBack()}
                ghost={false}
                title="景点列表"
                subTitle={state.displayName}
                extra={[
                    <PrimaryButton
                        buttonTitle="创建景点"
                        onClick={() => {
                            history.push({ pathname: "/scenic-spot/create", state: state });
                        }}
                    />,
                ]}
            >
                <Descriptions labelStyle={{ fontWeight: 600 }} size="small" column={3}>
                    <Descriptions.Item label="景区id">{state.id}</Descriptions.Item>
                    <Descriptions.Item label="景区名字">{state.displayName}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{state.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="修改时间">{state.updatedAt}</Descriptions.Item>
                    <Descriptions.Item label="景区latitude">{state.locationLat}</Descriptions.Item>
                    <Descriptions.Item label="景区longitude">{state.locationLng}</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Table
                loading={loading}
                dataSource={scenicSpotList || []}
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
                <Column title="景点id" dataIndex={["node", "id"]} width="350px" />
                <Column title="景点名字" dataIndex={["node", "displayName"]} width="350px" />
                <Column
                    title="操作"
                    width="350px"
                    render={(edge) => (
                        <div className="column-opertaion">
                            <PrimaryButton
                                buttonTitle="编辑"
                                onClick={() => {
                                    history.push({ pathname: "/scenic-spot/update", state: { id: edge?.node } });
                                }}
                            />
                            <DeleteButton
                                buttonTitle="删除景点"
                                deleteGql={deleteSceincRegionGql}
                                deleteId={edge?.node?.id}
                                alertContent={`是否确定要删除${edge?.node?.displayName}这个景点?`}
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

export default ScenicSpotList;
