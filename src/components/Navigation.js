import { useState } from "react"
import { Link } from "react-router-dom"
import { IcRoundAccountCircle } from "../assets/index"

const Navigation = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  return (

    <div className="nav">

      <h2>TechRev</h2>

      <ul className="nav-links-container">
        <Link to='/'>Videos</Link>
        <Link to='/watchlater'>Watch Later</Link>
        <Link to='/likes'>Liked Videos</Link>
        <Link to='/history'>History</Link>
        <Link to='/playlists'>Playlists</Link>

        <li><IcRoundAccountCircle onClick={() => setShowProfileDropdown((prev) => !prev)} />
          {showProfileDropdown &&
            <div className='profile-dropdown'>
              {localStorage.getItem('token') ? <div>My Profile<hr/></div> : <div><Link to='/login' >Login</Link><hr/></div>}
              <div onClick={()=>{
                localStorage.setItem('token','')
              }}>Logout</div>
            </div>}</li>

      </ul>
    </div>
  )
}

export default Navigation