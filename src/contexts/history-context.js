import axios from "axios";
import { useContext, createContext, useReducer } from "react"

const HistoryContext = createContext();

const historyReducer =  (state, { type, payload }) => {
    switch (type) {
        case ('ADD'): {
            (async()=>{
                const res = await axios({
                    method: 'post',
                    url: '/api/user/history',
                    headers: {
                        authorization: localStorage.getItem('token')
                    },
                    data: {
                        video:payload
                    }
                })
                
            })()
            const newHistory=state.filter((vid)=>vid._id!==payload._id)
            return [...newHistory, payload]
        }
        case ('REMOVE'): {
            (async()=>{
                const res=await axios({
                    method:'delete',
                    url:`/api/user/history/${payload._id}`,
                    headers:{
                        authorization: localStorage.getItem('token')
                    }
                })
                
            })()
            const newHistory=state.filter((vid)=>vid._id!==payload._id)
                return newHistory
        }
    }
}

const HistoryProvider = ({ children }) => {

    const [historyVideos, historyDispatch] = useReducer(historyReducer, [])
    return <HistoryContext.Provider value={{ historyVideos, historyDispatch }}>{children}</HistoryContext.Provider>
}

const useHistoryContext = () => useContext(HistoryContext)

export { HistoryProvider, useHistoryContext }