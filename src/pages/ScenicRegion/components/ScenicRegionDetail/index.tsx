import PrimaryButton from "@/components/PrimaryButton";
import ScenicRegionHeader from "@/components/ScenicRegionHeader";
import { Language } from "@/models/common";
import { IScenicRegion, IScenicRegionInfo } from "@/models/scenic-region.model";
import { showError, showLoading, showSuccess } from "@/utils/message.config";
import { useMutation, useQuery } from "@apollo/client";
import { Card, PageHeader } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    createScenicRegionInfoGql,
    deleteSceincRegionInfoGql,
    scenicRegionDetailGql,
    scenicRegionGql,
    updateScenicRegionInfoGql,
} from "../../request/gql";
import { showScenicRegionInfoModal } from "../../utils/utils";
import ScenicRegionInfoView from "./components/ScenicRegionInfoView";
import { $enum } from "ts-enum-util";
import DeleteButton from "@/components/DeleteButton";

interface Props {}

const ScenicRegionDetail = (props: Props) => {
    const { state } = useLocation<IScenicRegion>();
    const [scenicRegion, setScenicRegion] = useState<IScenicRegion>();
    const [scenicRegionInfos, setScenicRegionInfos] = useState<IScenicRegionInfo[]>();
    const history = useHistory();
    const { loading, data, refetch } = useQuery(scenicRegionDetailGql, { variables: { id: state.id || 0 } });
    const [
        createScenicRegionInfo,
        { loading: createMutationLoading, error: createMutationError, data: createMutationData },
    ] = useMutation(createScenicRegionInfoGql, {
        onError: (ex) => {},
    });
    const [
        updateScenicRegionInfo,
        { loading: updateMutationLoading, error: updateMutationError, data: updateMutationData },
    ] = useMutation(updateScenicRegionInfoGql, {
        onError: (ex) => {},
    });

    useEffect(() => {
        if (updateMutationError) {
            showError(updateMutationError.message);
        }
        if (createMutationError) {
            showError(createMutationError.message);
        }
    }, [updateMutationError, createMutationError]);

    useEffect(() => {
        showLoading(updateMutationLoading);
    }, [updateMutationLoading]);

    useEffect(() => {
        showLoading(createMutationLoading);
    }, [createMutationLoading]);

    useEffect(() => {
        console.warn(createMutationData);
        if (
            createMutationData &&
            createMutationData.createScenicRegionInfoWithLang &&
            createMutationData.createScenicRegionInfoWithLang.id
        ) {
            refetch();
            showSuccess("创建成功");
        }
    }, [createMutationData]);

    useEffect(() => {
        console.warn(updateMutationData);
        if (
            updateMutationData &&
            updateMutationData.updateScenicRegionInfo &&
            updateMutationData.updateScenicRegionInfo.id
        ) {
            refetch();
            showSuccess("更新成功");
        }
    }, [updateMutationData]);

    useEffect(() => {
        if (data) {
            setScenicRegion(data.scenicRegion);
            setScenicRegionInfos(data.scenicRegion.scenicRegionInfoDtos || []);
        }
    }, [data]);

    return (
        <div>
            <PageHeader
                onBack={() => history.goBack()}
                ghost={false}
                title="景区详情"
                subTitle={state.displayName}
                extra={[
                    <PrimaryButton
                        buttonTitle="添加语言"
                        onClick={() => {
                            showScenicRegionInfoModal((data, resolve) => {
                                console.warn(data);
                                createScenicRegionInfo({
                                    variables: {
                                        lang: data.lang,
                                        scenicRegionId: state.id,
                                        regionInfoInput: {
                                            handDrawingUri: data.handDrawingUri,
                                            layer: data.layer,
                                            layersDisplayName: data.layersDisplayName,
                                            name: data.name,
                                            ticketUrl: data.ticketUrl,
                                            title: data.title,
                                            vrUrl: data.vrUrl,
                                        },
                                    },
                                });
                                resolve(1);
                            });
                        }}
                    />,

                    <PrimaryButton
                        buttonTitle="修改景区"
                        onClick={() => {
                            history.push({ pathname: "/scenic-region/update", state: state });
                        }}
                    />,
                    <PrimaryButton
                        buttonTitle="景点列表"
                        onClick={() => {
                            history.push({ pathname: "/scenic-spot/list", state: state });
                        }}
                    />,
                ]}
            >
                <ScenicRegionHeader scenicRegion={scenicRegion} />
            </PageHeader>
            {scenicRegionInfos?.map((value, key) => {
                return (
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={$enum(Language).getValueOrDefault(value.lang)}
                        extra={
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div>
                                    <PrimaryButton
                                        buttonTitle="修改"
                                        size="small"
                                        onClick={() => {
                                            showScenicRegionInfoModal((data, resolve) => {
                                                updateScenicRegionInfo({
                                                    variables: {
                                                        id: data.id,
                                                        regionInfoInput: {
                                                            handDrawingUri: data.handDrawingUri,
                                                            layer: data.layer,
                                                            layersDisplayName: data.layersDisplayName,
                                                            name: data.name,
                                                            ticketUrl: data.ticketUrl,
                                                            title: data.title,
                                                            vrUrl: data.vrUrl,
                                                        },
                                                    },
                                                });
                                                resolve(1);
                                            }, value);
                                        }}
                                    />
                                </div>
                                <div style={{ marginLeft: 10 }}>
                                    <DeleteButton
                                        size="small"
                                        buttonTitle="删除语言"
                                        deleteGql={deleteSceincRegionInfoGql}
                                        refetch={refetch}
                                        deleteId={value.id || 0}
                                        alertContent={`确定要删除${value.lang}该语种的景区信息吗？`}
                                    />
                                </div>
                            </div>
                        }
                    >
                        <ScenicRegionInfoView scenicRegionInfo={value} />
                    </Card>
                );
            })}
        </div>
    );
};

export default ScenicRegionDetail;
