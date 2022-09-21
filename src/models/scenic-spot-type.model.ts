import { Language } from "./common";

export interface IScenicSpotType {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    displayName?: string;
    icon?: string;
}

export interface IScenicSpotTypeInfo {
    id?: string;
    name?: string;
    lang?: Language;
}
