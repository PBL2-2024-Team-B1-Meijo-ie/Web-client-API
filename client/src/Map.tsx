/* このサイトから引用，その後ChatGPTでtsx形式に改変 https://zenn.dev/micronn/articles/776c702089f16e */

import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom"

interface MarkerPosition {
  name: string;
  discription: string;
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
  const marker_position1 = [35.1336162, 136.9739735]; //名城大学天白キャンパス前のローソンの座標
  const marker_position2 = [35.1536162, 136.9939735];


  const marker_info_vec = [
    {
      name: "ローソン",
      discription: "コンビニ前",
      position: [35.1336162, 136.9739735],
    } as MarkerPosition,
    {
      name: "セブンイレブン",
      discription: "二つ目",
      position: [35.1536162, 136.9939735],
    } as MarkerPosition,
  ];

  const markers = (marker_info_vec: MarkerPosition[]) => {
    const marker = marker_info_vec.map((marker, index) => {
      return (
        <Marker position={marker.position} key={index}>
        <Popup>
          {marker.name} <br /> {marker.discription}
          <button onClick={()=>{
            handleClick(index + 1);
          }}>予約はこちらから</button>
        </Popup>
      </Marker>
      )
    })
    return marker;
  };

  // useEffect(() => {
  //   // マップの初期化とオプションの設定
  //   const map = L.map("map", {
  //     center: position,
  //     zoom: zoom,
  //   });
  // }

  //   // タイルレイヤーの追加
  //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   }).addTo(map);

  //   // マーカーの追加　マーカー増やすときは変数名も新しく作る
  //   const marker1 = L.marker(marker_position1).addTo(map);
  //   marker1.bindPopup(
  //     'コンビニ前<br/><a href="http://127.0.0.1:3000/?" target="_blank" rel="noopener noreferrer">予約はこちら</a>'
  //   ); //とりあえずaタグで作成する

  //   const marker2 = L.marker(marker_position2).addTo(map);
  //   marker2.bindPopup(
  //     '二つ目<br/><a href="http://127.0.0.1:3000/?" target="_blank" rel="noopener noreferrer">予約はこちら</a>'
  //   );

  //   // コンポーネントのアンマウント時にマップインスタンスを削除
  //   return () => {
  //     map.remove();
  //   };
  // }, [position, zoom]);

  // return <div id="map" style={{ height: '100vh', width: '100%' }} />;//地図のサイズを変更できる
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers(marker_info_vec)}
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};
