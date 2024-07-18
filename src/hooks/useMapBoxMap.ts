import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useDispatch } from 'react-redux';
import { resetGeocoderResult, setGeocoderResult } from '../components/map/mapSlice';
import { mapboxDrawStyles } from '../components/map/MapConfig';


interface MapboxMapSetupArgs {
    mapDiv: React.RefObject<HTMLDivElement>;
    userPreferenceMapStyle: string;
    defaultCenter: [number, number];
    defaultZoom: number;
}

interface MapboxMapSetupReturn {
    map: React.MutableRefObject<mapboxgl.Map | null>;
    geocoder: React.MutableRefObject<MapboxGeocoder | null>;
    draw: React.MutableRefObject<MapboxDraw | null>;
    mapLoaded: boolean;
}

const StaticMode: any = {};

StaticMode.onSetup = function () {
    this.setActionableState(); // Default actionable state is false for all actions

    return {};
};

const useMapboxMap = ({
    mapDiv,
    userPreferenceMapStyle,
    defaultCenter,
    defaultZoom,
}: MapboxMapSetupArgs): MapboxMapSetupReturn => {
    const map = useRef<mapboxgl.Map | null>(null);
    const geocoder = useRef<MapboxGeocoder | null>(null);
    const draw = useRef<MapboxDraw | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (map.current || !mapDiv.current) return;

        const newMap = new mapboxgl.Map({
            container: mapDiv.current,
            style: `mapbox://styles/tjilp/${userPreferenceMapStyle}`,
            center: defaultCenter,
            zoom: defaultZoom,
        });

        newMap.on('load', () => {
            const waiting = () => {
                if (!(newMap.loaded() && newMap.isStyleLoaded() && newMap.areTilesLoaded())) {
                    setTimeout(waiting, 200);
                } else {
                    setMapLoaded(true);
                }
            };
            waiting();
        });

        const newGeocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: { color: '#0066CC' } as any,
            getItemValue: (feature: MapboxGeocoder.Result) => {
                const [lat, lon] = feature.center;
                dispatch(
                    setGeocoderResult({
                        address: feature.place_name,
                        lat: lon,
                        lon: lat,
                    })
                );
                return feature.place_name;
            },
        });

        newGeocoder.on('clear', () => {
            dispatch(resetGeocoderResult());
        });

        newMap.addControl(newGeocoder);
        newMap.addControl(new mapboxgl.FullscreenControl());
        newMap.addControl(new mapboxgl.NavigationControl());

        const newDraw = new MapboxDraw({
            userProperties: true,
            displayControlsDefault: false,
            controls: {
                polygon: true,
                point: false,
                trash: true,
            },
            styles: mapboxDrawStyles,
            modes: { ...MapboxDraw.modes, static: StaticMode },
        });

        newMap.addControl(newDraw);

        geocoder.current = newGeocoder;
        draw.current = newDraw;
        map.current = newMap;

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [mapDiv, userPreferenceMapStyle, defaultCenter, defaultZoom, dispatch]);

    return { map, geocoder, draw, mapLoaded };
};

export default useMapboxMap;
