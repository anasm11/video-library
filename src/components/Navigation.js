import {Link} from "react-router-dom"
import {IcRoundAccountCircle} from "../assets/index"

const Navigation=()=>{
return (
    
        <div className="nav">
    <h2>TechRev</h2>
    <ul className="nav-links-container">
      <Link to='/'>Videos</Link>
      <Link to='/watchlater'>Watch Later</Link>
      <Link to='/likes'>Liked Videos</Link>
      <Link to='/login' >
                  <IcRoundAccountCircle/>
                  </Link>
    </ul>
  </div>
)
}

export default Navigation