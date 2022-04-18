import axios from "axios"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import {
    useWatchLaterContext
    , useLikedVideosContext
    , useHistoryContext
} from "../contexts/index"
import { IcOutlineThumbUp, IcRoundThumbUp, IcOutlineWatchLater, IcRoundWatchLater, IcRoundPlaylistAdd } from '../assets/index'
import '../css/VideoPage.css'
import {VideoPageCard} from "../components/index"

const VideoPage = () => {
    const { watchLaterVideos, watchLaterDispatch } = useWatchLaterContext()
    const { historyVideos, historyDispatch } = useHistoryContext()
    const { likedVideos, likedVideosDispatch } = useLikedVideosContext()

    const [videos, setVideos] = useState([])

    useEffect(() => {
        (async () => {
            const res = await axios({
                method: 'get',
                url: '/api/videos',
            })
            setVideos(res.data.videos)
        })()

    }, [])


    const { videoId } = useParams()
    const baseURL = 'https://www.youtube.com/embed/'
    const mainVideo = videos.find((video) => video._id === videoId)
    return (
        <div className='video-page'>

            <div className='primary'>
                <iframe
                    width="950" height="500"
                    src={`${baseURL}${videoId}`}>
                </iframe>
                <div class='video-details'>
                    <h3>{mainVideo && mainVideo.title}</h3>

                    <div className='action-buttons'>
                        {mainVideo &&
                            likedVideos.find((vid) => mainVideo._id === vid._id) ? <IcRoundThumbUp onClick={(e) => {
                                e.preventDefault()
                                likedVideosDispatch({ type: 'UNLIKE', payload: mainVideo })
                            }
                            }
                        /> : <IcOutlineThumbUp onClick={(e) => {
                            e.preventDefault()
                            likedVideosDispatch({ type: 'LIKE', payload: mainVideo })
                        }}
                        />
                        }
                        {
                            watchLaterVideos.find((vid) => mainVideo._id === vid._id) ? <IcRoundWatchLater onClick={(e) => {
                                e.preventDefault()
                                watchLaterDispatch({ type: 'REMOVE_FROM_WATCHLATER', payload: mainVideo })
                            }
                            } /> : <IcOutlineWatchLater onClick={(e) => {
                                e.preventDefault()
                                watchLaterDispatch({ type: 'ADD_TO_WATCHLATER', payload: mainVideo })
                            }
                            } />
                        }
                        <IcRoundPlaylistAdd onClick={(e) => {
                            e.preventDefault()
                            //   setShowPlaylistModal(mainVideo)
                        }
                        } />
                    </div>
                </div>
                <h3>{mainVideo && mainVideo.creator}</h3>
                {mainVideo && mainVideo.description}

            </div>

            <div className='secondary'>
                {videos.map((video) =>
                    <VideoPageCard video={video} />
                )}
            </div>

        </div>
    )
}

export default VideoPage