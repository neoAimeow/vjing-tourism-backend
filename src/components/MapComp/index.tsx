import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { LngLat, LngLatPos, Map, Marker } from "react-amap";
import "./index.scss";

interface Props {
    zoom?: number;
    onCoordinateChange?: (coordinate: LngLatPos) => void;
}

let _mapInstance: any = undefined;

const MapComp = (props: Props) => {
    const { zoom = 10, onCoordinateChange } = props || {};
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLogitude] = useState<number>();

    const mapEvents = {
        created: (mapInstance: any) => {
            _mapInstance = mapInstance;
        },
        mapmove: () => {
            if (_mapInstance) {
                const center: LngLatPos = _mapInstance.getCenter();
                setLatitude(center.lat);
                setLogitude(center.lng);
            }
        },
    };

    useEffect(() => {
        if (onCoordinateChange) {
            onCoordinateChange({ lat: latitude || 0, lng: longitude || 0 });
        }
    }, [latitude, longitude]);

    return (
        <div className="map-container">
            <div className="coordinate-input-container">
                <div className="coordinate-input">
                    <div className="coordinate-input-title">输入Latitude</div>
                    <Input
                        className="coordinate-input-component"
                        onChange={(e) => {
                            const lat = Number(e?.target?.value);
                            setLatitude(lat);
                        }}
                    />
                </div>
                <div>
                    <div className="coordinate-input-title">输入Longitude</div>
                    <Input
                        className="coordinate-input-component"
                        onChange={(e) => {
                            const lng = Number(e?.target?.value);
                            setLogitude(lng);
                        }}
                    />
                </div>
            </div>
            <div className="coordinate-container">
                <div className="coordinate-label">
                    <div className="coordinate-title">latitude:</div>
                    <div className="coordinate-content">{latitude}</div>
                </div>
                <div className="coordinate-label" style={{ marginLeft: 20 }}>
                    <div className="coordinate-title">longitude:</div>
                    <div className="coordinate-content">{longitude}</div>
                </div>
            </div>
            <div style={{ width: 800, height: 400 }}>
                <Map zoom={zoom} center={{ lat: latitude || 0, lng: longitude || 0 }} mapStyle="amap://styles/whitesmoke" events={mapEvents}>
                    <Marker position={{ lat: latitude || 0, lng: longitude || 0 }} draggable />
                </Map>
            </div>
        </div>
    );
};

export default MapComp;
