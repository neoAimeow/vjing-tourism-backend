import PrimaryButton from "@/components/PrimaryButton";
import ScenicRegionHeader from "@/components/ScenicRegionHeader";
import { Language } from "@/models/common";
import { IScenicRegion, IScenicRegionInfo } from "@/models/scenic-region.model";
import { showError, showLoading } from "@/utils/message.config";
import { useMutation, useQuery } from "@apollo/client";
import { Card, PageHeader } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    createScenicRegionInfoGql,
    scenicRegionDetailGql,
    scenicRegionGql,
    updateScenicRegionInfoGql,
} from "../../request/gql";
import { showScenicRegionInfoModal } from "../../utils/utils";
import ScenicRegionInfoView from "./components/ScenicRegionInfoView";

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
        createMutationError && showError(createMutationError.message);
    }, [createMutationError]);

    useEffect(() => {
        showLoading(updateMutationLoading);
    }, [updateMutationLoading]);

    useEffect(() => {
        updateMutationError && showError(updateMutationError.message);
    }, [updateMutationError]);

    useEffect(() => {
        showLoading(createMutationLoading);
    }, [createMutationLoading]);

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
                                createScenicRegionInfo({});

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
                console.warn(value);
                return (
                    <Card style={{ marginTop: 16 }} type="inner" title={value.lang} extra={<a href="#">修改</a>}>
                        <ScenicRegionInfoView scenicRegionInfo={value} />
                    </Card>
                );
            })}
        </div>
    );
};

export default ScenicRegionDetail;
