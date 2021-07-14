import { gql } from "@apollo/client";

export const usersGql = gql`
    query User($first: Int, $skip: Int) {
        users(first: $first, skip: $skip) {
            totalCount
            edges {
                node {
                    id
                    name
                    email
                    role
                }
            }
        }
    }
`;

export const createUserGql = gql`
    mutation CreateUser($data: SignupInput!) {
        createUser(data: $data) {
            id
            name
            email
            role
        }
    }
`;
