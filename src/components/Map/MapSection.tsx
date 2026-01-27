import React, { useState } from 'react';
import Map, { NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GisOverlay } from './GisOverlay';
import { Layers, Maximize, Map as MapIcon } from 'lucide-react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibXVoZW5kaXNiZXkiLCJhIjoiY20wbWVwZzNqMDFmNTJzczlhazdjc2h5aCJ9.o18TVAgRSTbk0xcnXio1kA'; // Mock Token, kullanıcı kendi tokenini eklemeli

export function MapSection() {
  const [viewState, setViewState] = useState({
    longitude: 32.8662,
    latitude: 39.9255,
    zoom: 13,
    bearing: 0,
    pitch: 0
  });

  const [activeLayer, setActiveLayer] = useState<'none' | 'ndvi' | 'ortho'>('none');

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
            cogUrl="https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/T/VK/2023/7/2/S2B_36TVK_20230702_0_L2A/TCI.tif" // Örnek COG URL
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
          className={`p-3 rounded-2xl backdrop-blur-xl border transition-all ${
            activeLayer === 'ndvi' ? 'bg-agri-green/20 border-agri-green text-agri-green' : 'bg-white/5 border-white/10 text-mas-muted hover:text-white'
          }`}
        >
          <Layers className="w-5 h-5" />
          {activeLayer === 'ndvi' && <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-agri-green rounded-full shadow-[0_0_8px_#39ff14]" />}
        </button>
      </div>

      {/* Analytics Badge */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-agri-green animate-pulse shadow-[0_0_8px_#39ff14]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-mas-muted uppercase tracking-[0.2em]">GIS Status</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider italic">
              {activeLayer === 'none' ? 'Live Sat-Feed' : (activeLayer === 'ndvi' ? 'NDVI Analysis' : 'Orthophoto')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapSection;
