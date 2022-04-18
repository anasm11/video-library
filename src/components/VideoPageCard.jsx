const VideoPageCard = ({video}) => {
    return (
        <div class="card horizontal">
            <div class="card-body">
                <div class="img-text">
                    <img src={video.img} />
                    <div class="text-container">
                        <div class="title-text">{video.title}</div>
                        <div class="author-text">{video.creator}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPageCard