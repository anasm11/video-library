import { useLikedVideosContext } from "../contexts/liked-videos-context"
import { IcOutlineThumbUp,IcRoundThumbUp } from '../assets/index'


const Likes = () => {
    const { likedVideos,likedVideosDispatch } = useLikedVideosContext()
    console.log(likedVideos,'likedvids from likes')
    

    return (<div>
        {console.log(likedVideos,'likedvids')}
        {
            likedVideos.map((video) => 
                <div className="card" key={video._id}>
                    <div className="card-body" >

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
                        </div>
                    </div>
                </div>

            )
        }
    </div>)
}

export default Likes