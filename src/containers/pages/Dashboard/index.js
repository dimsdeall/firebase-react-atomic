import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDataAPI } from '../../../config/redux/action'
import './dashboard.scss'

function Dashboard() {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [date, setDate] = useState()
    // const { user } = useSelector(state => state)
    const dispatch = useDispatch()
    const userLocalStorage =  JSON.parse(localStorage.getItem('userData'))
    // console.log('data', JSON.parse(userLocalStorage));

    const addData = () => {

        const data = {
            title: title,
            content: content,
            // date: new Date()
            date : date,
            user: userLocalStorage
        }

        console.log(data);
        dispatch(addDataAPI(data, dispatch))
    }

    return (
        <div className='container'>
            <div className='input-form'>
                <input placeholder='title' onChange={(e) => setTitle(e.target.value)} className='input-title' />
                <input type='date' onChange={(e) => setDate(e.target.value)} className='input-title' />
                <textarea placeholder='content' onChange={(e) => setContent(e.target.value)} className='input-content' >

                </textarea>
                <button className='save-btn' onClick={addData} >Simpan</button>
            </div>
            <hr />
            <div className='card-content'>
                <p className='title' >Title</p>
                <p className='date'>21-02-2021</p>
                <p className='content'>Content</p>
            </div>
        </div>
    )
}

export default Dashboard
