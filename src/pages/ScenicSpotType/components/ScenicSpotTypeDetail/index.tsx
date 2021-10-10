import React, { useEffect, useState } from "react";
import "./index.scss";

interface Props {}
import { PageHeader, Card } from "antd";

import { useHistory, Link, useLocation } from "react-router-dom";
import PrimaryButton from "@/components/PrimaryButton";
import { IScenicSpotType, IScenicSpotTypeInfo } from "@/models/scenic-spot-type.model";
import {
    createScenicSpotTypeInfoGql,
    deleteScenicSpotTypeInfoGql,
    scenicSpotTypeDetailGql,
    scenicSpotTypesGql,
    updateScenicSpotTypeGql,
    updateScenicSpotTypeInfoGql,
} from "../../request/gql";
import { useMutation, useQuery } from "@apollo/client";
import { Language } from "@/models/common";
import { $enum } from "ts-enum-util";
import DeleteButton from "@/components/DeleteButton";
import ScenicSpotTypeInfoView from "./ScenicSpotTypeInfoView";
import { showEditScenicSpotTypeModal, showScenicSpotTypeInfoModal } from "../../utils/popup";
import { showError, showLoading, showSuccess } from "@/utils/message.config";
import ScenicSpotTypeHeader from "@/components/ScenicSpotTypeHeader";

const ScenicSpotTypeDetail = (props: Props) => {
    let history = useHistory();
    const { state } = useLocation<IScenicSpotType>();
    const [scenicSpotType, setScenicSpotType] = useState<IScenicSpotType>();
    const [scenicSpotTypeInfos, setScenicSpotTypeInfos] = useState<IScenicSpotTypeInfo[]>();
    const { loading, data, refetch } = useQuery(scenicSpotTypeDetailGql, { variables: { id: state.id || 0 } });
    const { id, displayName } = state;

    const [
        updateScenicSpotType,
        { loading: updateMutationLoading, error: updateMutationError, data: updateMutationData },
    ] = useMutation(updateScenicSpotTypeGql, {
        onError: (ex) => {},
    });
    const [
        createScenicSpotTypeInfo,
        { loading: createMutationLoading, error: createMutationError, data: createMutationData },
    ] = useMutation(createScenicSpotTypeInfoGql, {
        onError: (ex) => {},
    });
    const [
        updateScenicSpotTypeInfo,
        { loading: updateInfoMutationLoading, error: updateInfoMutationError, data: updateInfoMutationData },
    ] = useMutation(updateScenicSpotTypeInfoGql, {
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
        if (
            createMutationData &&
            createMutationData.createScenicSpotTypeInfoWithLang &&
            createMutationData.createScenicSpotTypeInfoWithLang.id
        ) {
            refetch();
            showSuccess("创建成功");
        }
    }, [createMutationData]);

    useEffect(() => {
        if (
            updateMutationData &&
            updateMutationData.updateScenicSpotType &&
            updateMutationData.updateScenicSpotType.id
        ) {
            refetch();
            showSuccess("更新成功");
        }
    }, [updateMutationData]);

    useEffect(() => {
        if (
            updateInfoMutationData &&
            updateInfoMutationData.updateScenicSpotTypeInfo &&
            updateInfoMutationData.updateScenicSpotTypeInfo.id
        ) {
            refetch();
            showSuccess("更新成功");
        }
    }, [updateInfoMutationData]);

    useEffect(() => {
        if (data) {
            setScenicSpotType(data.scenicSpotType);
            setScenicSpotTypeInfos(data.scenicSpotType.scenicSpotTypeInfoDtos || []);
        }
    }, [data]);

    return (
        <div className="scenic-region-list">
            <PageHeader
                ghost={false}
                title="景点分类详情"
                subTitle={displayName}
                extra={[
                    <PrimaryButton
                        buttonTitle="修改分类名字(展示名字)"
                        onClick={() => {
                            showEditScenicSpotTypeModal((data, resolve) => {
                                updateScenicSpotType({
                                    variables: {
                                        id: state.id,
                                        spotTypeInfoInput: {
                                            displayName: data.displayName,
                                            icon: data.icon,
                                        },
                                    },
                                });
                                resolve(1);
                            });
                        }}
                    />,
                ]}
            >
                <ScenicSpotTypeHeader scenicSpotType={scenicSpotType} />
            </PageHeader>
            <div className="button-content">
                <PrimaryButton
                    buttonTitle="添加语言"
                    onClick={() => {
                        showScenicSpotTypeInfoModal((data, resolve) => {
                            createScenicSpotTypeInfo({
                                variables: {
                                    lang: data.lang,
                                    scenicSpotTypeId: state.id,
                                    spotTypeInfoInput: {
                                        name: data.name,
                                    },
                                },
                            });
                            resolve(1);
                        });
                    }}
                />
            </div>
            {scenicSpotTypeInfos?.map((value, key) => {
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
                                            showScenicSpotTypeInfoModal((data, resolve) => {
                                                updateScenicSpotTypeInfo({
                                                    variables: {
                                                        id: data.id,
                                                        spotTypeInfoInput: {
                                                            name: data.name,
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
                                        deleteGql={deleteScenicSpotTypeInfoGql}
                                        refetch={refetch}
                                        deleteId={value.id || 0}
                                        alertContent={`确定要删除${value.lang}该语种的景点分类信息吗？`}
                                    />
                                </div>
                            </div>
                        }
                    >
                        <ScenicSpotTypeInfoView scenicSpotTypeInfo={value} />
                    </Card>
                );
            })}
        </div>
    );
};

export default ScenicSpotTypeDetail;
