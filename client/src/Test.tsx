import React, { useState } from 'react';
import { data, useLocation } from "react-router-dom";

const REQUEST_URL = import.meta.env.VITE_API_URL;

const BusSchedule: React.FC = () => {
  const location = useLocation();
  const {bus_id:busID} = location.state as {bus_id:number};
  const busID_on = busID.toString();
  const [busTime, setBusTime] = useState<string[][]>(Array(15).fill(null).map(() => Array(4).fill(null)));
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const busID_off = (document.getElementById('busID_off') as HTMLInputElement).value;
    const date = (document.getElementById('date') as HTMLInputElement).value;

    const queryParams = new URLSearchParams({
      busID_on,
      busID_off,
      date,
    }).toString();

    try {
      const url = `${REQUEST_URL}/api/available_bus_stops?${queryParams}`;
      console.log(url)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('ネットワークエラーが発生しました。');
      }

      const data = await response.json();

      const newBusTime: string[][] = Array(15).fill(null).map(() => Array(4).fill(null));
      const idx = Array(15).fill(0);

      data.message.forEach((item: any) => {
        const dateTime = new Date(item.startTime);
        const dateHour = dateTime.getHours();
        const dateMinute = dateTime.getMinutes();

        if (dateHour >= 7 && dateHour <= 21) {
          const hourIndex = dateHour - 7;
          const formattedTime = `${dateHour}:${dateMinute.toString().padStart(2, '0')}`;
          newBusTime[hourIndex][idx[hourIndex]] = formattedTime;
          idx[hourIndex] += 1;
        }
      });

      setBusTime(newBusTime);
    } catch (err: any) {
      console.error('エラー:', err);
      if (busID_on === busID_off) {
        alert('乗車位置と降車位置が同じになっています');
      }
    }
  };

  const handleReserve = (time: String, date: String) => {
    const busID_off = (document.getElementById('busID_off') as HTMLInputElement).value;
    const reservationDetails = {
      busID_on,
      busID_off,
      date,
      time,
    };
    console.dir(reservationDetails, {depth: null})
    console.dir(`http://localhost:3000/api/reservations?${reservationDetails}`,{depth: null});
    fetch(`http://localhost:3000/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('予約に失敗しました。1');
        }
        return response.json();
      })
      .then((data) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${year}年${Number(month)}月${Number(day)}日`;
        alert(`${formattedDate} ${time} の予約が完了しました。`);
      })
      .catch((err) => {
        console.error('エラー:', err);
        alert('予約に失敗しました。2');
      });
  };

  return (
    <div id="Test">
      <h1>バス予約</h1>
      <div className="inputs">
        <form id="busForm" onSubmit={handleSubmit}>
          <label htmlFor="busID_off">降車バス停ID:</label>
          <input type="number" id="busID_off" required />

          <label htmlFor="date">日付:</label>
          <input type="date" id="date" required />

          <button type="submit">情報取得</button>
        </form>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div id="TimeTable" style={{ display: busTime.flat().some(Boolean) ? 'block' : 'none' }}>
        {busTime.map((times, index) => (
          <div
            key={index}
            id={`${index + 7}result`}
            className={index % 2 === 0 ? 'even' : 'odd'}
          >
            <div className="clock">{index + 7}</div>
            {times.map(
              (time, timeIndex) =>
                time && (
                  <button
                    key={timeIndex}
                    id={`${index + 7}result_${timeIndex + 1}result`}
                    onClick={() =>
                      handleReserve(time, (document.getElementById('date') as HTMLInputElement).value)
                    }
                  >
                    {time}
                  </button>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusSchedule;
