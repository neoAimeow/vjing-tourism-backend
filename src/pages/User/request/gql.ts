import { gql } from "@apollo/client";

export const usersGql = gql`
    query User($after: String, $before: String, $first: Int, $last: Int, $orderBy: UserOrder) {
        users(after: $after, before: $before, first: $first, last: $last, orderBy: $orderBy) {
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

export const updateUserGql = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
            id
            name
            email
            role
        }
    }
`;

export const changePasswordGql = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
        changePassword(data: $data) {
            id
            name
            email
            role
        }
    }
`;

export const deleteUserGql = gql`
    mutation DeleteUser($id: String!) {
        deleteUser(id: $id) {
            id
            name
            email
            role
        }
    }
`;
