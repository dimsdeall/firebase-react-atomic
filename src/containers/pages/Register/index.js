import React, { useState } from 'react'
import './register.scss'
import Buttom from '../../../components/atoms/Button'
import { useDispatch, useSelector } from 'react-redux'
import { registerAPI } from '../../../config/redux/action'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading} = useSelector(state => state)
    const dispatch = useDispatch()

    const btnSubmit = () => {
        dispatch({type : 'CHANGE_LOADING', value : true})
        dispatch(registerAPI({ email, password }, dispatch))
        // dispatch({type : 'CHANGE_LOADING', value : false})

        setEmail('')
        setPassword('')
    }

    return (
        <div className="auth-container" >
            <div className="auth-card">
                <p className="auth-title">Register Page</p>
                <input className="input"
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"  value={email}/>
                <input className="input"
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                <Buttom onClick={btnSubmit} title="Register" loading={isLoading} />
            </div>
        </div>
    )
}

export default Register
