import {
  useWatchLaterContext
  , useLikedVideosContext
  , useHistoryContext
} from "../contexts/index"

import { IcOutlineThumbUp, IcRoundThumbUp, IcOutlineWatchLater, IcRoundWatchLater,IcRoundDeleteForever } from '../assets/index'

const History = () => {
  const { watchLaterVideos, watchLaterDispatch } = useWatchLaterContext()
  const { likedVideos, likedVideosDispatch } = useLikedVideosContext()
  const { historyVideos, historyDispatch } = useHistoryContext()

  return (
    <div>
      <button onClick={()=>{
        (async()=>{
          const res=await({
            method:'delete',
            url:'/api/user/history/all',
            headers:{
              authorization:localStorage.getItem('token')
            }
          })
          historyDispatch({type:'DELETE_HISTORY'})
        })()
      }}>Clear All History</button>
      {historyVideos.map((video) => {

        return <div className="card card-with-badge" key={video._id}>
          <div className="card-body">
            <div className="close-btn" onClick={() => historyDispatch({ type: 'REMOVE', payload: video })}>
                <IcRoundDeleteForever />
              </div>
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
      })

      }
    </div>
  )
}

export default History