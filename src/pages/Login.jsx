import axios from 'axios'
import React,{useState} from 'react'
import '../css/Login.css'

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    return (
        <div className='box'>
        <div className='form'>
            <h2 className='form-header'>Login</h2>
            <div className='form-body'>
                <input className='input' type='text' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
                <input className='input' type='text' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
                <span className='single-line'>
                    <div className='checkbox-input'>
                        <input className='checkbox' type='checkbox' name='remember'/>
                        <label >Remember me</label>
                    </div>
                    <div className='link'>Forgot password?</div>
                </span>
                <button className='btn primary-btn' onClick={async()=>{
                    const res=await axios.post('/api/auth/login',{email,password})
                    
                    localStorage.setItem('token',res.data.encodedToken)
                }}>Login</button>
            </div>
            <div className='form-footer'>Create new account? {'>'}</div>
        </div>
    </div>
    )
}

export default Login
