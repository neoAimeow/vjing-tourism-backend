export interface PaginationArgs {
    after?: string | undefined;
    before?: string | undefined;
    first?: number | undefined;
    last?: number | undefined;
}

export enum Language {
    CHINESE,
    ENGLISH,
    JAPANESE,
    KOREAN,
}

export interface Coordinate {
    latitude: number;
    longitude: number;
}
