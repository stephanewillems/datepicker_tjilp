import { Dispatch, useEffect } from 'react';
import mapboxgl, { MapMouseEvent, MapboxGeoJSONFeature } from 'mapbox-gl';
import { setSlideOverStatusRedux } from '../components/map/marker/markerSlice';
import { useAppDispatch } from '../app/hooks';

interface UseMapClickEventsArgs {
    map: mapboxgl.Map | null;
    mapLoaded: boolean;
    setSlideOverStatus: Dispatch<React.SetStateAction<{
        markerId: string;
        status: boolean;
        aggregatedId: string;
    }>>;
}

const useMapClickEvents = ({ map, mapLoaded, setSlideOverStatus }: UseMapClickEventsArgs) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!map || !mapLoaded) return;

        const onMarkerClick = (e: MapMouseEvent & { features?: MapboxGeoJSONFeature[] } & mapboxgl.EventData) => {
            if (e.features && e.features.length > 0) {
                const clickedMarker = e.features[0];
                if (!clickedMarker.properties) return;

                const markerId = clickedMarker.properties.markerId as string;
                const ipId = clickedMarker.properties.ispData as string ?? '';
                const aggregatedId = '';

                clickedMarker.properties.isSelected = true;
                setSlideOverStatus({ markerId, status: true, aggregatedId });
                dispatch(setSlideOverStatusRedux({ markerId, status: true, aggregatedId, extraData: {'ipId':ipId } }))
            }
        };

        const onAggregatedMarkerClick = (e: MapMouseEvent & { features?: MapboxGeoJSONFeature[] } & mapboxgl.EventData) => {
            if (e.features && e.features.length > 0) {
                const clickedMarker = e.features[0];
                const aggregatedId = clickedMarker.properties!.aggregatedMarkerId as string;
                const markerId = clickedMarker.properties!.markerId as string;

                clickedMarker.properties!.isSelected = true;
                setSlideOverStatus({ markerId, status: true, aggregatedId });
            }
        };

        map.on('click', 'markers-layer', onMarkerClick);
        map.on('click', 'agg-markers-layer', onAggregatedMarkerClick);

        return () => {
            map.off('click', 'markers-layer', onMarkerClick);
            map.off('click', 'agg-markers-layer', onAggregatedMarkerClick);
        };
    }, [map, mapLoaded, setSlideOverStatus]);
};

export default useMapClickEvents;
