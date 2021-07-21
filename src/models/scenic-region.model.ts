import { Language } from "./common";
export interface IScenicRegion {
    id: string;
    createdAt: string;
    updatedAt: string;
    displayName: string;
    locationLat: number;
    locationLng: number;

    enableNavigation?: boolean;
    enablePoiLanguageSwitch?: boolean;
    handDrawingNELat?: number;
    handDrawingNELng?: number;
    handDrawingSWLat?: number;
    handDrawingSWLng?: number;
    maxZoom?: number;
    minZoom?: number;
    zoom?: number;
    sliceState?: SliceState;
}

export interface IScenicRegionInfo {
    handDrawingUri?: string;
    id?: string;
    layer?: string;
    layersDisplayName?: string;
    name?: string;
    scenicRegionId?: string;
    ticketUrl?: string;
    title?: string;
    vrUrl?: string;
    lang?: Language;
}

export interface IScenicRegionNode {
    node?: IScenicRegion;
}

export interface IScenicRegionPagination {
    totalCount?: number;
    edges?: IScenicRegionNode[];
}

export interface IScenicRegionParam {
    displayName?: string;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    locationLng?: number;
    locationLat?: number;
    handDrawingNELat?: number;
    handDrawingNELng?: number;
    handDrawingSWLat?: number;
    handDrawingSWLng?: number;
    enableNavigation?: boolean;
    enablePoiLanguageSwitch?: boolean;
    sliceState?: SliceState;
}

export interface IScenicRegionInfoParam {
    handDrawingUri?: string;
    layer?: string;
    layersDisplayName?: string;
    name: string;
    ticketUrl?: string;
    title?: string;
    vrUrl?: string;
}

export enum SliceState {
    PENDING,
    SLICING,
    SUCCESS,
}
