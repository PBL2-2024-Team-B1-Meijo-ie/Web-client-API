import { Link } from 'react-router-dom';

const Time_table_route = () => {
  return (
    <div>
      <div>時刻表はこちら</div>
      <Link to='../reservation.html'>予約</Link>
    </div>
  )
}

export default Time_table_route;