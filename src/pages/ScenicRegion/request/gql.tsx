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
                }
            }
        }
    }
`;

export const createSceincRegionGql: DocumentNode = gql`
    mutation createSceincRegionGql($data: SignupInput!) {
        createScenicRegion(data: $data) {
            id
            displayName
            location
        }
    }
`;

export const updateSceincRegionGql: DocumentNode = gql`
    mutation updateSceincRegionGql($data: UpdateUserInput!) {
        updateScenicRegion(data: $data) {
            id
            displayName
            location
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
