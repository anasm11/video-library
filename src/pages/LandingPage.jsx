import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { IcOutlineThumbUp, IcRoundThumbUp, IcOutlineWatchLater, IcRoundWatchLater, IcRoundPlaylistAdd } from '../assets/index'
import {
  useWatchLaterContext
  , useLikedVideosContext
  , useHistoryContext
} from "../contexts/index"
import PlaylistModal from "../components/PlaylistModal"
import "../css/LandingPage.css"


const LandingPage = () => {
  const [videos, setVideos] = useState([])
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)

  const { watchLaterVideos, watchLaterDispatch } = useWatchLaterContext()
  const { historyVideos, historyDispatch } = useHistoryContext()
  const { likedVideos, likedVideosDispatch } = useLikedVideosContext()

  useEffect(() => {
    (async () => {
      const res = await axios({
        method: 'get',
        url: '/api/videos',
      })
      setVideos(res.data.videos)
    })()

  }, [])

  return (
    <div className='landing-page page-container'>
      {showPlaylistModal && <PlaylistModal playlistModalState={{ showPlaylistModal, setShowPlaylistModal }} />}
      {videos.map((video) => {
        return (
<Link to={`/video/${video._id}`}>
          <div className="card" key={video._id}>
            <div className="card-body" onClick={() => {
              historyDispatch({ type: 'ADD', payload: video })
            }}>

              <div className="text-container">
                <div className="title-text">{video.title}</div>
                <div className="author-text">{video.creator}</div>
              </div>
              <img src={video.img}/>
            </div>

            <div className="foot">
              <div className='action-icons'>
                {
                  likedVideos.find((vid) => video._id === vid._id) ? <IcRoundThumbUp onClick={(e) =>{
                    e.preventDefault()
                     likedVideosDispatch({ type: 'UNLIKE', payload: video })}
                    }
                      /> : <IcOutlineThumbUp onClick={(e) =>{
                        e.preventDefault()
                        likedVideosDispatch({ type: 'LIKE', payload: video })
                      } }
                        />
                }
                {
                  watchLaterVideos.find((vid) => video._id === vid._id) ? <IcRoundWatchLater onClick={(e) => {
                    e.preventDefault()
                    watchLaterDispatch({ type: 'REMOVE_FROM_WATCHLATER', payload: video })
                  }
                  } /> : <IcOutlineWatchLater onClick={(e) => {
                    e.preventDefault()
                    watchLaterDispatch({ type: 'ADD_TO_WATCHLATER', payload: video })
                  }
                  } />
                }
                <IcRoundPlaylistAdd onClick={(e) => {
                  e.preventDefault()
                  setShowPlaylistModal(video)
                }
                  } />
              </div>
            </div>
          </div>
   </Link>  
        )}

      )}
    </div>
  )
}

export default LandingPage