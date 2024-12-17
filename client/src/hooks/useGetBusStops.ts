import { useState, useEffect } from 'react';
import BusStop from '../types/bus_stops';
// const REQUEST_URL = import.meta.env.VITE_API_URL;


const testBusStops: BusStop[] = [
    { bus_id: 1, bus_name: '下津具', lat: 35.15886535903617, lon: 137.64069353868888 },
    { bus_id: 2, bus_name: '麓', lat: 35.16192862422774, lon: 137.63399145408084 },
    { bus_id: 3, bus_name: '見出', lat: 35.16161969311329, lon: 137.62880317234072 },
    { bus_id: 4, bus_name: '見出原', lat: 35.164611395844496, lon: 137.6251485422787 },
    { bus_id: 5, bus_name: '上津具', lat: 35.17041076866729, lon: 137.6182014540811 },
    { bus_id: 6, bus_name: '中林', lat: 35.16841944434846, lon: 137.6182657738322 },
    { bus_id: 7, bus_name: '大桑', lat: 36.538604389311544, lon: 136.67305907281627 },
    { bus_id: 8, bus_name: '南大桑', lat: 35.15535104893819, lon: 137.61362416911487 },
    { bus_id: 9, bus_name: 'スノ子', lat: 35.14966651166886, lon: 137.60900145408013 },
    { bus_id: 10, bus_name: '大野橋', lat: 35.11089878017588, lon: 138.98167695128356 },
    { bus_id: 11, bus_name: '谷合', lat: 35.60977529528252, lon: 136.73611442826711 },
    { bus_id: 12, bus_name: '八ツ橋', lat: 35.45018084209906, lon: 139.32905082340682 },
    { bus_id: 13, bus_name: '西路', lat: 35.12923435219206, lon: 137.58824166057866 },
    { bus_id: 14, bus_name: '滝瀬橋', lat: 35.12055070897797, lon: 137.58060853873573 },
    { bus_id: 15, bus_name: '大沼', lat: 35.2405651148586, lon: 137.56351289123592 },
    { bus_id: 16, bus_name: '境川', lat: 35.199061531438346, lon: 137.5543212385955 },
    { bus_id: 17, bus_name: '奴田口', lat: 35.11063885008587, lon: 137.5681673601682 },
    { bus_id: 18, bus_name: '添沢', lat: 35.1064747368613, lon: 137.57343787185044 },
    { bus_id: 19, bus_name: '小松口', lat: 35.14251989630656, lon: 137.58260796212838 },
    { bus_id: 20, bus_name: '太田口', lat: 35.17259962454359, lon: 137.58259608689357 },
    { bus_id: 21, bus_name: '設楽町役場', lat: 35.09713225690494, lon: 137.57156806757052 }
  ];

const useGetBusStops = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("useGetBusStops");
  useEffect(() => {
    const fetchBusStops = async () => {
    //   try {
    //     const response = await fetch(`${REQUEST_URL}/api/busstops`);
    //     if (!response.ok) {
    //       throw new Error('バス停一覧の取得に失敗しました');
    //     }
    //     const data = await response.json();
    //     setBusStops(data);
    //   } catch (err) {
    //     setError('バス停一覧の取得に失敗しました');
    //   } finally {
    //     setLoading(false);
    //   }
      console.log(setError);
      setBusStops(testBusStops);
      setLoading(false);
    };

    fetchBusStops();
  }, []);

  return { busStops, loading, error };
};

export default useGetBusStops;