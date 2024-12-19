import React from 'react';
import useGetReserveList from './hooks/useGetReserveList';

const ReserveList: React.FC = () => {
    // useReserveList
    const { reserves, loading, error } = useGetReserveList();
  return (
    <div >
      <h1>バス予約リスト</h1>
      <div className="inputs">
        {loading ? (
          <p>ローディング中...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>バス停ID</th>
                <th>予約日</th>
                <th>予約時刻</th>
              </tr>
            </thead>
            <tbody>
              {reserves.map((reserve) => (
                <tr key={reserve.onbusstop_id}>
                  <td>{reserve.onbusstop_id}</td>
                  <td>{reserve.reserveDate}</td>
                  <td>{reserve.reserveTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  </div>
  );
};

export default ReserveList;
