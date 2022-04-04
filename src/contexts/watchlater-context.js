import { useReducer, createContext, useContext,useEffect } from "react"

const WatchLaterContext = createContext()

const setWatchLater=async(arr)=>{
    await localStorage.setItem('watchLater', JSON.stringify(arr))
}

const watchLaterReducer =  (state, { type, payload }) => {
    switch (type) {
        case ('ADD_TO_WATCHLATER'): {
            try {
                setWatchLater([...state, payload])
                return [...state, payload]
            }
            catch {
                console.log('error in adding to wishlist')
            }
        }
        case ('REMOVE_FROM_WATCHLATER'): {
            const newWatchLater = state.filter((product) => product._id !== payload._id)
            setWatchLater(newWatchLater)
            return newWatchLater
        }
    }
}


const WatchLaterProvider = ({ children }) => {
    let watchLaterInitList=[]
    useEffect(async()=>{
        if(localStorage.getItem('watchLater'))
        watchLaterInitList=await JSON.parse(localStorage.getItem('watchLater'))
    },[])

    const [watchLaterVideos, watchLaterDispatch] = useReducer(watchLaterReducer, watchLaterInitList)

    return (<WatchLaterContext.Provider value={ {watchLaterVideos, watchLaterDispatch} }>
        {children}
    </WatchLaterContext.Provider>)
}

const useWatchLaterContext = () => useContext(WatchLaterContext)


export { WatchLaterProvider, useWatchLaterContext }