import { DocumentNode, gql } from "@apollo/client";

const scenicRegionInfoFragment: DocumentNode = gql`
    fragment ScenicRegionInfoFragment on ScenicRegionInfoDTO {
        handDrawingUri
        id
        lang
        layer
        layersDisplayName
        name
        scenicRegionId
        ticketUrl
        title
        vrUrl
    }
`;

const scenicRegionFragment: DocumentNode = gql`
    ${scenicRegionInfoFragment}

    fragment ScenicRegionFragment on ScenicRegionDTO {
        id
        displayName
        locationLat
        locationLng
        updatedAt
        createdAt
        enableNavigation
        enablePoiLanguageSwitch
        handDrawingNELat
        handDrawingNELng
        handDrawingSWLat
        handDrawingSWLng
        maxZoom
        minZoom
        zoom
        sliceState
        scenicRegionInfoDtos {
            ...ScenicRegionInfoFragment
        }
    }
`;
export const scenicRegionGql: DocumentNode = gql`
    ${scenicRegionFragment}
    query ScenicRegion($after: String, $before: String, $first: Int, $last: Int, $orderBy: ScenicRegionOrder) {
        scenicRegions(after: $after, before: $before, first: $first, last: $last, orderBy: $orderBy) {
            totalCount
            edges {
                node {
                    ...ScenicRegionFragment
                }
            }
        }
    }
`;

export const scenicRegionDetailGql: DocumentNode = gql`
    ${scenicRegionFragment}
    query ScenicRegion($id: String!) {
        scenicRegion(id: $id) {
            ...ScenicRegionFragment
        }
    }
`;

export const createSceincRegionGql: DocumentNode = gql`
    ${scenicRegionFragment}
    mutation createSceincRegion(
        $lang: String
        $regionInfoInput: CreateScenicRegionInfoInput!
        $regionInput: CreateScenicRegionInput!
    ) {
        createScenicRegion(lang: $lang, regionInfoInput: $regionInfoInput, regionInput: $regionInput) {
            ...ScenicRegionFragment
        }
    }
`;

export const createScenicRegionInfoGql: DocumentNode = gql`
    ${scenicRegionInfoFragment}
    mutation createSceincRegion(
        $lang: String!
        $scenicRegionId: String!
        $regionInfoInput: CreateScenicRegionInfoInput!
    ) {
        createScenicRegionInfoWithLang(
            lang: $lang
            scenicRegionId: $scenicRegionId
            regionInfoInput: $regionInfoInput
        ) {
            ...ScenicRegionInfoFragment
        }
    }
`;

export const updateSceincRegionGql: DocumentNode = gql`
    ${scenicRegionFragment}
    mutation updateSceincRegion($id: String!, $regionInfoInput: CreateScenicRegionInfoInput!) {
        updateScenicRegion(id: $id, regionInfoInput: $regionInfoInput) {
            ...ScenicRegionFragment
        }
    }
`;

export const updateScenicRegionInfoGql: DocumentNode = gql`
    ${scenicRegionInfoFragment}
    mutation updateScenicRegionInfo($id: String!, $regionInfoInput: UpdateScenicRegionInfoInput!) {
        updateScenicRegionInfo(id: $id, regionInfoInput: $regionInfoInput) {
            ...ScenicRegionInfoFragment
        }
    }
`;
export const deleteSceincRegionGql: DocumentNode = gql`
    mutation DeleteSceincRegion($id: String!) {
        deleteScenicRegion(id: $id) {
            isSuccess
        }
    }
`;
