import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface SelectionStatus {
    status: boolean;
    markerId: string | null;
    aggregatedId: string | null;
}


interface UseAdjustLayerStylesArgs {
    map: React.MutableRefObject<mapboxgl.Map | null>;
    mapLoaded: boolean;
    selectSlideOverStatus: SelectionStatus;
    markerSelection: string[]; // Optional parameter for marker selection
    markerShow: boolean;
    userPreferenceMapStyle: string;
}

export const useAdjustLayerStyles = ({
    map,
    mapLoaded,
    selectSlideOverStatus,
    markerSelection,
    markerShow,
    userPreferenceMapStyle
}: UseAdjustLayerStylesArgs) => {
    useEffect(() => {
        if (map.current && mapLoaded && map.current.isStyleLoaded()) {
            if (markerShow) {
                map.current.setLayoutProperty('markers-layer', 'visibility', 'visible');
                map.current.setLayoutProperty('agg-markers-layer', 'visibility', 'visible');
            } else {
                map.current.setLayoutProperty('markers-layer', 'visibility', 'none');
                map.current.setLayoutProperty('agg-markers-layer', 'visibility', 'none');

            }

            if (selectSlideOverStatus.status) {
                // Logic for when a selection exists
                const isSelectedMarker = ['==', ['get', 'markerId'], selectSlideOverStatus.markerId];
                const isNotSelectedAggregatedMarker = ['!=', ['get', 'aggregatedMarkerId'], selectSlideOverStatus.aggregatedId];
                const isSelectedAggregatedMarker = ['==', ['get', 'aggregatedMarkerId'], selectSlideOverStatus.aggregatedId];

                // Adjust properties for markers-layer based on selectSlideOverStatus
                map.current.setLayoutProperty('markers-layer', 'icon-size', ['case', isSelectedMarker, 1.1, isNotSelectedAggregatedMarker, 0.8, 1]);
                map.current.setPaintProperty('markers-layer', 'icon-opacity', ['case', isSelectedMarker, 1, isNotSelectedAggregatedMarker, 0.5, 1]);
                map.current.setPaintProperty('markers-layer', 'text-opacity', ['case', isSelectedMarker, 1, isNotSelectedAggregatedMarker, 0, 1]);
                // adjust text-offset of agg markers type when it is not selected

                // Adjust properties for agg-markers-layer based on selectSlideOverStatus
                map.current.setLayoutProperty('agg-markers-layer', 'icon-size', ['case', isSelectedAggregatedMarker, 1.1, 0.8]);
                map.current.setPaintProperty('agg-markers-layer', 'icon-opacity', ['case', isSelectedAggregatedMarker, 1, 0.5]);
                map.current.setPaintProperty('agg-markers-layer', 'icon-opacity', ['case', isSelectedAggregatedMarker, 1, 0.5]);
                map.current.setPaintProperty('agg-markers-layer', 'text-opacity', ['case', isSelectedAggregatedMarker, 1, 0.5]);
                map.current.setLayoutProperty('agg-markers-layer', 'text-size', ['case', isSelectedAggregatedMarker, 15, 11]);

            } else if (markerSelection && markerSelection.length > 0) {


                // Additional logic to handle markerSelection
                const isSelected = ['in', ['get', 'markerId'], ['literal', markerSelection]];
                const isAggSelected = [
                    'any',
                    ...markerSelection.map(id => ['in', id, ['get', 'markerIds']])
                ];


                // Adjust properties for both layers based on markerSelection
                ['markers-layer'].forEach(layer => {
                    map.current!.setLayoutProperty(layer, 'icon-size', ['case', isSelected, 1.2, 0.5]);
                    map.current!.setPaintProperty(layer, 'icon-opacity', ['case', isSelected, 1, 0.5]);
                    map.current!.setPaintProperty(layer, 'text-opacity', ['case', isSelected, 1, 0]);


                });
                ['agg-markers-layer'].forEach(layer => {
                    map.current!.setLayoutProperty(layer, 'icon-size', ['case', isAggSelected, 1.2, 0.5]);
                    map.current!.setPaintProperty(layer, 'icon-opacity', ['case', isAggSelected, 1, 0.5]);
                    map.current!.setPaintProperty(layer, 'text-opacity', ['case', isAggSelected, 1, 0]);


                });
                map.current!.setLayoutProperty('markers-layer', 'text-size', ['case', isSelected, 14, 12]);
                map.current!.setLayoutProperty('agg-markers-layer', 'text-size', ['case', isAggSelected, 17, 12]);
            } else {
                // Reset styles to default when no selection
                ['markers-layer', 'agg-markers-layer'].forEach(layer => {
                    map.current!.setLayoutProperty(layer, 'icon-size', 1);
                    map.current!.setPaintProperty(layer, 'icon-opacity', 1);
                    map.current!.setPaintProperty(layer, 'text-opacity', 1);

                });
                map.current!.setLayoutProperty('agg-markers-layer', 'text-size', 14);
                map.current!.setLayoutProperty('markers-layer', 'text-size', 12);
            }
        }
    }, [map, mapLoaded, selectSlideOverStatus, markerSelection, markerShow, userPreferenceMapStyle]);
};
