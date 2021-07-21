import { DocumentNode, gql } from "@apollo/client";

export const scenicSpotGql: DocumentNode = gql`
    query ScenicSpot($scenicRegionId: String, $after: String, $before: String, $first: Int, $last: Int, $orderBy: ScenicSpotOrder) {
        scenicSpots(scenicRegionId: $scenicRegionId, after: $after, before: $before, first: $first, last: $last, orderBy: $orderBy) {
            totalCount
            edges {
                node {
                    id
                    displayName
                    scenicSpotTypeId
                    locationLat
                    locationLng
                    updatedAt
                    createdAt
                }
            }
        }
    }
`;

export const createSceincSpotGql: DocumentNode = gql`
    mutation createSceincSpot($lang: String, $input: CreateScenicSpotinput!, $infoInput: CreateScenicSpotInfoInput!, $scenicRegionId: String) {
        createScenicRegion(lang: $lang, input: $input, infoInput: $infoInput, scenicRegionId: $scenicRegionId) {
            id
            scenicRegionId
            displayName
            createdAt
            updatedAt
            scenicSpotTypeId
            hidden
        }
    }
`;

// export const updateSceincRegionGql: DocumentNode = gql`
//     mutation updateSceincRegionGql($id: String!, $regionInfoInput: CreateScenicRegionInfoInput!) {
//         updateScenicRegion(id: $id, regionInfoInput: $regionInfoInput) {
//             id
//             displayName
//             createdAt
//             sliceState
//             updatedAt
//         }
//     }
// `;

// export const deleteSceincRegionGql: DocumentNode = gql`
//     mutation DeleteSceincRegion($id: String!) {
//         deleteScenicRegion(id: $id) {
//             isSuccess
//         }
//     }
// `;
