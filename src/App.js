import {Routes,Route,useLocation} from "react-router-dom"
import {Home,LandingPage,Login,WatchLater,History,Playlists,Likes,PlaylistDetail, VideoPage} from './pages/index'
import Mockman from "mockman-js";
import './App.css'
import Navigation from './components/Navigation'

const App=()=>{
    const res=useLocation()
    return (<div className='App'>
        {res.pathname!=='/login' && <Navigation/>}

        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/watchlater' element={<WatchLater/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/playlists' element={<Playlists/>}/>
            <Route path='/playlist/:playlistId' element={<PlaylistDetail/>}/>
            <Route path='/video/:videoId' element={<VideoPage/>}/>
            <Route path='/likes' element={<Likes/>}/>
            <Route path='/mock' element={<Mockman/>}/>
        </Routes>
    </div>)
}

export default App