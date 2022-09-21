export interface IUser {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    role: string;
}

export interface IUserNode {
    node?: IUser;
}

export interface IUserPagination {
    totalCount?: number;
    edges?: IUserNode[];
}
