import { useEffect, RefObject } from 'react';
import mapboxgl from 'mapbox-gl';

const useCursorStyleOnLayer = (
    map: RefObject<mapboxgl.Map>,
    mapLoaded: boolean,
    layers: string[],
    cursorStyle: string = 'pointer'
): void => {
    useEffect(() => {
        if (!map.current || !mapLoaded) return;

        const enterCursorChange = (style: string) => () => {
            map.current!.getCanvas().style.cursor = style;
        };

        const leaveCursorRevert = () => {
            map.current!.getCanvas().style.cursor = '';
        };

        layers.forEach(layerId => {
            const onEnter = enterCursorChange(cursorStyle);
            const onLeave = leaveCursorRevert;

            map.current!.on('mouseenter', layerId, onEnter);
            map.current!.on('mouseleave', layerId, onLeave);

            return () => {
                map.current!.off('mouseenter', layerId, onEnter);
                map.current!.off('mouseleave', layerId, onLeave);
            };
        });
    }, [map, mapLoaded, layers, cursorStyle]);
};

export default useCursorStyleOnLayer;

