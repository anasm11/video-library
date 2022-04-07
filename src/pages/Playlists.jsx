import axios from 'axios'
import {Link} from 'react-router-dom'
import {IcRoundDeleteForever} from "../assets/index"
import {usePlaylistContext} from '../contexts/index'

const Playlists=()=>{
    const {playlistState,playlistDispatch}=usePlaylistContext()

    return (
        <div>
        {playlistState.map((playlist)=>
        <Link to={`/playlist/${playlist._id}`} key={playlist._id}>
            <div className="card card-with-dismiss" >
          <div className="card-body"  >
          <div className="close-btn" onClick={(e)=>{e.preventDefault();
          (async()=>{
            const res=await axios({
              method:'delete',
              url:`/api/user/playlists/${playlist._id}`,
              headers:{
                authorization:localStorage.getItem('token')
              }
            })
          playlistDispatch({type:'DELETE_PLAYLIST',payload:res.data.playlists})
          })()
          }}>
<IcRoundDeleteForever/> 

                   
                  </div>
            <div className="text-container">
              <div className="title-text">{playlist.title}</div>
              <div className="author-text">{playlist.creator}</div>
            </div>
            <p className="description">{playlist.description}</p>
          </div>
        </div>

        </Link>
        )}

        </div>

    )
}

export default Playlists