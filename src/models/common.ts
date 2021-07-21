export interface PaginationArgs {
    after?: string | undefined;
    before?: string | undefined;
    first?: number | undefined;
    last?: number | undefined;
}

export enum Language {
    CHINESE = "中文",
    ENGLISH = "英文",
    JAPANESE = "日语",
    KOREAN = "韩语",
}

export enum SliceState {
    PENDING,
    SLICING,
    SUCCESS,
}

export function getLangWithKey(key: Language): string {
    switch (key) {
    }
}
