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
    updateSceincRegionGql,
    updateScenicRegionInfoGql,
} from "../../request/gql";
import { showEditScenicRegionModal, showScenicRegionInfoModal } from "../../utils/utils";
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
        updateScenicRegion,
        { loading: updateMutationLoading, error: updateMutationError, data: updateMutationData },
    ] = useMutation(updateSceincRegionGql, {
        onError: (ex) => {},
    });
    const [
        createScenicRegionInfo,
        { loading: createMutationLoading, error: createMutationError, data: createMutationData },
    ] = useMutation(createScenicRegionInfoGql, {
        onError: (ex) => {},
    });
    const [
        updateScenicRegionInfo,
        { loading: updateInfoMutationLoading, error: updateInfoMutationError, data: updateInfoMutationData },
    ] = useMutation(updateScenicRegionInfoGql, {
        onError: (ex) => {},
    });

    useEffect(() => {
        if (updateInfoMutationError) {
            showError(updateInfoMutationError.message);
        }
        if (createMutationError) {
            showError(createMutationError.message);
        }
        if (updateMutationError) {
            showError(updateMutationError.message);
        }
    }, [updateInfoMutationError, createMutationError, updateMutationError]);

    useEffect(() => {
        showLoading(updateInfoMutationLoading);
    }, [updateInfoMutationLoading]);

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
        if (
            updateInfoMutationData &&
            updateInfoMutationData.updateScenicRegionInfo &&
            updateInfoMutationData.updateScenicRegionInfo.id
        ) {
            refetch();
            showSuccess("更新成功");
        }
    }, [updateInfoMutationData]);

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
                        buttonTitle="管理景点"
                        onClick={() => {
                            history.push({ pathname: "/scenic-spot/list", state: state });
                        }}
                    />,
                    <PrimaryButton buttonTitle="管理路线" onClick={() => {}} />,
                ]}
            >
                <ScenicRegionHeader scenicRegion={scenicRegion} />
            </PageHeader>
            <div className="button-content">
                <PrimaryButton
                    buttonTitle="添加语言"
                    onClick={() => {
                        showScenicRegionInfoModal((data, resolve) => {
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
                />
                &nbsp;&nbsp;
                <PrimaryButton
                    buttonTitle="修改景区"
                    onClick={() => {
                        showEditScenicRegionModal((data, resolve) => {
                            updateScenicRegion({
                                variables: {
                                    id: state.id,
                                    regionInput: {
                                        displayName: data.displayName,
                                        enableNavigation: data.enableNavigation,
                                        enablePoiLanguageSwitch: data.enablePoiLanguageSwitch,
                                        maxZoom: data.maxZoom,
                                        minZoom: data.minZoom,
                                        zoom: data.zoom,
                                    },
                                },
                            });
                            resolve(1);
                        }, scenicRegion);
                    }}
                />
                &nbsp;&nbsp;
                <PrimaryButton buttonTitle="上传覆盖图（处理）" onClick={() => {}} />
            </div>
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
