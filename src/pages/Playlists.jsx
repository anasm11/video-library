import axios from 'axios'
import { useState } from "react"
import { Link } from 'react-router-dom'
import { IcRoundDeleteForever } from "../assets/index"
import { usePlaylistContext } from '../contexts/index'

const Playlists = () => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [newPlaylistName,setNewPlaylistName]=useState('')
  const { playlistState, playlistDispatch } = usePlaylistContext()

  return (
    <div>
      <button onClick={() => { setShowCreatePlaylist(true) }
      }>Create Playlist</button>
      {showCreatePlaylist && <div><input type='text' onChange={(e)=>
      setNewPlaylistName(e.target.value)}/><button onClick={()=>{
        (async()=>{
          const res =await axios({
            method:'post',
            url:'/api/user/playlists',
            data:{playlist: {title: newPlaylistName, description:"bar bar bar" }},
            headers:{
              authorization:localStorage.getItem('token')
            }
          })
          playlistDispatch({type:'ADD_PLAYLIST',payload:res.data.playlists})
        })()
        
      }}>Submit</button></div>}
      {playlistState.map((playlist) =>
        <Link to={`/playlist/${playlist._id}`} key={playlist._id}>
          <div className="card card-with-dismiss" >
            <div className="card-body"  >
              <div className="close-btn" onClick={(e) => {
                e.preventDefault();
                (async () => {
                  const res = await axios({
                    method: 'delete',
                    url: `/api/user/playlists/${playlist._id}`,
                    headers: {
                      authorization: localStorage.getItem('token')
                    }
                  })
                  playlistDispatch({ type: 'DELETE_PLAYLIST', payload: res.data.playlists })
                })()
              }}>
                <IcRoundDeleteForever />


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