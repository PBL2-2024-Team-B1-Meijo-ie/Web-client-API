/* このサイトから引用，その後ChatGPTでtsx形式に改変 https://zenn.dev/micronn/articles/776c702089f16e */

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom"

import L from 'leaflet'
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

interface MarkerPosition {
  name: string;
  description: string;
  position: [number, number];
};

export const Map: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = (bus_id:number) => {
    navigate("/test", { state: { bus_id } })
  }
  const position: [number, number] = [35.13589, 136.97564]; //名城大学天白キャンパスの座標
  const zoom = 16;

  //マーカー増やすたびに変数増やす
  // const marker_position1 = [35.1336162, 136.9739735]; //名城大学天白キャンパス前のローソンの座標
  // const marker_position2 = [35.1536162, 136.9939735];


  const marker_info_vec = [
    {
      name: "ローソン",
      description: "コンビニ前",
      position: [35.1336162, 136.9739735],
    } as MarkerPosition,
    {
      name: "セブンイレブン",
      description: "二つ目",
      position: [35.1536162, 136.9939735],
    } as MarkerPosition,
  ];

  const markers = (marker_info_vec: MarkerPosition[]) => {
    const marker = marker_info_vec.map((marker, index) => {
      return (
        <Marker position={marker.position} key={index}>
        <Popup>
          {marker.name} <br /> {marker.description}
          <button onClick={()=>{
            handleClick(index + 1);
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
      {markers(marker_info_vec)}
    </MapContainer>
  );
};
