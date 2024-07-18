import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


const removeSourceAndLayer = (map: mapboxgl.Map, layerId: string, sourceId: string) => {
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
  if (map.getSource(sourceId) && !map.getStyle().layers?.some((layer: mapboxgl.Layer) => layer.source === sourceId)) {
    // Only remove the source if no other layers are using it
    map.removeSource(sourceId);
  }
};

const addSourceAndLayer = (map: mapboxgl.Map, sourceId: string, sourceConfig: mapboxgl.AnySourceData, layerConfig: mapboxgl.AnyLayer) => {
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, sourceConfig);
  } else {
    // Optionally update the source data here if needed
    // Example: (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(sourceConfig.data);
  }
  if (!map.getLayer(layerConfig.id)) {
    map.addLayer(layerConfig);
  }
};



export interface LayerConfig {
  id: string;
  sourceId: string;
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry> | (() => GeoJSON.FeatureCollection<GeoJSON.Geometry>);
  layerDefinition: mapboxgl.AnyLayer;
  cluster?: boolean;
  clusterMaxZoom?: number;
  clusterRadius?: number;
  visibility?: 'visible' | 'none';
}

interface UseMapLayersArgs {
  map: mapboxgl.Map | null;
  mapLoaded: boolean;
  layersConfig: LayerConfig[];
}


export const useMapLayers = ({ map, mapLoaded, layersConfig }: UseMapLayersArgs) => {
  useEffect(() => {
    if (!map || !mapLoaded) return;

    layersConfig.forEach(({ id, sourceId, data, layerDefinition, cluster, clusterMaxZoom, clusterRadius }) => {
      try {
        const actualData = typeof data === 'function' ? data() : data;
        removeSourceAndLayer(map, id, sourceId);
        addSourceAndLayer(map, sourceId, {
          type: 'geojson',
          data: actualData,
          ...(cluster && {
            cluster,
            clusterMaxZoom: clusterMaxZoom ?? 14,
            clusterRadius: clusterRadius ?? 50,
          }),
        }, layerDefinition);
      } catch (error) {
        console.error(`Error managing layers for ${id}:`, error);
      }
    });
  }, [map, mapLoaded, layersConfig]);
};
