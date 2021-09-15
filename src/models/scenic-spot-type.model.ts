import { Language } from "./common";
export interface IScenicSpotType {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    displayName?: string;
    icon?: string;
}

export interface IScenicSpotTypeInfo {
    name?: string;
    lang?: Language;
}
