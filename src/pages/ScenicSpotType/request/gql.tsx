import { DocumentNode, gql } from "@apollo/client";

const scenicSpotTypeInfoFragment: DocumentNode = gql`
    fragment ScenicSpotTypeInfoFragment on ScenicSpotTypeInfoDTO {
        id
        lang
        name
    }
`;

const scenicSpotTypeFragment: DocumentNode = gql`
    ${scenicSpotTypeInfoFragment}

    fragment ScenicSpotTypeFragment on ScenicSpotTypeDTO {
        id
        updatedAt
        createdAt
        displayName
        icon
        scenicSpotTypeInfoDtos {
            ...ScenicSpotTypeInfoFragment
        }
    }
`;

export const scenicSpotTypesGql: DocumentNode = gql`
    ${scenicSpotTypeFragment}
    query ScenicSpotTypes {
        scenicSpotTypes {
            ...ScenicSpotTypeFragment
        }
    }
`;

export const scenicSpotDetailGql: DocumentNode = gql`
    ${scenicSpotTypeFragment}
    query ScenicSpotType($id: String!) {
        scenicSpotType(id: $id) {
            ...ScenicSpotTypeFragment
        }
    }
`;

export const createScenicSpotTypeGql: DocumentNode = gql`
    ${scenicSpotTypeFragment}
    mutation CreateScenicSpotType(
        $lang: String
        $regionInfoInput: CreateScenicRegionInfoInput!
        $regionInput: CreateScenicRegionInput!
    ) {
        createScenicSpotType(lang: $lang, regionInfoInput: $regionInfoInput, regionInput: $regionInput) {
            ...ScenicRegionFragment
        }
    }
`;

export const createScenicSpotTypeInfoGql: DocumentNode = gql`
    ${scenicSpotTypeInfoFragment}
    mutation CreateScenicSpotType(
        $lang: String!
        $scenicSpotTypeId: String!
        $regionInfoInput: CreateScenicRegionInfoInput!
    ) {
        CreateScenicSpotTypeInfoWithLang(
            lang: $lang
            scenicSpotTypeId: $scenicSpotTypeId
            regionInfoInput: $regionInfoInput
        ) {
            ...ScenicSpotTypeInfoFragment
        }
    }
`;

export const updateScenicSpotTypeGql: DocumentNode = gql`
    ${scenicSpotTypeFragment}
    mutation UpdateScenicSpotType($id: String!, $spotTypeInfoInput: UpdateScenicSpotTypeInput!) {
        updateScenicSpotType(id: $id, spotTypeInfoInput: $spotTypeInfoInput) {
            ...ScenicSpotTypeFragment
        }
    }
`;

export const updateScenicSpotTypeInfoGql: DocumentNode = gql`
    ${scenicSpotTypeInfoFragment}
    mutation UpdateScenicSpotTypeInfo($id: String!, $spotTypeInfoInput: UpdateScenicSpotTypeInfoInput!) {
        updateScenicSpotTypeInfo(id: $id, spotTypeInfoInput: $spotTypeInfoInput) {
            ...scenicSpotTypeInfoFragment
        }
    }
`;
export const deleteScenicSpotTypeGql: DocumentNode = gql`
    mutation DeleteScenicSpotType($id: String!) {
        deleteScenicSpotType(id: $id) {
            isSuccess
        }
    }
`;

export const deleteScenicSpotTypeInfoGql: DocumentNode = gql`
    mutation DeleteScenicSpotTypeInfo($id: String!) {
        deleteScenicSpotTypeInfo(id: $id) {
            isSuccess
        }
    }
`;
