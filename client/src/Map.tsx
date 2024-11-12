/* このサイトから引用，その後ChatGPTでtsx形式に改変 https://zenn.dev/micronn/articles/776c702089f16e */

import React, { useEffect } from 'react';
import L from 'leaflet';//エラーになってるけど動きます...
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

export const Map: React.FC = () => {
  const position: [number, number] = [35.13589, 136.97564];//名城大学天白キャンパスの座標
  const zoom = 16;

  //マーカー増やすたびに変数増やす
  const marker_position1 = [35.1336162, 136.9739735];//名城大学天白キャンパス前のローソンの座標
  const marker_position2 = [35.1536162, 136.9939735];
  
  useEffect(() => {
    // マップの初期化とオプションの設定
    const map = L.map('map', {
      center: position,
      zoom: zoom,
    });

    // タイルレイヤーの追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // マーカーの追加　マーカー増やすときは変数名も新しく作る
    const marker1 = L.marker(marker_position1).addTo(map);
    marker1.bindPopup('コンビニ前<br/><a href="https://www.meijo-u.ac.jp/" target="_blank" rel="noopener noreferrer">時刻表はこちら</a>');//とりあえずaタグで作成する

    const marker2 = L.marker(marker_position2).addTo(map);
    marker2.bindPopup('二つ目<br/><a href="https://www.meijo-u.ac.jp/" target="_blank" rel="noopener noreferrer">時刻表はこちら</a>');


    // コンポーネントのアンマウント時にマップインスタンスを削除
    return () => {
      map.remove();
    };
  }, [position, zoom]);

  return <div id="map" style={{ height: '84vh', width: '100%' }} />;//地図のサイズを変更できる
};


