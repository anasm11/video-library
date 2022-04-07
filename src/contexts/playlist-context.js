import {useReducer,createContext,useContext,useEffect} from 'react'
const PlaylistContext=createContext()

const playlistReducer=(state,{type,payload})=>{
    switch(type){
case('ADD_PLAYLIST'):{
    
    return payload
}

case('ADD_TO_PLAYLIST'):{
    return state.map((playlist)=>playlist._id===payload._id?payload:playlist)
}

case('DELETE_PLAYLIST'):{
    return payload
}

case('DELETE_FROM_PLAYLIST'):{
    state.map((playlist)=>playlist._id===payload._id?payload:playlist)
    
}

    }
}


const PlaylistProvider=({children})=>{
    const [playlistState,playlistDispatch]=useReducer(playlistReducer,[])
    
    return <PlaylistContext.Provider value={{playlistState,playlistDispatch}}>{children}</PlaylistContext.Provider>
}

const usePlaylistContext=()=>useContext(PlaylistContext)

export {PlaylistProvider,usePlaylistContext}