import { useEffect, useState } from 'react';
import BusStop from '../types/bus_stops';

const useChoiceBusStops = (busStops: BusStop[]) => {
  const [gettingOnBusStop, setGettingOnBusStop] = useState<number | null>(null);
  const [gettingOnBusStopName, setGettingOnBusStopName] = useState<string | null>(null);
  const [gettingOffBusStop, setGettingOffBusStop] = useState<number | null>(null);
    const [gettingOffBusStopName, setGettingOffBusStopName] = useState<string | null>(null);
    const getBusStopName = (busStopId: number | null) => {
        if (busStopId === null) return '';
        const busStop = busStops.find(stop => stop.bus_id === busStopId);
        return busStop ? busStop.bus_name : '不明なバス停';
      };

    //   乗車バス停名を取得
    useEffect(() => {
        setGettingOnBusStopName(getBusStopName(gettingOnBusStop));
    }
    , [gettingOnBusStop, busStops]);

    //   降車バス停名を取得
    useEffect(() => {
        setGettingOffBusStopName(getBusStopName(gettingOffBusStop));
    }
    , [gettingOffBusStop, busStops]);


  const setGettingOnBusStopHandler = (busStopId: number) => {
    setGettingOnBusStop(busStopId);
  };


  const setGettingOffBusStopHandler = (busStopId: number) => {
    setGettingOffBusStop(busStopId);
  };

  return {
    gettingOnBusStop,
    gettingOnBusStopName,
    gettingOffBusStop,
    gettingOffBusStopName,
    setGettingOnBusStop: setGettingOnBusStopHandler,
    setGettingOffBusStop: setGettingOffBusStopHandler,
  };
};

export default useChoiceBusStops;