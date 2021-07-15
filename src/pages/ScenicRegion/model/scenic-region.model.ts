export interface IScenicRegion {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    name: string;
    role: string;
}

export interface IScenicRegionNode {
    node?: IScenicRegion;
}

export interface IScenicRegionPagination {
    totalCount?: number;
    edges?: IScenicRegionNode[];
}
