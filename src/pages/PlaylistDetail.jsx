import axios from "axios"
import {useParams} from "react-router-dom"
import {usePlaylistContext} from "../contexts/index"
import {IcRoundDeleteForever} from "../assets/index"

const PlaylistDetail=()=>{
    const {playlistState,playlistDispatch}=usePlaylistContext()
    const {playlistId}= useParams()
    
    const playlist=playlistState.find((list)=>list._id===playlistId)

    return(
        <div>{playlist.videos.map((video)=>
<div className="card card-with-dismiss" key={video._id}>
          <div className="card-body" >

<div className='close-btn' onClick={(e)=>{
    e.preventDefault();
    (async()=>{
        const res=await axios({
            method:'delete',
            url:`/api/user/playlists/${playlistId}/${video._id}`,
            headers:{authorization:localStorage.getItem('token')}
        })

        playlistDispatch({type:'DELETE_FROM_PLAYLIST',payload:res.data.playlist})
    })()

}}>
    <IcRoundDeleteForever/>
</div>

            <div className="text-container">
              <div className="title-text">{video.title}</div>
              <div className="author-text">{video.creator}</div>
            </div>
            <p className="description">{video.description}</p>
          </div>
        
        </div>)}

        </div>
    )
}

export default PlaylistDetail