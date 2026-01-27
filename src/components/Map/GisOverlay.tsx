import React from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';

interface GisOverlayProps {
  id: string;
  cogUrl: string;
  opacity?: number;
  type?: 'raster' | 'vector';
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
  opacity = 0.8,
  type = 'raster' 
}) => {
  if (!cogUrl) return null;

  return (
    <Source 
      id={id} 
      type={type} 
      tiles={[cogUrl]} 
      tileSize={256}
    >
      <Layer
        id={`${id}-layer`}
        type="raster"
        paint={{
          'raster-opacity': opacity,
          'raster-contrast': 0.1,
          'raster-brightness-min': 0,
          'raster-brightness-max': 1,
          'raster-resampling': 'linear'
        }}
        layout={{
          'visibility': 'visible'
        }}
      />
    </Source>
  );
};

export default GisOverlay;
