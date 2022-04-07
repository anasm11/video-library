import axios from "axios"
import { useState, useEffect } from "react"
import { IcOutlineThumbUp,IcRoundThumbUp, IcOutlineWatchLater, IcRoundWatchLater } from '../assets/index'
import { useWatchLaterContext,useLikedVideosContext } from "../contexts/index"


const LandingPage = () => {
  const [videos, setVideos] = useState([])

  const { watchLaterVideos, watchLaterDispatch } = useWatchLaterContext()
  const {likedVideos,likedVideosDispatch}= useLikedVideosContext()

  useEffect( () => {
    (async()=>{
      const res = await axios({
        method: 'get',
        url: '/api/videos',
      })
      setVideos(res.data.videos)
    })()
    
  }, [])

  return (
    <div className='landing-page page-container'>
      {videos.map((video) =>
        <div className="card" key={video._id}>
          <div className="card-body"  >

            <div className="text-container">
              <div className="title-text">{video.title}</div>
              <div className="author-text">{video.creator}</div>
            </div>
            <p className="description">{video.description}</p>
          </div>

          <div className="foot">
            <div className='action-icons'>
            {
                likedVideos.find((vid) => video._id === vid._id) ? <IcRoundThumbUp onClick={() => likedVideosDispatch({ type: 'UNLIKE', payload: video })} /> : <IcOutlineThumbUp onClick={() => likedVideosDispatch({ type: 'LIKE', payload: video })} />
              }
              {
                watchLaterVideos.find((vid) => video._id === vid._id) ? <IcRoundWatchLater onClick={() => watchLaterDispatch({ type: 'REMOVE_FROM_WATCHLATER', payload: video })} /> : <IcOutlineWatchLater onClick={() => watchLaterDispatch({ type: 'ADD_TO_WATCHLATER', payload: video })} />
              }

            </div>
          </div>
        </div>

      )}
    </div>
  )
}

export default LandingPage