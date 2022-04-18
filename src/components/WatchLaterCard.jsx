import { IcOutlineThumbUp, IcOutlineThumbDown, IcRoundWatchLater } from '../assets/index'

const WatchLaterCard = ({video,watchLaterDispatch}) => {
    return (
        <div className="card" key={video._id}>
            <div className="card-body">

                <div className="text-container">
                    <div className="title-text">{video.title}</div>
                    <div className="author-text">{video.creator}</div>
                </div>
                <p className="description">{video.description}</p>
            </div>

            <div className="foot">
                <div className='action-icons'>
                    <IcOutlineThumbUp />
                    <IcOutlineThumbDown />
                    <IcRoundWatchLater onClick={() => watchLaterDispatch({ type: 'REMOVE_FROM_WATCHLATER', payload: video })} />
                </div>
            </div>
        </div>

    )
}

export default WatchLaterCard