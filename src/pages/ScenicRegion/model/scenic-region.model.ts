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
    layerDisplayName?: string;
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
