import { useWatchLaterContext } from "../contexts/index"
import {WatchLaterCard} from '../components/index'

const WatchLater = () => {
  const { watchLaterVideos, watchLaterDispatch } = useWatchLaterContext()
  return (
    <div>
      {watchLaterVideos.map((video) =>
        <WatchLaterCard video={video} watchLaterDispatch={watchLaterDispatch} />
      )}
    </div>
  )
}

export default WatchLater