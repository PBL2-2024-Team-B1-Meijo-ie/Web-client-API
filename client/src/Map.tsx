/* このサイトから引用，その後ChatGPTでtsx形式に改変 https://zenn.dev/micronn/articles/776c702089f16e */

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom"
import useGetBusStops from './hooks/useGetBusStops';
import BusStop from "./types/bus_stops";

import L from 'leaflet'
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

// interface MarkerPosition {
//   name: string;
//   description: string;
//   position: [number, number];
// };

export const Map: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = (bus_id:number) => {
    navigate("/test", { state: { bus_id } })
  }
  // const position: [number, number] = [35.13589, 136.97564]; //名城大学天白キャンパスの座標
  const position: [number, number] = [35.15886535903617, 137.64069353868888]; // 設楽町の座標
  const zoom = 16;

  //マーカー増やすたびに変数増やす
  // const marker_position1 = [35.1336162, 136.9739735]; //名城大学天白キャンパス前のローソンの座標
  // const marker_position2 = [35.1536162, 136.9939735];

    const {busStops, loading, error: busStopsError} = useGetBusStops();
    console.log(busStops);
    console.log(loading);
    console.log(busStopsError);
  

  // const marker_info_vec = [
  //   {
  //     name: "ローソン",
  //     description: "コンビニ前",
  //     position: [35.1336162, 136.9739735],
  //   } as MarkerPosition,
  //   {
  //     name: "セブンイレブン",
  //     description: "二つ目",
  //     position: [35.1536162, 136.9939735],
  //   } as MarkerPosition,
  // ];

  const markers = (bus_stops: BusStop[]) => {
    const marker = bus_stops.map((bus_stop, index) => {
      return (
        <Marker position={[bus_stop.lat, bus_stop.lon]} key={index}>
        <Popup>
          {bus_stop.bus_name} <br /> {bus_stop.bus_id}
          <button onClick={()=>{
            handleClick(bus_stop.bus_id);
          }}>予約はこちらから</button>
        </Popup>
      </Marker>
      )
    })
    return marker;
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{
        margin: 0,
        padding: 0,
        height: "91vh",
        width: "100vw", 
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers(busStops)}
    </MapContainer>
  );
};
