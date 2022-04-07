import axios from "axios"
import { useState } from "react"
import { usePlaylistContext } from "../contexts/index"

const PlaylistModal = ({ playlistModalState }) => {
    const { showPlaylistModal, setShowPlaylistModal } = playlistModalState
    const { playlistState, playlistDispatch } = usePlaylistContext()

    const [newPlaylistName, setNewPlaylistName] = useState()
    const [selectedPlaylist, setSelectedPlaylist] = useState()

    return (

        <div className='modal'>
            <div className="card text-only-card">
                <div className="card-body">
                    <div className="text-container">
                        <div className="title-text">Add to Playlist</div>
                        <div className="author-text"></div>
                    </div>


                    <div className="description"><input onChange={(e) => setNewPlaylistName(e.target.value)} /><button onClick={async () => {
                        (async () => {
                            const res = await axios({
                                method: 'post',
                                url: '/api/user/playlists',
                                headers:
                                    { authorization: localStorage.getItem('token') },
                                data: {
                                    playlist: { title: newPlaylistName, description: "playlist desc" }
                                }
                            })
                            playlistDispatch({ type: 'ADD_PLAYLIST', payload: res.data.playlists })


                        })()

                    }}>Create Playlist</button></div>
                </div>

                <div className="description">{playlistState.map((playlist) => {
                    return <label key={playlist.title}><input type='radio' name='playlist' onClick={() => setSelectedPlaylist(playlist)} />{playlist.title}</label>
                })}</div>


                <div className="foot">
                    <div className="action-buttons">
                        <button className="btn secondary-btn" onClick={() => setShowPlaylistModal(false)}>Cancel</button>
                        <button className="btn primary-btn" onClick={() => {

                            (async () => {
                                const res = await axios({
                                    method: 'post',
                                    url: `/api/user/playlists/${selectedPlaylist._id}`,
                                    headers: {
                                        authorization: localStorage.getItem('token')
                                    },
                                    data: { video: showPlaylistModal }
                                })

                                playlistDispatch({ type: 'ADD_TO_PLAYLIST', payload: res.data.playlist })

                            }

                            )()

                            setShowPlaylistModal(false)
                        }}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistModal