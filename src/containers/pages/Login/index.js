import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Buttom from '../../../components/atoms/Button'
import { LoginAPI } from '../../../config/redux/action'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoading } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()



    const btnSubmit = async () => {
        dispatch({ type: 'CHANGE_LOADING', value: true })
        let res = await dispatch(LoginAPI({ email, password }, dispatch)).catch(err => err)

        if (res) {
            localStorage.setItem('userData',JSON.stringify(res))
            setEmail('')
            setPassword('')
            history.push('/')
            console.log(res);
        }
    }


    return (
        <div className="auth-container" >
            <div className="auth-card">
                <p className="auth-title">Login Page</p>
                <input className="input"
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" value={email} />
                <input className="input"
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" value={password} />
                <Buttom onClick={btnSubmit} title="Login" loading={isLoading} />
            </div>
        </div>
    )

}


export default Login
