import { MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GIBS_WMS = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/all/wms.cgi';

const GIBS_LAYERS = {
  co: 'AIRS_L3_Carbon_Monoxide_500hPa_Volume_Mixing_Ratio_Daily_Day',
  temperature: 'AIRS_L3_Surface_Air_Temperature_Daily_Day',
  pm25: 'MODIS_Terra_Aerosol_Optical_Depth_v6_NRT',
  wind: 'AIRS_L3_Wind_Speed_500hPa_Day',
  o3: 'AIRS_L3_Ozone_Total_Column_Day',
  precipitation: 'AIRS_L3_Precipitation_Day',
  no2: 'OMI_Nitrogen_Dioxide_Tropo_Column',
};

export default function LiveMap({ datasetId }) {
  const layer = GIBS_LAYERS[datasetId];

  const date = new Date();
  date.setDate(date.getDate() - 3);
  const today = date.toISOString().split('T')[0];

  return (
    <div className="fade-in">
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '500px', width: '100%', background: '#0a0e27' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          {layer && (
            <WMSTileLayer
              url={GIBS_WMS}
              layers={layer}
              format="image/png"
              transparent={true}
              version="1.1.1"
              time={today}
              opacity={0.8}
              attribution="NASA GIBS"
            />
          )}
        </MapContainer>
      </div>
      <div className="mt-4 text-center">
        <p className="text-white/80 text-lg">
          🛰️ Live NASA Data:{' '}
          <span className="font-semibold text-cyan-400">Global Imagery Browse Services</span>
        </p>
        <p className="text-white/40 text-sm mt-1">
          Updated every 3–5 hours · Source: NASA GIBS
        </p>
      </div>
    </div>
  );
}