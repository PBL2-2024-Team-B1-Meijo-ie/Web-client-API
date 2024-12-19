import { Link } from "react-router";
import "./Head.css"

function Head(){
  return(
    <header className = "Head1">
      <div className = "Title1">バス予約サイト</div>
      <Link to="/reserve-list">予約リスト</Link>
    </header>
  )
}

export default Head;