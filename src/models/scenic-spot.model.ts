import { Language } from "./common";

export interface IScenicSpot {
    id: string;
    scenicRegionId: string;
    displayName: string;
    scenicSpotTypeId: string;
    hidden?: boolean;
}

export interface IScenicSpotNode {
    node?: IScenicSpot;
}

export interface IScenicSpotPagination {
    totalCount?: number;
    edges?: IScenicSpotNode[];
}

// export interface IScenicSpotParam {
//     displayName?: string;
//     zoom?: number;
//     minZoom?: number;
//     maxZoom?: number;
//     locationLng?: number;
//     locationLat?: number;
//     handDrawingNELat?: number;
//     handDrawingNELng?: number;
//     handDrawingSWLat?: number;
//     handDrawingSWLng?: number;
//     enableNavigation?: boolean;
//     enablePoiLanguageSwitch?: boolean;
//     sliceState?: SliceState;
// }

// export interface IScenicSpotInfoParam {
//     handDrawingUri?: string;
//     layer?: string;
//     layerDisplayName?: string;
//     name: string;
//     ticketUrl?: string;
//     title?: string;
//     vrUrl?: string;
// }
