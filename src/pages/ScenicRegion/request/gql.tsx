import { DocumentNode, gql } from "@apollo/client";

export const scenicRegionGql: DocumentNode = gql`
    query ScenicRegion($after: String, $before: String, $first: Int, $last: Int, $orderBy: ScenicRegionOrder) {
        scenicRegions(after: $after, before: $before, first: $first, last: $last, orderBy: $orderBy) {
            totalCount
            edges {
                node {
                    id
                    displayName
                    locationLat
                    locationLng
                    updatedAt
                    createdAt
                }
            }
        }
    }
`;

export const createSceincRegionGql: DocumentNode = gql`
    mutation createSceincRegionGql($lang: String, $regionInfoInput: CreateScenicRegionInfoInput!, $regionInput: CreateScenicRegionInput!) {
        createScenicRegion(lang: $lang, regionInfoInput: $regionInfoInput, regionInput: $regionInput) {
            id
            displayName
            createdAt
            sliceState
            updatedAt
        }
    }
`;

export const updateSceincRegionGql: DocumentNode = gql`
    mutation updateSceincRegionGql($id: String!, $regionInfoInput: CreateScenicRegionInfoInput!) {
        updateScenicRegion(id: $id, regionInfoInput: $regionInfoInput) {
            id
            displayName
            createdAt
            sliceState
            updatedAt
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
