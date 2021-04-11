import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDataAPI, deleteDataFirebase, getDataFirebase, updateDataFirebase } from '../../../config/redux/action'
import './dashboard.scss'

function Dashboard() {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [date, setDate] = useState()
    const [btn, setBtn] = useState('Simpan')
    const [noteId, setNoteId] = useState()
    const { notes } = useSelector(state => state)
    const dispatch = useDispatch()
    const userLocalStorage = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {
        const userLocalStorages = JSON.parse(localStorage.getItem('userData'))
        dispatch(getDataFirebase(userLocalStorages.uid, dispatch))
    }, [dispatch])


    const addData = () => {
        const data = {
            title: title,
            content: content,
            // date: new Date()
            date: date,
            user: userLocalStorage
        }

        if (btn !== 'Simpan') {
            dispatch(updateDataFirebase(userLocalStorage.uid, noteId, data))
        } else {
            dispatch(addDataAPI(data, dispatch))
        }
    }

    const updateNotes = (val) => {
        setContent(val.data.content)
        setTitle(val.data.title)
        setDate(val.data.date)
        setNoteId(val.id)
        setBtn('Edit')

        window.scrollTo(0,0)
    }

    const cancelNotes = () => {
        setContent('')
        setTitle('')
        setDate('')
        setBtn('Simpan')
    }

    const deleteNotes =  async (e) => {
        const res = await dispatch(deleteDataFirebase(userLocalStorage.uid, noteId)).catch((err) => err)

        if (res) {
            cancelNotes()
        }
    }

    return (
        <div className='container'>
            <div className='input-form'>
                <input placeholder='title' onChange={(e) => setTitle(e.target.value)} className='input-title' value={title} />
                <input type='date' onChange={(e) => setDate(e.target.value)} className='input-title' value={date} />
                <textarea placeholder='content' onChange={(e) => setContent(e.target.value)} className='input-content' value={content} >

                </textarea>
                <div className="action-wrapper">
                    {
                        btn !== 'Simpan' ? (
                            <div>
                                <button className='save-btn batal' onClick={cancelNotes} >Batal</button>
                                <button className='save-btn delete' onClick={deleteNotes} >Delete</button>
                            </div>
                        ) : null
                    }

                    <button className='save-btn' onClick={addData} >{btn}</button>
                </div>
            </div>
            <hr />
            {
                notes.length > 0 ? (
                    notes.map(notes => {
                        return (<div className='card-content' key={notes.id} onClick={() => updateNotes(notes)}>
                            <p className='title' >{notes.data.title}</p>
                            <p className='date'>{notes.data.date}</p>
                            <p className='content'>{notes.data.content}</p>
                        </div>
                        )
                    })
                ) : null
            }

        </div>
    )
}

export default Dashboard
