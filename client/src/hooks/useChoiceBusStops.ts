import { useState } from 'react';

const useChoiceBusStops = () => {
  const [gettingOnBusStop, setGettingOnBusStop] = useState<number | null>(null);
  const [gettingOffBusStop, setGettingOffBusStop] = useState<number | null>(null);

  const setGettingOnBusStopHandler = (busStopId: number) => {
    setGettingOnBusStop(busStopId);
  };

  const setGettingOffBusStopHandler = (busStopId: number) => {
    setGettingOffBusStop(busStopId);
  };

  return {
    gettingOnBusStop,
    gettingOffBusStop,
    setGettingOnBusStop: setGettingOnBusStopHandler,
    setGettingOffBusStop: setGettingOffBusStopHandler,
  };
};

export default useChoiceBusStops;