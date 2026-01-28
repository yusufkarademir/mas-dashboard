import { useState } from 'react';
import Map, { NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GisOverlay } from './GisOverlay';
import { Layers, Sprout, AlertTriangle } from 'lucide-react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXVoZW5kaXNiZXkiLCJhIjoiY20wbWVwZzNqMDFmNTJzczlhazdjc2h5aCJ9.o18TVAgRSTbk0xcnXio1kA'; // Mock Token, kullanıcı kendi tokenini eklemeli

export function MapSection() {
  const [viewState, setViewState] = useState({
    longitude: 32.8662,
    latitude: 39.9255,
    zoom: 13,
    bearing: 0,
    pitch: 0
  });

  const [activeLayer, setActiveLayer] = useState<'none' | 'ndvi' | 'segmentation' | 'disease'>('none');

  // Mock GeoJSON for Disease Heatmap (Ar-Ge Entegrasyonu)
  const diseaseHeatmapData = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', geometry: { type: 'Point', coordinates: [32.8662, 39.9255] }, properties: { severity: 5 } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [32.8680, 39.9270] }, properties: { severity: 3 } },
      { type: 'Feature', geometry: { type: 'Point', coordinates: [32.8640, 39.9240] }, properties: { severity: 8 } }
    ]
  };

  // Mock GeoJSON for Segmentation Mask (Yeşil Aksam)
  const segmentationMask = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[32.865, 39.924], [32.867, 39.924], [32.867, 39.926], [32.865, 39.926], [32.865, 39.924]]]
        }
      }
    ]
  };

  return (
    <div className="relative w-full h-full min-h-[400px] glass-panel rounded-3xl border border-white/5 overflow-hidden group neon-border-agri">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        projection={{ name: 'mercator' }}
      >
        <NavigationControl position="top-left" />
        <FullscreenControl position="top-left" />
        <GeolocateControl position="top-left" />
        <ScaleControl />

        {/* Dynamic GIS Layers */}
        {activeLayer === 'ndvi' && (
          <GisOverlay 
            id="ndvi-layer" 
            cogUrl="https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/T/VK/2023/7/2/S2B_36TVK_20230702_0_L2A/TCI.tif" 
          />
        )}

        {activeLayer === 'segmentation' && (
          <GisOverlay 
            id="segment-layer"
            type="vector"
            geoJson={segmentationMask}
            opacity={0.6}
            color="#39ff14"
          />
        )}

        {activeLayer === 'disease' && (
          <GisOverlay 
            id="disease-layer"
            type="heatmap"
            geoJson={diseaseHeatmapData}
            opacity={0.9}
          />
        )}

        {/* Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="scanline" />
        </div>
      </Map>

      {/* Layer Controls */}
      <div className="absolute top-5 right-5 flex flex-col gap-3 z-20">
        <button 
          onClick={() => setActiveLayer(activeLayer === 'ndvi' ? 'none' : 'ndvi')}
          className={`p-3 rounded-2xl backdrop-blur-xl border transition-all relative ${
            activeLayer === 'ndvi' ? 'bg-agri-green/20 border-agri-green text-agri-green shadow-[0_0_15px_rgba(57,255,20,0.3)]' : 'bg-white/5 border-white/10 text-mas-muted hover:text-white'
          }`}
          title="NDVI Analizi"
        >
          <Layers className="w-5 h-5" />
          {activeLayer === 'ndvi' && <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-agri-green rounded-full shadow-[0_0_8px_#39ff14]" />}
        </button>

        <button 
          onClick={() => setActiveLayer(activeLayer === 'segmentation' ? 'none' : 'segmentation')}
          className={`p-3 rounded-2xl backdrop-blur-xl border transition-all relative ${
            activeLayer === 'segmentation' ? 'bg-agri-cyan/20 border-agri-cyan text-agri-cyan shadow-[0_0_15px_rgba(0,245,255,0.3)]' : 'bg-white/5 border-white/10 text-mas-muted hover:text-white'
          }`}
          title="Yeşil Aksam Segmentasyonu"
        >
          <Sprout className="w-5 h-5" />
          {activeLayer === 'segmentation' && <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-agri-cyan rounded-full shadow-[0_0_8px_#00f5ff]" />}
        </button>

        <button 
          onClick={() => setActiveLayer(activeLayer === 'disease' ? 'none' : 'disease')}
          className={`p-3 rounded-2xl backdrop-blur-xl border transition-all relative ${
            activeLayer === 'disease' ? 'bg-agri-red/20 border-agri-red text-agri-red shadow-[0_0_15px_rgba(255,0,0,0.3)]' : 'bg-white/5 border-white/10 text-mas-muted hover:text-white'
          }`}
          title="Hastalık Isı Haritası"
        >
          <AlertTriangle className="w-5 h-5" />
          {activeLayer === 'disease' && <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-agri-red rounded-full shadow-[0_0_8px_#ff0000]" />}
        </button>
      </div>

      {/* Analytics Badge */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-agri-green animate-pulse shadow-[0_0_8px_#39ff14]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-mas-muted uppercase tracking-[0.2em]">GIS Status</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider italic">
              {activeLayer === 'none' ? 'Live Sat-Feed' : 
               activeLayer === 'ndvi' ? 'NDVI Analysis' : 
               activeLayer === 'segmentation' ? 'Yeşil Aksam' : 'Hastalık Haritası'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapSection;
