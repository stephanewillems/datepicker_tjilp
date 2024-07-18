import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapIcons {
    [key: string]: string; // key is the icon name, value is the URL
}

interface UseLoadMapIconsArgs {
    map: React.MutableRefObject<mapboxgl.Map | null>;
    mapIcons: MapIcons;
    mapLoaded: boolean;
    userPreferenceMapStyle: string;
}

export const useLoadMapIcons = ({ map, mapIcons, mapLoaded, userPreferenceMapStyle }: UseLoadMapIconsArgs) => {
    useEffect(() => {
        if (!map.current || !mapLoaded) return;

        Object.entries(mapIcons).forEach(([type, url]) => {
            map.current!.loadImage(url, (error?: Error, image?: HTMLImageElement | ImageBitmap) => {
                if (error) {
                    console.error('Failed to load image:', error, image);
                    return;
                }
                if (image) {
                    if (map.current!.hasImage(type)) {
                        map.current!.removeImage(type);
                    }
                    map.current!.addImage(type, image);
                } else {
                    console.error('Failed to load image: ' + url);
                }
            });
        });
    }, [mapIcons, mapLoaded, userPreferenceMapStyle]); // Depend on mapIcons and mapLoaded to re-run if they change
}
