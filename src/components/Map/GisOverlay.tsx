import React from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';

interface GisOverlayProps {
  id: string;
  cogUrl?: string; // Raster tile source
  geoJson?: any;   // Vector/GeoJSON source
  opacity?: number;
  type?: 'raster' | 'heatmap' | 'vector';
  color?: string;
}

/**
 * GisOverlay - Siberpunk Tarım Dashboard GIS Katmanı
 * 
 * Bu bileşen, COG (Cloud Optimized GeoTIFF) verilerini HTTP Range request'ler
 * kullanarak düşük bant genişliği ile yüksek çözünürlüklü render eder.
 */
export const GisOverlay: React.FC<GisOverlayProps> = ({ 
  id, 
  cogUrl, 
  geoJson,
  opacity = 0.8,
  type = 'raster',
  color = '#39ff14' // Default neon green
}) => {
  if (type === 'raster' && cogUrl) {
    return (
      <Source id={id} type="raster" tiles={[cogUrl]} tileSize={256}>
        <Layer
          id={`${id}-layer`}
          type="raster"
          paint={{
            'raster-opacity': opacity,
            'raster-resampling': 'linear'
          }}
        />
      </Source>
    );
  }

  if (type === 'heatmap' && geoJson) {
    return (
      <Source id={id} type="geojson" data={geoJson}>
        <Layer
          id={`${id}-heatmap`}
          type="heatmap"
          paint={{
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'severity'], 0, 0, 6, 1],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(0,0,0,0)',
              0.2, 'rgba(57,255,20,0.1)', // Greenish for low
              0.4, 'rgba(255,255,0,0.3)', // Yellow
              0.6, 'rgba(255,165,0,0.5)', // Orange
              0.8, 'rgba(255,0,0,0.7)'    // Red for high disease
            ],
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 20],
            'heatmap-opacity': opacity
          }}
        />
      </Source>
    );
  }

  if (type === 'vector' && geoJson) {
     return (
       <Source id={id} type="geojson" data={geoJson}>
         <Layer
           id={`${id}-fill`}
           type="fill"
           paint={{
             'fill-color': color,
             'fill-opacity': opacity * 0.4,
             'fill-outline-color': color
           }}
         />
       </Source>
     );
  }

  return null;
};

export default GisOverlay;
