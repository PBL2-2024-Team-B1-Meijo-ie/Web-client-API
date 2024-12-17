/* このサイトから引用，その後ChatGPTでtsx形式に改変 https://zenn.dev/micronn/articles/776c702089f16e */

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom"
import useGetBusStops from './hooks/useGetBusStops';
import useChoiceBusStops from "./hooks/useChoiceBusStops";
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
  const handleClick = (gettitng_on_bus_id:number, gettitng_off_bus_id:number) => {
    navigate("/test", { state: { gettitng_on_bus_id, gettitng_off_bus_id } })
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
    const {gettingOnBusStop, gettingOffBusStop, setGettingOnBusStop, setGettingOffBusStop} = useChoiceBusStops();
  

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
          {bus_stop.bus_name}   バス停ID: {bus_stop.bus_id}
          <br /> 
          {/* <button onClick={()=>{
            handleClick(bus_stop.bus_id);
          }}>予約はこちらから</button> */}
          <button onClick={()=>{
            setGettingOnBusStop(bus_stop.bus_id);
          }}>ここから乗車する</button>
          <button onClick={()=>{
            setGettingOffBusStop(bus_stop.bus_id);
          }}>ここで降車する</button>
        </Popup>
      </Marker>
      )
    })
    return marker;
  };

  return (
    <>
      <BusStopSelection gettingOnBusStop={gettingOnBusStop} gettingOffBusStop={gettingOffBusStop} onReserveClick={()=>{
        if (gettingOnBusStop !== null && gettingOffBusStop !== null) {
          handleClick(gettingOnBusStop, gettingOffBusStop)
        } else{
          alert("バス停を選択してください");
        }
        }} />

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
    </>
  );
};

interface BusStopSelectionProps {
  gettingOnBusStop: number | null;
  gettingOffBusStop: number | null;
  onReserveClick: () => void;
}

const BusStopSelection: React.FC<BusStopSelectionProps> = ({ gettingOnBusStop, gettingOffBusStop, onReserveClick }) => {
  return (
    <div>
      <p>乗車バス停: {gettingOnBusStop !== null ? gettingOnBusStop : '未選択'}</p>
      <p>降車バス停: {gettingOffBusStop !== null ? gettingOffBusStop : '未選択'}</p>
      <button
        onClick={onReserveClick}
        disabled={gettingOnBusStop === null || gettingOffBusStop === null}
      >
        予約時間を選ぶ
      </button>
    </div>
  );
};