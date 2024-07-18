import { useCallback } from 'react';

import axios from 'axios';
import { useAppDispatch } from '../app/hooks';
import { updateIsoChrone } from '../components/map/marker/markerSlice';
import { deleteMarkedLocations, updateMarkerIsoChroneInAllMaps } from '../components/map/mapSlice';
import { deleteZone } from '../components/zone/zoneSlice';
import { MAPBOX_ACCESS_TOKEN } from '../components/map/MapConfig';
import { Marker } from '../components/map/marker/Marker.objects';


interface IsochroneDataType {
    enabled: boolean;
    mode: string;
    time: number;
    color: string;
}

export const useIsochrone = () => {
    const dispatch = useAppDispatch();
    const fetchIsochrone = useCallback(async (lat: number, lon: number, mode: string, duration: number, color: string, enabled: boolean, markerId: string) => {
        // if mode equals to a string that is not 'walking', 'driving' or 'cycling', set it to 'walking'
        if (mode !== 'walking' && mode !== 'driving' && mode !== 'cycling') {
            mode = 'walking';
        }
        const API_ENDPOINT = `https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${lon},${lat}?contours_minutes=${duration}&polygons=true&access_token=${MAPBOX_ACCESS_TOKEN}`;
        try {
            const response = await axios.get(API_ENDPOINT);
            if (response.data.features && response.data.features.length > 0) {
                response.data.features[0].id = markerId;
            }
            const result = {
                markerId,
                isoChrone: response.data,
                isoChroneColor: color,
                isoChroneEnabled: enabled,
                isoChroneMode: mode,
                isoChroneTime: duration,
            };
            dispatch(updateIsoChrone(result));
            dispatch(updateMarkerIsoChroneInAllMaps(
                { markerId, isoChrone: response.data, isoChroneColor: color, isoChroneEnabled: enabled, isoChroneMode: mode, isoChroneTime: duration }
            ))
        } catch (error) {
            console.error('Error fetching isochrone data:', error);
        };
    }, [dispatch]);

    const handleIsochroneData = (data: IsochroneDataType, marker: Marker) => {
        const { enabled, mode, time, color } = data;
        const defaultMode = 'walking'; // default mode
        const defaultTime = 0; // default time

        if (marker && enabled === true) {
            fetchIsochrone(marker.lat, marker.lon, mode || defaultMode, time || defaultTime, color, enabled, marker.markerId);
        } else {
            const result = {
                markerId: marker.markerId,
                isoChrone: undefined,
                isoChroneColor: '',
                isoChroneEnabled: false,
                isoChroneMode: '',
                isoChroneTime: 0,
            };
            dispatch(updateIsoChrone(result));
            dispatch(deleteMarkedLocations(marker.markerId));
            dispatch(deleteZone(marker.markerId));
            dispatch(updateMarkerIsoChroneInAllMaps(
                { markerId: marker.markerId, isoChrone: undefined, isoChroneColor: '', isoChroneEnabled: false, isoChroneMode: '', isoChroneTime: 0 }
            ))
        }
    };

    return { fetchIsochrone, handleIsochroneData };
};
