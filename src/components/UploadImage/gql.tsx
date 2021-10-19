import { DocumentNode, gql } from "@apollo/client";

export const getQiniuTokenGql: DocumentNode = gql`
    query getQiniuToken {
        getQiniuToken {
            uploadToken
        }
    }
`;
