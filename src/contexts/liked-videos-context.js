import axios from "axios"
import { useReducer, useEffect, useContext, createContext } from "react"

const LikedVideosContext = createContext()

const likeVideo = async (video) => {

    const res = await axios({
        method: 'POST',
        url: '/api/user/likes',
        headers: {
            authorization:localStorage.getItem('token')
        },
        data: {video}
    })
}

const unlikeVideo = async (video) => {
    const res = await axios({
        method: 'delete',
        url: `/api/user/likes/${video._id}`,
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
}

const likedVideosReducer = (state, { type, payload }) => {  
    switch (type) {
        case ('LIKE'): {
            likeVideo(payload)
            return [...state, payload]
        }
        case ('UNLIKE'): {
            unlikeVideo(payload)
            return state.filter((item) => item._id !== payload._id)
        }
        case ('INIT'): {
            return payload
        }
    }
}

const LikedVideosProvider = ({ children }) => {
    
    useEffect(() => {
        (async()=>{const res = await axios({
            method: 'get',
            url: '/api/user/likes',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })

        likedVideosDispatch({ type: 'INIT', payload: res.data.likes })})()
    }, [])


    const [likedVideos, likedVideosDispatch] = useReducer(likedVideosReducer, [])

    return <LikedVideosContext.Provider value={{ likedVideos, likedVideosDispatch }}>{children}</LikedVideosContext.Provider>
}

const useLikedVideosContext = () => useContext(LikedVideosContext)

export { LikedVideosProvider, useLikedVideosContext }