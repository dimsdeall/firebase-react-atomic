import React, { useState } from 'react'
import './register.scss'
import firebase from '../../../config/firebase/'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const btnSubmit = () => {
        firebase.auth().createUserWithEmailAndPassword(email.email, password.password)
            .then((userCredential) => {
                console.log('got data ', userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="auth-container" >
            <div className="auth-card">
                <p className="auth-title">Register Page</p>
                <input className="input"
                    onChange={(e) => setEmail({ email: e.target.value })} placeholder="Email" type="email" />
                <input className="input"
                    onChange={(e) => setPassword({ password: e.target.value })} placeholder="Password" type="password" />
                <button className="btn" onClick={btnSubmit}>Register</button>
            </div>
        </div>
    )
}

export default Register
